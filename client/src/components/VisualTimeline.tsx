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
      {data.map((day, dayIndex) => {
        // Determine if this is an even or odd day for alternating layout
        const isEven = dayIndex % 2 === 0;
        
        return (
          <div key={`day-${day.day}`} className="mb-16 last:mb-0">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-0 bottom-0 left-[30px] w-0.5 bg-[var(--primary)]"></div>
              
              <div className="relative pl-[70px]">
                {/* Day Number Circle */}
                <div className="absolute left-[18px] top-0 w-[24px] h-[24px] rounded-full bg-[var(--secondary)] border-4 border-[var(--primary)] z-10 day-circle"></div>
                
                {/* Day Header - Title only */}
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-[var(--accent)] flex items-center">
                    <span className="bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                      {day.day}
                    </span>
                    {day.title}
                  </h3>
                </div>
                
                {/* Day Content - Now using a 2-column layout with alternating sides */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
                  {/* Image Column - Alternates between left and right */}
                  <div className={`md:col-span-5 order-2 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                    <div className="w-full overflow-hidden rounded-lg border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="aspect-w-4 aspect-h-3">
                        <img 
                          src={day.imageUrl || `https://source.unsplash.com/featured/?srilanka,travel`}
                          alt={day.title || `Day ${day.day}`} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          width="400"
                          height="300"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Text Content Column - Alternates between right and left */}
                  <div className={`md:col-span-7 order-1 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                    {/* Description */}
                    {day.description && (
                      <div className="prose prose-sm max-w-none text-gray-600 mb-6">
                        <div dangerouslySetInnerHTML={{ __html: day.description }} />
                      </div>
                    )}
                    
                    {/* Accommodation */}
                    {day.accommodation && day.accommodation !== "N/A" && (
                      <div className="bg-[#f8f7f2] px-4 py-3 rounded-lg inline-flex items-center accommodation-info">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[var(--accent)]" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        <span className="font-semibold text-[var(--accent)]">Accommodation:</span> {day.accommodation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VisualTimeline;