'use client';

import { useState, useMemo } from 'react';
import { format, isSameDay, parseISO, isToday, isBefore, endOfDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  isFeatured?: boolean;
};

interface CalendarProps {
  events: Event[];
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: Event) => void;
}

export function Calendar({ events, onDateSelect, onEventClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  // const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDay();
  const daysInLastMonth = new Date(currentYear, currentMonth, 0).getDate();

  const weeks = useMemo(() => {
    const days = [];
    // const today = new Date();

    // Previous month's days
    for (let i = 0; i < firstDayOfMonth; i++) {
      const day = daysInLastMonth - firstDayOfMonth + i + 1;
      const date = new Date(currentYear, currentMonth - 1, day);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isToday(date),
        events: events.filter((event) => isSameDay(parseISO(event.date), date)),
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: isToday(date),
        events: events.filter((event) => isSameDay(parseISO(event.date), date)),
      });
    }

    // Next month's days
    const remainingDays = 42 - days.length; // 6 rows of 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(currentYear, currentMonth + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isToday(date),
        events: events.filter((event) => isSameDay(parseISO(event.date), date)),
      });
    }

    // Split into weeks
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  }, [currentMonth, currentYear, events, firstDayOfMonth, daysInMonth, daysInLastMonth]);

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="bg-card rounded-lg shadow overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleToday}>
            Today
          </Button>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous month</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next month</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-border">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="bg-muted/30 text-muted-foreground text-sm font-medium text-center py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="bg-muted/30">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-px">
            {week.map((day, dayIndex) => {
              const isPast = isBefore(endOfDay(day.date), new Date()) && !isToday(day.date);
              const hasEvents = day.events.length > 0;

              return (
                <div
                  key={dayIndex}
                  className={`min-h-[100px] p-1.5 bg-background text-sm ${
                    !day.isCurrentMonth ? 'opacity-50' : ''
                  } ${isPast ? 'opacity-60' : ''} ${
                    onDateSelect ? 'cursor-pointer hover:bg-muted/20' : ''
                  }`}
                  onClick={() => onDateSelect?.(day.date)}
                >
                  <div className="flex flex-col h-full">
                    <span
                      className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-sm ${
                        day.isToday ? 'bg-primary text-primary-foreground font-medium' : ''
                      }`}
                    >
                      {format(day.date, 'd')}
                    </span>
                    <div className="mt-1 space-y-0.5 flex-1 overflow-hidden">
                      {hasEvents && (
                        <div className="space-y-0.5">
                          {day.events.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`text-xs truncate px-1 py-0.5 rounded ${
                                event.isFeatured
                                  ? 'bg-primary/10 text-primary'
                                  : 'bg-muted/50 text-foreground'
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                onEventClick?.(event);
                              }}
                            >
                              {event.time} {event.title}
                            </div>
                          ))}
                          {day.events.length > 2 && (
                            <div className="text-xs text-muted-foreground text-center">
                              +{day.events.length - 2} more
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
