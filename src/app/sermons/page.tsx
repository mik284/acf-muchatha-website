"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Calendar, User, Play, Loader2, Eye, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { SermonModal } from "@/components/sermons/SermonModal";
import { fetchSermons, fetchPlaylists, YouTubeVideo, YouTubePlaylist } from "@/services/youtube";
import Image from 'next/image';
import { PageHeader } from '@/components/ui/page-header';

interface Sermon extends YouTubeVideo {
  speaker: string;
  date: string;
  viewCount?: number;
  playlistId?: string;
  playlistTitle?: string;
}

const extractSpeaker = (video: YouTubeVideo): string => {
  const titleMatch = video.title.match(/(?:by|from|by:)\s*([^-\n]+)/i);
  if (titleMatch && titleMatch[1]) {
    return titleMatch[1].trim();
  }

  const descMatch = video.description.match(/(?:speaker|preacher|pastor):?\s*([^\n<]+)/i);
  if (descMatch && descMatch[1]) {
    return descMatch[1].trim();
  }

  return 'Unknown Speaker';
};

export default function SermonsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [filteredSermons, setFilteredSermons] = useState<Sermon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'recent' | 'popular'>('all');
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<{ id: string, title: string, count: number }[]>([]);
  const [playlistVideos, setPlaylistVideos] = useState<Array<{
    id: string;
    title: string;
    videoId: string;
    duration: string;
  }>>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const sermonsPerPage = 9; // Show 9 sermons per page (3x3 grid)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [playlistsData, standaloneVideos] = await Promise.all([
          fetchPlaylists(),
          fetchSermons()
        ]);

        // Process playlists
        const validPlaylists = playlistsData
          .filter(playlist => playlist.videos?.length > 0)
          .map(playlist => ({
            id: playlist.id,
            title: playlist.title,
            count: playlist.videos?.length || 0
          }));

        setPlaylists(validPlaylists);

        // Process all videos from playlists and standalone videos
        const allVideos = [
          ...standaloneVideos,
          ...playlistsData.flatMap(playlist => playlist.videos || [])
        ];

        // Remove duplicates by videoId
        const uniqueVideos = Array.from(new Map(
          allVideos.map(video => [video.videoId, video])
        ).values());

        const sermonData: Sermon[] = uniqueVideos.map(video => ({
          ...video,
          speaker: extractSpeaker(video),
          date: new Date(video.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          // Add playlist info if available
          playlistId: video.playlistId,
          playlistTitle: playlistsData.find(p => p.id === video.playlistId)?.title
        }));

        setSermons(sermonData);
      } catch (err) {
        console.error('Failed to load sermons:', err);
        setError('Failed to load sermons. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter and sort sermons
  useEffect(() => {
    let result = [...sermons];

    // Apply playlist filter if selected
    if (selectedPlaylist) {
      result = result.filter(sermon => sermon.playlistId === selectedPlaylist);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        sermon =>
          sermon.title.toLowerCase().includes(query) ||
          sermon.speaker.toLowerCase().includes(query) ||
          (sermon.description?.toLowerCase().includes(query) || false) ||
          (sermon.playlistTitle?.toLowerCase().includes(query) || false)
      );
    }

    // Apply active filter
    switch (activeFilter) {
      case 'recent':
        result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
      case 'popular':
        result.sort((a, b) =>
          (b.viewCount || 0) - (a.viewCount || 0) ||
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
        break;
      default: // 'all'
        result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    // Reset to first page when filters change
    setCurrentPage(1);
    setFilteredSermons(result);
  }, [searchQuery, sermons, activeFilter, selectedPlaylist]);

  // Get current sermons for pagination
  const indexOfLastSermon = currentPage * sermonsPerPage;
  const indexOfFirstSermon = indexOfLastSermon - sermonsPerPage;
  const currentSermons = filteredSermons.slice(indexOfFirstSermon, indexOfLastSermon);
  const totalPages = Math.ceil(filteredSermons.length / sermonsPerPage);

  // Change page
  const paginate = (pageNumber: number) => {
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(pageNumber);
  };

  const handleSermonClick = (sermon: Sermon) => {
    setSelectedSermon(sermon);

    // If this sermon is part of a playlist, get all videos from that playlist
    if (sermon.playlistId) {
      const playlistSermons = sermons.filter(s => s.playlistId === sermon.playlistId);
      const videos = playlistSermons.map(s => ({
        id: s.id,
        title: s.title,
        videoId: s.videoId,
        duration: s.duration || '0:00'
      }));
      setPlaylistVideos(videos);
    } else {
      setPlaylistVideos([]);
    }

    setIsModalOpen(true);
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const handleVideoSelect = (videoId: string) => {
    const selected = sermons.find(s => s.videoId === videoId);
    if (selected) {
      setSelectedSermon(selected);
      // Scroll to top of modal when changing videos
      setTimeout(() => {
        const modal = document.querySelector('[role="dialog"]');
        if (modal) {
          modal.scrollTop = 0;
        }
      }, 100);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSermon(null);
    setPlaylistVideos([]);
    // Re-enable body scroll when modal is closed
    document.body.style.overflow = 'auto';
  };

  const renderSermonCard = (sermon: Sermon) => (
    <Card
      key={sermon.id}
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group h-full flex flex-col"
      onClick={() => handleSermonClick(sermon)}
    >
      <div className="relative aspect-video bg-muted">
        <img
          src={`https://img.youtube.com/vi/${sermon.videoId}/maxresdefault.jpg`}
          alt={sermon.title}
          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://img.youtube.com/vi/${sermon.videoId}/hqdefault.jpg`;
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <Play className="h-6 w-6 text-white fill-current" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded">
          {sermon.duration}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {sermon.title}
        </h3>

        {sermon.playlistTitle && (
          <div className="mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {sermon.playlistTitle}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <User className="h-4 w-4 flex-shrink-0" />
          <span className="line-clamp-1">{sermon.speaker}</span>
        </div>

        <div className="mt-auto pt-2 border-t">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{sermon.date}</span>
            </div>
            {sermon.viewCount ? (
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{(sermon.viewCount / 1000).toFixed(1)}K views</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <main className="container mx-auto px-4">

      <PageHeader
        title="Grow in Faith Through God's Word"
        description="Discover inspiring messages and biblical teachings to strengthen your spiritual journey. Watch or listen to our latest sermons anytime, anywhere."
        overlayOpacity={50}
        background="image"
        imageUrl='https://images.unsplash.com/photo-1553085118-5a5c02cbcf2f?q=80&w=2284&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      >
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-secondary/80 text-primary text-sm font-medium mb-4">
            <Play className="h-4 w-4 mr-2" />
            Sermon Library
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="gap-2 transition-transform hover:scale-105"
              onClick={() => {
                const latestSermon = [...sermons].sort((a, b) =>
                  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
                )[0];
                if (latestSermon) handleSermonClick(latestSermon);
              }}
            >
              <Play className="h-5 w-5" />
              Watch Latest Sermon
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 hover:bg-background/80"
              onClick={() => {
                // Scroll to playlists section
                const playlistsSection = document.getElementById('playlists');
                if (playlistsSection) {
                  playlistsSection.scrollIntoView({ behavior: 'smooth' });
                  // Set focus for better accessibility
                  setTimeout(() => {
                    const select = playlistsSection.querySelector('select');
                    if (select) {
                      select.focus();
                    }
                  }, 100);
                }
              }}
            >
              <Play className="h-5 w-5" />
              View Playlists
            </Button>
          </div>
        </div>
      </PageHeader>
      {/* Hero Section */}
      {/* add a background image */}
      {/* <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-background mb-12 p-8 md:p-12">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Sermon Library"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Play className="h-4 w-4 mr-2" />
            Sermon Library
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Grow in Faith Through God's Word
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Discover inspiring messages and biblical teachings to strengthen your spiritual journey.
            Watch or listen to our latest sermons anytime, anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="gap-2 transition-transform hover:scale-105"
              onClick={() => {
                const latestSermon = [...sermons].sort((a, b) =>
                  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
                )[0];
                if (latestSermon) handleSermonClick(latestSermon);
              }}
            >
              <Play className="h-5 w-5" />
              Watch Latest Sermon
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 hover:bg-background/80"
              onClick={() => {
                // Scroll to playlists section
                const playlistsSection = document.getElementById('playlists');
                if (playlistsSection) {
                  playlistsSection.scrollIntoView({ behavior: 'smooth' });
                  // Set focus for better accessibility
                  setTimeout(() => {
                    const select = playlistsSection.querySelector('select');
                    if (select) {
                      select.focus();
                    }
                  }, 500);
                }
              }}
            >
              <ListMusic className="h-5 w-5" />
              Browse All Series
            </Button>
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0" />
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-0" />
      </div> */}

      <div className="mb-8">
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search sermons..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div id="playlists" className="flex flex-col gap-4 mb-8">
          {/* Playlist Filter */}
          {playlists.length > 0 && (
            <div className="w-full max-w-2xl mx-auto">
              <div className="relative">
                <select
                  value={selectedPlaylist || ''}
                  onChange={(e) => setSelectedPlaylist(e.target.value || null)}
                  className="w-full pl-4 pr-10 py-2 rounded-full border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <option value="">All Playlists</option>
                  {playlists.map(playlist => (
                    <option key={playlist.id} value={playlist.id}>
                      {playlist.title} ({playlist.count})
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground">
                    <path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path>
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              className="rounded-full px-4"
              onClick={() => setActiveFilter('all')}
            >
              All Sermons
            </Button>
            <Button
              variant={activeFilter === 'recent' ? 'default' : 'outline'}
              size="sm"
              className="rounded-full px-4"
              onClick={() => setActiveFilter('recent')}
            >
              Recent
            </Button>
            <Button
              variant={activeFilter === 'popular' ? 'default' : 'outline'}
              size="sm"
              className="rounded-full px-4"
              onClick={() => setActiveFilter('popular')}
            >
              Most Viewed
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading sermons...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">{error}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {currentSermons.map(renderSermonCard)}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{indexOfFirstSermon + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastSermon, filteredSermons.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredSermons.length}</span> sermons
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(1)}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0"
                    aria-label="First page"
                  >
                    <span className="sr-only">First page</span>
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0"
                    aria-label="Previous page"
                  >
                    <span className="sr-only">Previous page</span>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {/* Page numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show pages around current page
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? 'default' : 'outline'}
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => paginate(pageNum)}
                        aria-current={currentPage === pageNum ? 'page' : undefined}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0"
                    aria-label="Next page"
                  >
                    <span className="sr-only">Next page</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(totalPages)}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0"
                    aria-label="Last page"
                  >
                    <span className="sr-only">Last page</span>
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {selectedSermon && (
        <SermonModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          videoId={selectedSermon?.videoId || ''}
          title={selectedSermon?.title || ''}
          speaker={selectedSermon?.speaker || ''}
          date={selectedSermon?.date || ''}
          viewCount={selectedSermon?.viewCount}
          description={selectedSermon?.description || ''}
          playlistId={selectedSermon?.playlistId}
          playlistTitle={selectedSermon?.playlistTitle}
          playlistVideos={playlistVideos}
          onVideoSelect={handleVideoSelect}
        />
      )}
    </main>
  );
}