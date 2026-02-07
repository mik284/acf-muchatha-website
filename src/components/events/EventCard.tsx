import { format, parseISO, isPast, isToday } from 'date-fns';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  isFeatured?: boolean;
  imageUrl?: string;
};

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'featured' | 'upcoming';
  onRegister?: (eventId: string) => void;
  onDetails?: (event: Event) => void;
}

export function EventCard({ event, variant = 'default', onRegister, onDetails }: EventCardProps) {
  const eventDate = parseISO(event.date);
  const isEventPast = isPast(new Date(`${event.date}T23:59:59`));
  const isEventToday = isToday(eventDate);

  const formattedDate = format(eventDate, 'EEEE, MMMM d, yyyy');

  const cardClasses = [
    'rounded-lg overflow-hidden border bg-card text-card-foreground',
    'transition-all duration-200',
    variant === 'featured' ? 'shadow-lg' : 'shadow-sm',
    variant === 'featured' ? 'border-primary/20' : 'border-border',
    'hover:shadow-md',
    'flex flex-col h-full',
  ].join(' ');

  const contentClasses = [
    'p-5 flex-1 flex flex-col',
    variant === 'featured' ? 'md:flex-row' : 'flex-col',
  ].join(' ');

  return (
    <div className={cardClasses}>
      {variant === 'featured' && event.imageUrl ? (
        <div className="h-48 md:h-auto md:w-1/3 bg-muted overflow-hidden">
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
      ) : null}

      <div className={contentClasses}>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {isEventToday && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                Happening Today
              </span>
            )}
            {event.isFeatured && variant !== 'featured' && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                Featured
              </span>
            )}
            {isEventPast && !isEventToday && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                Past Event
              </span>
            )}
          </div>

          <h3 className={`font-semibold mb-2 ${variant === 'featured' ? 'text-xl' : 'text-lg'}`}>
            {event.title}
          </h3>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">{formattedDate}</p>
                <p>{event.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>{event.location}</p>
            </div>

            {event.description && variant === 'featured' && (
              <p className="mt-2 line-clamp-3">{event.description}</p>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t">
          {onDetails && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDetails(event)}
              className="flex items-center gap-1"
            >
              View Details
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}

          {!isEventPast && onRegister && (
            <Button size="sm" className="ml-auto" onClick={() => onRegister(event.id)}>
              Register
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
