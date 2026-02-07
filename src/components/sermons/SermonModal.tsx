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
    thumbnailUrl: string;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="relative w-full max-w-[700px] h-[85vh] sm:h-[90vh] bg-background rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
        >
          <X className="h-6 w-6" />
        </Button>

        <div className="flex flex-col h-full overflow-hidden">
          {/* Video Player */}
          <div className="bg-black">
            <VideoPlayer
              videoId={sermon?.videoId}
              title={sermon?.title}
              className="w-full"
            />
          </div>

          {/* Sermon Details */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-3 sm:p-6 lg:p-8 overflow-y-auto">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">{sermon.title}</h2>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                <span>{sermon.preacher}</span>
                <span>•</span>
                <span>{new Date(sermon.date).toLocaleDateString()}</span>
                <span>•</span>
                <span>{sermon.duration}</span>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                {sermon.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
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
