'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  title?: string;
  className?: string;
}

export function VideoPlayer({ videoId, title, className = '' }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // YouTube embed URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}
      
      {hasError ? (
        <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
          <p className="text-muted-foreground">Failed to load video</p>
        </div>
      ) : (
        <div className="relative w-full overflow-hidden rounded-t-lg bg-black" style={{ paddingTop: '55%' }}>
          <iframe
            src={embedUrl}
            title={title || 'Sermon video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full max-w-[1000px] mx-auto"
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
