import React from 'react';

// Simplified interfaces for cleaner itinerary display
export interface TimelineDayData {
  day: number;
  title: string;
  description?: string;
  imageUrl?: string;
  accommodation?: string;
}

interface VisualTimelineProps {
  data: TimelineDayData[];
  className?: string;
}

const VisualTimeline: React.FC<VisualTimelineProps> = ({ data, className }) => {
  return (
    <div className={`visual-timeline ${className || ''}`}>
      {data.map((day, dayIndex) => (
        <div key={`day-${day.day}`} className="mb-16 last:mb-0">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-0 bottom-0 left-[30px] w-0.5 bg-[var(--primary)]"></div>
            
            <div className="relative pl-[70px]">
              {/* Day Number Circle */}
              <div className="absolute left-[18px] top-0 w-[24px] h-[24px] rounded-full bg-[var(--secondary)] border-4 border-[var(--primary)] z-10"></div>
              
              {/* Day Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-[var(--accent)]">
                  Day {day.day}
                </h3>
                <h4 className="text-xl font-medium mt-2 text-gray-700">{day.title}</h4>
              </div>
              
              {/* Day Content */}
              <div className="mb-8">
                {/* Image */}
                <div className="w-full max-w-2xl overflow-hidden rounded-lg mb-6 border border-gray-100 shadow-md">
                  <img 
                    src={day.imageUrl || `https://source.unsplash.com/featured/?srilanka,travel`}
                    alt={day.title || `Day ${day.day}`} 
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Description */}
                {day.description && (
                  <div className="prose prose-sm max-w-none text-gray-600 mb-6">
                    <p>{day.description}</p>
                  </div>
                )}
                
                {/* Accommodation */}
                {day.accommodation && day.accommodation !== "N/A" && (
                  <div className="bg-[#f8f7f2] px-4 py-3 rounded-lg inline-block">
                    <span className="font-semibold text-[var(--accent)]">Accommodation:</span> {day.accommodation}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VisualTimeline;