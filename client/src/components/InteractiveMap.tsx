import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

// Define local types to avoid import issues
interface Destination {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  featured: boolean;
}

interface MapDestination extends Destination {
  x: number; 
  y: number; 
}

interface InteractiveMapProps {
  destinations: Destination[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ destinations }) => {
  const [activeDestination, setActiveDestination] = useState<number | null>(null);

  // Hard-coded destinations for demo
  const mapData = [
    {
      id: 1,
      name: "Sigiriya", 
      description: "Ancient rock fortress with frescoes and stunning views.",
      imageUrl: "https://images.unsplash.com/photo-1588428895011-8a3fb77e433a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: true,
      x: 150,
      y: 190
    },
    {
      id: 2,
      name: "Kandy", 
      description: "Cultural capital and home to the Temple of the Sacred Tooth Relic.",
      imageUrl: "https://images.unsplash.com/photo-1586613835017-4748b1722780?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: true,
      x: 140,
      y: 240
    },
    {
      id: 3,
      name: "Colombo", 
      description: "Sri Lanka's vibrant capital city with colonial architecture and modern amenities.",
      imageUrl: "https://images.unsplash.com/photo-1575994532957-15b093930c7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: true,
      x: 75,
      y: 335
    }
  ];

  return (
    <div className="w-full mt-12 mb-16">
      <h2 className="text-3xl font-bold text-center mb-8">Interactive Destination Map</h2>
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg border-0 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left column: Map with markers */}
              <div className="w-full md:w-1/2 relative bg-blue-50/30 rounded-xl p-4">
                <h3 className="text-lg font-bold mb-4">Explore Sri Lanka</h3>
                <div className="relative aspect-[3/5]">
                  {/* Sri Lanka outline */}
                  <div className="absolute inset-0 bg-white rounded shadow-sm">
                    <svg 
                      viewBox="0 0 300 500" 
                      className="w-full h-full" 
                      xmlns="http://www.w3.org/2000/svg"
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
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                  
                  {/* Destination markers */}
                  {mapData.map((dest) => (
                    <button
                      key={dest.id}
                      className={`absolute w-6 h-6 rounded-full transition-all duration-300 transform ${activeDestination === dest.id ? 'bg-amber-500 scale-125' : 'bg-primary'}`}
                      style={{ 
                        left: `${dest.x / 2.5}px`, 
                        top: `${dest.y / 1.5}px`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onClick={() => setActiveDestination(dest.id === activeDestination ? null : dest.id)}
                    >
                      <span className="flex items-center justify-center h-full w-full">
                        <span className="h-2 w-2 bg-white rounded-full"></span>
                      </span>
                      {activeDestination === dest.id && (
                        <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white text-black text-xs px-2 py-1 rounded whitespace-nowrap shadow-md">
                          {dest.name}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-sm text-center text-gray-600">
                  Click on a marker to see destination details
                </p>
              </div>
              
              {/* Right column: Destination details */}
              <div className="w-full md:w-1/2">
                {activeDestination ? (
                  <div className="h-full flex flex-col">
                    {mapData.filter(d => d.id === activeDestination).map(dest => (
                      <div key={dest.id} className="h-full flex flex-col">
                        <div className="h-52 relative overflow-hidden rounded-t-lg">
                          <img 
                            src={dest.imageUrl} 
                            alt={dest.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                          <h3 className="absolute bottom-3 left-4 text-white text-xl font-bold">{dest.name}</h3>
                        </div>
                        <div className="flex-grow bg-white p-4 rounded-b-lg">
                          <p className="text-gray-700 mb-4">{dest.description}</p>
                          <a 
                            href="/destinations" 
                            className="inline-block bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm transition-colors"
                          >
                            View more destinations
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100 p-8">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2">Select a Destination</h3>
                      <p className="text-gray-500">Click on a marker on the map to view destination details</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveMap;