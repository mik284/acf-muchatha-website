'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

// Temporary data - will be replaced with CMS data
const events = [
  {
    id: 1,
    title: 'Sunday Service',
    date: '2025-06-23',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    description: 'Join us for our weekly Sunday worship service.',
  },
  {
    id: 2,
    title: 'Bible Study',
    date: formatDate(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)),
    time: '7:00 PM',
    location: 'Fellowship Hall',
    description: 'Mid-week Bible study and prayer meeting.',
  },
  {
    id: 3,
    title: 'Youth Night',
    date: formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
    time: '6:00 PM',
    location: 'Youth Center',
    description: 'Fun and fellowship for all youth ages 13-18.',
  },
];

// Helper function to format date
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

const EventCard = ({ event }: { event: (typeof events)[number] }) => {
  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString('default', { month: 'short' });
  const weekday = eventDate.toLocaleString('default', { weekday: 'short' });
  // const time = event.time.replace(' ', '').toLowerCase();

  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="embla__slide min-w-0 pl-4 md:pl-0 flex-[0_0_95%] sm:flex-[0_0_80%] md:flex-[0_0_60%] lg:flex-[0_0_45%] xl:flex-[0_0_35%]">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group border-border/60 dark:border-border/40">
        <div className="relative h-40 bg-gradient-to-r from-primary/90 to-primary/70 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
          <div className="absolute bottom-0 left-0 p-4 z-10">
            <div className="flex items-center gap-2 text-white/90">
              <div className="flex items-center gap-1.5 text-sm bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formattedDate.split(',')[0]}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <Clock className="h-3.5 w-3.5" />
                <span>{event.time}</span>
              </div>
            </div>
            <h3 className="mt-2 text-xl font-bold text-white line-clamp-2">{event.title}</h3>
          </div>
        </div>

        <CardContent className="flex-1 p-6">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center justify-center text-center bg-primary/5 dark:bg-primary/10 p-3 rounded-lg min-w-[70px]">
              <span className="text-2xl font-bold text-primary">{day}</span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {month}
              </span>
              <span className="mt-1 text-xs font-medium text-primary/70">{weekday}</span>
            </div>

            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 flex-shrink-0 text-muted-foreground/70" />
                <span className="text-muted-foreground line-clamp-1">{event.location}</span>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-3">{event.description}</p>

              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  View Details
                  <ChevronRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const EventsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    skipSnaps: false,
    inViewThreshold: 0.7,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16 bg-background">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between mb-10 md:flex-row md:items-end">
          <div className="mb-6 text-center md:text-left md:mb-0">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Upcoming Events</h2>
            <p className="mt-2 text-muted-foreground">
              Join us for our upcoming services and events
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full"
              aria-label="Previous event"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="rounded-full"
              aria-label="Next event"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  index === selectedIndex ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/20'
                )}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
