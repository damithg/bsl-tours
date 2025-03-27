import React from 'react';

export interface TimelineEvent {
  id: string | number;
  time: string;
  title: string;
  description?: string;
  imageUrl?: string;
  category?: 'morning' | 'afternoon' | 'evening';
}

export interface TimelineDayData {
  day: number;
  date: string;
  events: TimelineEvent[];
}

interface VisualTimelineProps {
  data: TimelineDayData[];
  className?: string;
}

const VisualTimeline: React.FC<VisualTimelineProps> = ({ data, className }) => {
  return (
    <div className={`visual-timeline ${className || ''}`}>
      {data.map((day, dayIndex) => (
        <div key={`day-${day.day}`} className="mb-12 last:mb-0">
          {/* Day Header */}
          <div className="mb-4">
            <h3 className="text-2xl font-semibold text-[var(--accent)]">
              DAY {day.day}
            </h3>
            <p className="text-gray-600">{day.date}</p>
          </div>

          {/* Timeline content */}
          <div className="relative">
            {/* Categories */}
            {day.events.some(e => e.category === 'morning') && (
              <div className="mb-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">MORNING</h4>
              </div>
            )}

            {/* Timeline Line */}
            <div className="absolute top-0 bottom-0 left-[30px] w-0.5 bg-[var(--primary)] bg-opacity-70"></div>

            {/* Timeline Events */}
            {day.events.map((event, eventIndex) => (
              <div key={event.id} className="relative mb-10 last:mb-0 pl-[60px]">
                {/* Time Indicator */}
                <div className="absolute left-0 top-0 w-[60px] text-right pr-6">
                  <div className="text-lg font-bold">{event.time.split(' ')[0]}</div>
                  <div className="text-xs uppercase">{event.time.split(' ')[1]}</div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-[26px] top-[10px] w-[10px] h-[10px] rounded-full bg-[var(--secondary)] border-4 border-[var(--primary)] z-10"></div>

                {/* Event Content */}
                <div>
                  <h4 className="text-lg font-medium mb-2 text-[var(--accent)]">{event.title}</h4>
                  
                  {/* Event Image */}
                  {event.imageUrl && (
                    <div className="w-full max-w-md overflow-hidden rounded-lg mb-3 border border-gray-200">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title} 
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  {/* Event Description */}
                  {event.description && (
                    <p className="text-gray-600">{event.description}</p>
                  )}
                </div>

                {/* Category Break */}
                {eventIndex < day.events.length - 1 && 
                 event.category !== day.events[eventIndex + 1].category && (
                  <div className="mt-10 mb-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
                      {day.events[eventIndex + 1].category?.toUpperCase()}
                    </h4>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VisualTimeline;