import React, { useState } from 'react';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent } from '@/components/ui/card';

// Define the Destination type locally since we can't import from shared/schema
interface Destination {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  featured: boolean;
}

interface MapDestination extends Destination {
  x: number; // x position (percentage)
  y: number; // y position (percentage)
}

interface InteractiveMapProps {
  destinations: Destination[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ destinations }) => {
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(null);

  // Map destinations to positions on the Sri Lanka map
  const mapDestinations: MapDestination[] = [
    {
      ...destinations.find(d => d.name === "Sigiriya Rock Fortress") || destinations[0],
      x: 49,
      y: 39
    },
    {
      ...destinations.find(d => d.name === "Kandy") || destinations[1],
      x: 44,
      y: 48
    },
    {
      ...destinations.find(d => d.name === "Galle Fort") || destinations[2],
      x: 28,
      y: 76
    },
    {
      ...destinations.find(d => d.name === "Yala National Park") || destinations[3],
      x: 52,
      y: 78
    },
    {
      ...destinations.find(d => d.name === "Ella") || destinations[4],
      x: 57,
      y: 65
    },
    // Add more destinations with their coordinates as needed
    {
      ...destinations.find(d => d.name === "Colombo") || { id: 6, name: "Colombo", description: "Sri Lanka's vibrant capital city with a blend of colonial architecture and modern amenities.", imageUrl: "/images/destinations/colombo.jpg", featured: false },
      x: 25,
      y: 67
    },
    {
      ...destinations.find(d => d.name === "Anuradhapura") || { id: 7, name: "Anuradhapura", description: "Ancient city with sacred Buddhist sites and well-preserved ruins.", imageUrl: "/images/destinations/anuradhapura.jpg", featured: false },
      x: 42,
      y: 27
    },
    {
      ...destinations.find(d => d.name === "Trincomalee") || { id: 8, name: "Trincomalee", description: "Port city with pristine beaches and natural harbor.", imageUrl: "/images/destinations/trincomalee.jpg", featured: false },
      x: 67,
      y: 30
    },
    {
      ...destinations.find(d => d.name === "Nuwara Eliya") || { id: 9, name: "Nuwara Eliya", description: "Hill station with cool climate and tea plantations.", imageUrl: "/images/destinations/nuwaraeliya.jpg", featured: false },
      x: 50,
      y: 57
    }
  ];

  return (
    <div className="w-full mt-12 mb-16">
      <h2 className="text-3xl font-bold text-center mb-8">Explore Sri Lanka</h2>
      <div className="max-w-4xl mx-auto relative">
        <Card className="bg-white/95 shadow-lg border-0">
          <CardContent className="p-0 relative">
            {/* Sri Lanka Map SVG */}
            <div className="relative">
              <svg
                viewBox="0 0 300 500"
                className="w-full h-auto"
                style={{ maxHeight: "700px" }}
              >
                <path
                  d="M138.5,60.5c-2.9,0.6-5.8,1.3-8.8,1.7c-4.5,0.6-9.1,1.1-13.5,2c-2.1,0.4-4.5,1.5-5.7,3.1c-2.3,3-3.7,6.7-5.6,10.1
                  c-2.1,3.7-3.1,7.8-3.8,12c-1,6.1-1.5,12.2-1.6,18.3c-0.1,6.3,0.5,12.6,0.9,18.9c0.5,7.1,1,14.3,1.5,21.4c0.6,8.1,1.3,16.1,1.9,24.2
                  c0.9,11.3,2.3,22.6,2.5,33.9c0.1,8.7-0.7,17.5-2.3,26c-1.1,5.7-2.2,11.5-4.2,16.9c-0.9,2.4-2.8,4.5-4,6.8
                  c-3.2,6.1-6.5,12.2-9.3,18.5c-6.1,13.9-12.4,27.6-17.7,41.9c-3.1,8.4-6.3,16.8-7.9,25.8c-1.4,8-2.1,16.3-1.8,24.4
                  c0.5,15,3.8,29.7,7.7,44.1c3.2,11.8,7.1,23.4,11.8,34.7c1.2,2.8,2.5,5.6,4.5,7.8c1.3,1.5,3.1,2.7,5,3.4c2.1,0.7,4.4,0.7,6.6,0.9
                  c4.7,0.3,9.3,0.5,14,0.8c3.7,0.2,7.5,0.4,11.2,0.6c3.3,0.2,6,2.2,9.2,2.3c4.5,0.2,9-0.1,13.5-0.2c6.3-0.1,12.6-0.3,19-0.4
                  c4.2-0.1,8.5-0.1,12.8-0.1c2.7,0,5.5,0.1,8.2,0.1c2.7,0,5.4-0.3,8-0.4c5.2-0.2,10.5-0.3,15.7-0.5c3.4-0.1,6.8-0.2,10.2-0.3
                  c4.7-0.2,9.1-1.6,13.7-2.4c2.3-0.4,4.7-0.3,6.9-1.1c2.3-0.8,4.1-2.4,5.9-4c1.5-1.3,3-2.7,4.5-4.1c2.4-2.3,4-5.3,5.5-8.3
                  c2.3-4.8,4.3-9.7,6.1-14.7c2.2-6.2,4.5-12.4,6.7-18.6c3.6-10.4,6.7-20.9,9.2-31.7c2.4-10.8,4.8-21.8,5.3-32.9
                  c0.2-5.1-0.2-10.2-1.1-15.2c-0.9-5.3-1.7-10.7-3.6-15.7c-2.2-5.8-4.5-11.6-7.4-17.1c-1.6-3-4.3-5.4-6.1-8.3
                  c-2.7-4.5-5.1-9.1-7.5-13.8c-4.8-9.4-9.2-18.9-13.8-28.4c-0.9-2-1.9-4-2.7-6c-1.4-3.5-2.7-7.1-4-10.6c-2.8-7.3-5.6-14.5-8.3-21.9
                  c-4.3-11.6-8.8-23.1-12.7-34.9c-2.1-6.5-3.6-13.2-5.5-19.8c-1.6-5.5-3.7-10.8-5.5-16.3c-2.8-8.3-5.5-16.7-8.2-25
                  c-1.5-4.5-3.1-9-4.3-13.6c-1.4-5.4-2.6-10.9-3.6-16.4c-1-5.5-1.8-11-3.4-16.3c-1-3.4-2.9-6.6-4.5-9.8c-2.6-5.2-5.2-10.4-7.7-15.6
                  c-2.7-5.7-6.8-10.6-12.4-13.4C144.5,60.3,141.5,59.9,138.5,60.5z"
                  fill="#FFF8EA"
                  stroke="#987654"
                  strokeWidth="3"
                />

                {/* Map pins for destinations */}
                {mapDestinations.map((dest) => (
                  <TooltipProvider key={dest.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <g
                          className="cursor-pointer transform transition-transform hover:scale-125"
                          onMouseEnter={() => setHoveredDestination(dest.name)}
                          onMouseLeave={() => setHoveredDestination(null)}
                          style={{
                            transform: `translate(${dest.x}%, ${dest.y}%)`,
                          }}
                        >
                          <circle
                            cx="0"
                            cy="0"
                            r="6"
                            fill={hoveredDestination === dest.name ? "#F59E0B" : "#3B82F6"}
                            stroke="#FFFFFF"
                            strokeWidth="1.5"
                          />
                          <circle
                            cx="0"
                            cy="0"
                            r="3"
                            fill="#FFFFFF"
                          />
                        </g>
                      </TooltipTrigger>
                      <TooltipContent className="p-0 overflow-hidden max-w-xs">
                        <div className="flex flex-col">
                          <div className="relative h-28 overflow-hidden">
                            <img 
                              src={dest.imageUrl} 
                              alt={dest.name}
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <h3 className="absolute bottom-2 left-2 text-white font-bold">{dest.name}</h3>
                          </div>
                          <div className="p-3 bg-white">
                            <p className="text-sm text-gray-700">{dest.description}</p>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </svg>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-4 text-center text-gray-600 italic text-sm">
          Hover over the map markers to discover Sri Lanka's top destinations
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;