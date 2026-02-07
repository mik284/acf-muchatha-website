'use client';

import { X } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Event } from './EventCard';
import Image from 'next/image';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  onRegister?: (eventId: string) => void;
}

export function EventModal({ isOpen, onClose, event, onRegister }: EventModalProps) {
  if (!isOpen || !event) return null;

  const eventDate = parseISO(event.date);
  const formattedDate = format(eventDate, 'EEEE, MMMM d, yyyy');
  const isEventPast = new Date() > new Date(event.date);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-background rounded-lg shadow-2xl overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-10 w-10">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {event.imageUrl && (
          <div className="h-48 bg-muted overflow-hidden">
            <Image
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://via.placeholder.com/600x400`;
              }}
            />
          </div>
        )}

        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {event.isFeatured && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                    Featured Event
                  </span>
                )}
                {isEventPast ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                    Past Event
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Upcoming Event
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">Date & Time</h3>
                <p className="text-foreground">
                  {formattedDate} • {event.time}
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                <p className="text-foreground">{event.location}</p>
              </div>
            </div>

            {event.description && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">About This Event</h3>
                <div className="prose prose-sm max-w-none">
                  <p>{event.description}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {!isEventPast && onRegister && (
              <Button
                onClick={() => {
                  onRegister(event.id);
                  onClose();
                }}
              >
                Register for Event
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
