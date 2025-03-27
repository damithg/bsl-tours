import React, { useState, useEffect, useMemo } from "react";
import AnimatedRouteMap, { MapPoint } from "./AnimatedRouteMap";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar } from "lucide-react";

interface TourRouteMapProps {
  itinerary: {
    day: number;
    title: string;
    description: string;
    accommodation?: string;
  }[];
  destinations: string[];
  className?: string;
}

// Define destination coordinates based on common locations in Sri Lanka
const destinationCoordinates: Record<string, { x: number; y: number }> = {
  "Colombo": { x: 125, y: 200 },
  "Negombo": { x: 115, y: 185 },
  "Kandy": { x: 165, y: 180 },
  "Sigiriya": { x: 180, y: 145 },
  "Dambulla": { x: 175, y: 155 },
  "Anuradhapura": { x: 160, y: 125 },
  "Polonnaruwa": { x: 195, y: 150 },
  "Nuwara Eliya": { x: 165, y: 210 },
  "Ella": { x: 185, y: 225 },
  "Yala National Park": { x: 215, y: 250 },
  "Galle": { x: 125, y: 250 },
  "Mirissa": { x: 130, y: 265 },
  "Bentota": { x: 115, y: 230 },
  "Trincomalee": { x: 205, y: 120 },
  "Jaffna": { x: 165, y: 75 },
  "Arugam Bay": { x: 230, y: 230 },
  "Matara": { x: 140, y: 270 },
  "Tangalle": { x: 170, y: 265 },
  "Hikkaduwa": { x: 120, y: 240 },
  "Unawatuna": { x: 125, y: 245 },
  "Galle Fort": { x: 125, y: 250 },
  "Adam's Peak": { x: 150, y: 215 },
  "Wilpattu National Park": { x: 135, y: 120 },
  "Horton Plains": { x: 160, y: 215 },
  "Haputale": { x: 175, y: 220 },
  "Udawalawe National Park": { x: 180, y: 235 },
  "Dambulla Cave Temple": { x: 175, y: 155 },
  // Add a generic coordinates function for destinations not in our list
  "DEFAULT": { x: 165, y: 180 } // Center of the island
};

// Utility function to get coordinates for a destination
function getCoordinatesForDestination(name: string): { x: number; y: number } {
  // Try to find an exact match
  if (destinationCoordinates[name]) {
    return destinationCoordinates[name];
  }
  
  // Try to find a partial match
  const partialMatch = Object.keys(destinationCoordinates).find(key => 
    name.toLowerCase().includes(key.toLowerCase()) || 
    key.toLowerCase().includes(name.toLowerCase())
  );
  
  if (partialMatch) {
    return destinationCoordinates[partialMatch];
  }
  
  // Return default coordinates
  return destinationCoordinates["DEFAULT"];
}

const TourRouteMap: React.FC<TourRouteMapProps> = ({ 
  itinerary, 
  destinations,
  className = ""
}) => {
  const [activeDay, setActiveDay] = useState<number>(1);
  
  // Memoize map points to prevent recalculation on every render
  const mapPoints = useMemo(() => {
    if (destinations.length === 0 && itinerary.length === 0) return [];
    
    const points: MapPoint[] = [];
    
    // If we have specific destinations
    if (destinations.length > 0) {
      destinations.forEach((dest, index) => {
        const coords = getCoordinatesForDestination(dest);
        points.push({
          id: `dest-${index}`,
          name: dest,
          x: coords.x,
          y: coords.y,
          day: index + 1
        });
      });
    } 
    // Otherwise extract locations from itinerary
    else if (itinerary.length > 0) {
      itinerary.forEach(day => {
        // Try to extract location from title
        const locationFromTitle = day.title.split(",").map(part => part.trim())[0];
        const coords = getCoordinatesForDestination(locationFromTitle);
        
        points.push({
          id: `day-${day.day}`,
          name: locationFromTitle,
          x: coords.x,
          y: coords.y,
          day: day.day
        });
      });
    }
    
    return points;
  }, [destinations, itinerary]);
  
  // Handle clicking on a day in the itinerary
  const handleDayClick = (day: number) => {
    setActiveDay(day);
  };
  
  // Handle clicking on a point in the map
  const handlePointClick = (pointId: number | string) => {
    const point = mapPoints.find(p => p.id === pointId);
    if (point && point.day) {
      setActiveDay(point.day);
    }
  };

  if (itinerary.length === 0) {
    return null;
  }

  return (
    <div className={`${className}`}>
      {/* Integrated Tour Map with Itinerary */}
      <div className="flex h-[700px] rounded-lg overflow-hidden shadow-lg">
        {/* Left: Tour Itinerary */}
        <div className="w-1/2 bg-white">
          <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Tour Itinerary
              </h3>
              <Badge variant="outline" className="px-2 py-0 text-xs">
                {itinerary.length} Days
              </Badge>
            </div>
            
            <div className="space-y-3 flex-grow">
              {itinerary.map((day, index) => (
                <div 
                  key={`day-${day.day}`} 
                  className={`
                    relative py-2 px-3 rounded-lg 
                    transition-all duration-300 ease-in-out
                    ${activeDay === day.day 
                      ? 'bg-primary/5 border-primary/20 border shadow-sm scale-102 transform' 
                      : 'bg-gray-50 border border-gray-100 hover:bg-gray-100/70 hover:shadow-md hover:translate-y-[-2px] hover:scale-[1.01]'
                    }
                    cursor-pointer group
                  `}
                  onClick={() => handleDayClick(day.day)}
                >
                  <div className="flex items-center">
                    {/* Day indicator */}
                    <div 
                      className={`
                        w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0
                        transition-all duration-300 ease-in-out
                        ${activeDay === day.day 
                          ? 'bg-primary text-white ring-2 ring-primary/20 ring-offset-1' 
                          : 'bg-white border border-gray-200 text-gray-600 group-hover:bg-primary/10 group-hover:border-primary/30'
                        }
                        shadow-sm font-bold text-sm mr-3
                      `}
                    >
                      {day.day}
                    </div>
                  
                    <div className="flex-grow">
                      {/* Day title */}
                      <div className="flex justify-between items-center">
                        <h4 className={`font-bold text-sm transition-all duration-300 ease-in-out ${activeDay === day.day ? 'text-primary' : 'group-hover:text-primary/80'}`}>
                          {day.title}
                        </h4>
                        {index < itinerary.length - 1 && (
                          <ArrowRight 
                            className={`
                              h-3 w-3 transition-all duration-300 ease-in-out
                              ${activeDay === day.day 
                                ? 'text-primary transform translate-x-0.5' 
                                : 'text-gray-400 group-hover:text-primary/60 group-hover:translate-x-0.5 transform'
                              }
                            `} 
                          />
                        )}
                      </div>
                      
                      {/* Accommodation if available */}
                      {day.accommodation && (
                        <div className={`
                          flex items-center text-xs font-medium mt-0.5
                          transition-all duration-300 ease-in-out
                          ${activeDay === day.day 
                            ? 'text-primary/70' 
                            : 'text-gray-500 group-hover:text-primary/50'
                          }
                        `}>
                          <svg xmlns="http://www.w3.org/2000/svg" 
                            className={`
                              h-3 w-3 mr-1 transition-all duration-300 ease-in-out
                              ${activeDay === day.day ? 'stroke-primary' : 'group-hover:stroke-primary/60'}
                            `}
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <path d="M3 7v11m0-7h18m0 0v7m-5-7v-3a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v3"></path>
                          </svg>
                          {day.accommodation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100 text-center text-xs">
              <div className="flex items-center justify-center gap-1.5 text-gray-500 group cursor-help">
                <svg xmlns="http://www.w3.org/2000/svg" 
                  className="h-3.5 w-3.5 transition-all duration-300 group-hover:text-primary/70" 
                  viewBox="0 0 24 24" fill="none" 
                  stroke="currentColor" strokeWidth="2" 
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span className="transition-all duration-300 group-hover:text-primary/70">Click on a day or map marker to see the route animation</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right: Animated Route Map */}
        <div className="w-1/2">
          <AnimatedRouteMap
            title="Tour Route"
            points={mapPoints}
            activeDay={activeDay}
            onPointClick={handlePointClick}
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TourRouteMap;