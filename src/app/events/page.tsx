"use client";

import { useState, useMemo } from 'react';
import { format, parseISO, isToday, isAfter, startOfToday } from 'date-fns';
import { Search, Calendar as CalendarIcon, MapPin, Clock, CalendarDays } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/events/Calendar';
import { EventCard } from '@/components/events/EventCard';
import { EventModal } from '@/components/events/EventModal';
import { PageHeader } from '@/components/ui/page-header';

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  isFeatured?: boolean;
  imageUrl?: string;
};

// Mock data - replace with actual API call
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Sunday Service',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM - 12:00 PM',
    location: 'Main Sanctuary',
    description: 'Join us for our weekly Sunday service with worship and the Word.',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
  },
  // Add more mock events as needed
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<'upcoming' | 'calendar' | 'past'>('upcoming');

  // Filter events based on search query and selected view
  const filteredEvents = useMemo(() => {
    let filtered = [...mockEvents];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query) ||
        event.description?.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }
    
    // Apply date filter based on active view
    const today = startOfToday();
    filtered = filtered.filter(event => {
      const eventDate = parseISO(event.date);
      
      if (activeView === 'upcoming') {
        return isToday(eventDate) || isAfter(eventDate, today);
      } else if (activeView === 'past') {
        return !isToday(eventDate) && !isAfter(eventDate, today);
      }
      return true;
    });
    
    // Apply date selection filter if a date is selected
    if (selectedDate) {
      filtered = filtered.filter(event => 
        format(parseISO(event.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
      );
    }
    
    return filtered;
  }, [searchQuery, selectedDate, activeView]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setActiveView('calendar');
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleRegister = (eventId: string) => {
    // Handle event registration
    console.log('Registering for event:', eventId);
  };

  return (
    <main className="container mx-auto px-4">
      <PageHeader 
        title="Upcoming Events"
        description="Join us for worship, fellowship, and spiritual growth. Find events that will inspire and strengthen your faith."
        ctaText="View Calendar"
        ctaOnClick={() => setActiveView('calendar')}
        overlayOpacity={50}
        background="image"
        imageUrl='https://images.unsplash.com/photo-1716666179428-368bf3fa0b8b?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      >
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Button 
            variant={activeView === 'upcoming' ? 'secondary' : 'outline'} 
            className="gap-2"
            onClick={() => {
              setActiveView('upcoming');
              setSelectedDate(null);
            }}
          >
            <CalendarDays className="h-4 w-4" />
            Upcoming
          </Button>
          <Button 
            variant={activeView === 'past' ? 'secondary' : 'outline'} 
            className="gap-2"
            onClick={() => setActiveView('past')}
          >
            <CalendarDays className="h-4 w-4" />
            Past Events
          </Button>
        </div>
      </PageHeader>

      <div className="flex flex-col lg:flex-row gap-8 mb-20">
        {/* Calendar View */}
        <div className="lg:w-1/3">
          <div className="sticky top-4">
            <Calendar 
              events={mockEvents} 
              onDateSelect={handleDateSelect}
              onEventClick={handleEventClick}
            />
            
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <h3 className="font-medium mb-3">Event Categories</h3>
              <div className="space-y-2">
                <Button 
                  variant={activeView === 'upcoming' ? 'secondary' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveView('upcoming');
                    setSelectedDate(null);
                  }}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Upcoming Events
                </Button>
                <Button 
                  variant={activeView === 'calendar' ? 'secondary' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveView('calendar')}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  All Events
                </Button>
                <Button 
                  variant={activeView === 'past' ? 'secondary' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveView('past');
                    setSelectedDate(null);
                  }}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Past Events
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="lg:w-2/3">
          <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {selectedDate && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Showing events for {format(selectedDate, 'MMMM d, yyyy')}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedDate(null)}
                >
                  Clear
                </Button>
              </div>
            )}
          </div>

          {filteredEvents.length > 0 ? (
            <div className="space-y-6">
              {filteredEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onRegister={handleRegister}
                  onDetails={handleEventClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-1">No events found</h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? 'Try adjusting your search or filters'
                  : 'There are no events scheduled for the selected time period.'}
              </p>
              {searchQuery && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDate(null);
                    setActiveView('upcoming');
                  }}
                >
                  Clear all filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
        onRegister={handleRegister}
      />
    </main>
  );
}
