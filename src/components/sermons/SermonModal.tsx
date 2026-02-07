'use client';

import { X, Share2, Download, ListMusic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "./VideoPlayer";
import { useEffect, useRef } from 'react';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  videoId: string;
  duration: string;
  playlistId?: string;
  playlistTitle?: string;
}

// Utility function to format view count
// const formatViewCount = (count: number): string => {
//   if (count >= 1000000) {
//     return (count / 1000000).toFixed(1) + 'M';
//   } else if (count >= 1000) {
//     return (count / 1000).toFixed(1) + 'K';
//   }
//   return count.toString();
// };

interface SermonModalProps {
  isOpen: boolean;
  onClose: () => void;
  sermon: {
    id: string;
    title: string;
    preacher?: string;
    speaker?: string;
    date: string;
    duration: string;
    description: string;
    thumbnail: string;
    videoId: string;
    viewCount?: number;
    playlistId?: string;
    playlistTitle?: string;
    playlistVideos?: YouTubeVideo[];
    onVideoSelect?: (videoId: string) => void;
  };
}

export const SermonModal = ({ isOpen, onClose, sermon }: SermonModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // const viewCount = formatViewCount(sermon.viewCount);
  // const playlistId = 'your-playlist-id';
  // const playlistTitle = 'Related Sermons';
  // const playlistVideos = []; // Fetch related videos

  // const onVideoSelect = (videoId: string) => {
  //   // Handle video selection
  // };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="relative w-full max-w-6xl bg-background rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
        >
          <X className="h-6 w-6" />
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Video Player */}
          <div className="relative aspect-video lg:aspect-auto bg-black">
            <VideoPlayer
              videoId={sermon.videoId}
              title={sermon.title}
              className="w-full h-full"
            />
          </div>

          {/* Sermon Details */}
          <div className="flex flex-col h-full">
            <div className="p-6 lg:p-8 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">{sermon.title}</h2>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span>{sermon.preacher}</span>
                <span>•</span>
                <span>{new Date(sermon.date).toLocaleDateString()}</span>
                <span>•</span>
                <span>{sermon.duration}</span>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {sermon.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <ListMusic className="h-4 w-4 mr-2" />
                  Playlist
                </Button>
              </div>

              {/* Related Sermons Placeholder */}
              <div className="mt-auto">
                <h3 className="text-lg font-semibold mb-4">Related Sermons</h3>
                <div className="space-y-3">
                  {/* Placeholder for related sermons */}
                  <div className="text-sm text-muted-foreground">
                    More sermons from this series coming soon...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
