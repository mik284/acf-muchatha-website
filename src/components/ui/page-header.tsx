"use client";

import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string | ReactNode;
  className?: string;
  children?: ReactNode;
  ctaText?: string;
  ctaHref?: string;
  ctaOnClick?: () => void;
  background?: 'gradient' | 'solid' | 'transparent' | 'image';
  imageUrl?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  height?: 'small' | 'medium' | 'large' | 'xlarge';
}

export function PageHeader({
  title,
  description,
  className,
  children,
  ctaText,
  ctaHref,
  ctaOnClick,
  background = 'gradient',
  imageUrl,
  overlayColor = 'bg-gray-900',
  overlayOpacity = 70,
  height = 'medium',
}: PageHeaderProps) {
  // Background style classes
  const backgroundClasses = {
    gradient: 'bg-gradient-to-br from-primary/5 to-background',
    solid: 'bg-background',
    transparent: 'bg-transparent',
    image: '',
  };

  // Height classes for image background
  const heightClasses = {
    small: 'h-64',
    medium: 'h-96',
    large: 'h-[32rem]',
    xlarge: 'h-[40rem]',
  };

  // Overlay class for image background
  const overlayClass = `absolute inset-0 ${overlayColor} opacity-${overlayOpacity} transition-opacity duration-300`;

  return (
    <div 
      className={cn(
        'relative overflow-hidden rounded-2xl mb-8 md:mb-12',
        background === 'image' ? '' : 'p-8 md:p-12',
        background === 'image' ? heightClasses[height] : 'min-h-[20rem]',
        backgroundClasses[background as keyof typeof backgroundClasses],
        className
      )}
    >
      {/* Background image with overlay */}
      {background === 'image' && imageUrl && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className={overlayClass}></div>
        </div>
      )}

      {/* Content */}
      <div className={cn(
        'relative z-10 max-w-6xl mx-auto',
        background === 'image' ? 'h-full flex flex-col justify-center px-8 py-16 md:px-12' : ''
      )}>
        <div className={background === 'image' ? 'max-w-4xl' : ''}>
          {/* Title */}
          <h1 className={cn(
            'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4',
            background === 'image' 
              ? 'text-white' 
              : 'bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80'
          )}>
            {title}
          </h1>
          
          {/* Description */}
          {description && (
            <p className={cn(
              'text-lg mb-6 max-w-3xl',
              background === 'image' ? 'text-white/90' : 'text-muted-foreground'
            )}>
              {description}
            </p>
          )}

          {/* Call to Action */}
          {(ctaText && (ctaHref || ctaOnClick)) && (
            <div className="mt-6 flex flex-wrap gap-4">
              {ctaHref ? (
                <Button asChild className="group">
                  <a href={ctaHref}>
                    {ctaText}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              ) : ctaOnClick ? (
                <Button onClick={ctaOnClick} className="group">
                  {ctaText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              ) : null}
            </div>
          )}

          {/* Additional children */}
          {children}
        </div>
      </div>
      
      {/* Decorative elements */}
      {background === 'gradient' && (
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
      )}
      {background === 'gradient' && (
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      )}
    </div>
  );
}
