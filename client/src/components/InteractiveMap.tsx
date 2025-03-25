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
  // Set Sigiriya (ID 1) as the default selected destination
  const [activeDestination, setActiveDestination] = useState<number | null>(1);

  // Hard-coded destinations with coordinates for the watercolor Sri Lanka map image
  const mapData = [
    {
      id: 1,
      name: "Sigiriya", 
      description: "Ancient rock fortress with frescoes and stunning views.",
      imageUrl: "https://images.unsplash.com/photo-1588428895011-8a3fb77e433a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: true,
      x: 180, // Adjusted for the watercolor map
      y: 145
    },
    {
      id: 2,
      name: "Kandy", 
      description: "Cultural capital and home to the Temple of the Sacred Tooth Relic.",
      imageUrl: "https://images.unsplash.com/photo-1586613835017-4748b1722780?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: true,
      x: 165,
      y: 180
    },
    {
      id: 3,
      name: "Colombo", 
      description: "Sri Lanka's vibrant capital city with colonial architecture and modern amenities.",
      imageUrl: "https://images.unsplash.com/photo-1575994532957-15b093930c7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: true,
      x: 125,
      y: 195
    },
    {
      id: 4,
      name: "Galle", 
      description: "Historic fort city with Dutch colonial architecture on the southern coast.",
      imageUrl: "https://images.unsplash.com/photo-1586450463118-8d0cddab713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: false,
      x: 125,
      y: 240
    },
    {
      id: 5,
      name: "Trincomalee", 
      description: "Port city with beautiful beaches and natural harbors.",
      imageUrl: "https://images.unsplash.com/photo-1586686460175-794e0662cc3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: false,
      x: 205,
      y: 120
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
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Explore Sri Lanka</h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    Interactive Map
                  </span>
                </div>
                <div className="relative aspect-[3/4] border border-gray-100 rounded-lg shadow-lg overflow-hidden bg-blue-50/30">
                  {/* Sri Lanka map image */}
                  <div className="absolute inset-0 rounded overflow-hidden flex items-center justify-center p-4">
                    <img 
                      src="https://i.pinimg.com/736x/e6/c5/30/e6c5307dc64c80debc4c6f617fa4d26c.jpg" 
                      alt="Sri Lanka Map" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  
                  {/* Map overlay with a subtle gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/5 to-blue-50/5 pointer-events-none"></div>
                  
                  {/* Destination markers */}
                  {mapData.map((dest) => (
                    <button
                      key={dest.id}
                      className={`absolute w-5 h-5 rounded-full transition-all duration-300 transform ${activeDestination === dest.id ? 'bg-amber-500 scale-125 ring-2 ring-amber-300' : 'bg-primary shadow-md'}`}
                      style={{ 
                        left: `${dest.x}px`, 
                        top: `${dest.y}px`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: activeDestination === dest.id ? 10 : 5
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
                  <div className="h-full flex flex-col shadow-lg rounded-lg overflow-hidden border border-gray-100">
                    {mapData.filter(d => d.id === activeDestination).map(dest => (
                      <div key={dest.id} className="h-full flex flex-col">
                        <div className="h-60 relative overflow-hidden">
                          <img 
                            src={dest.imageUrl} 
                            alt={dest.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                          
                          {/* Destination name and featured badge */}
                          <div className="absolute bottom-0 left-0 w-full p-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-white text-2xl font-bold">{dest.name}</h3>
                              {dest.featured && (
                                <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-grow bg-white p-5">
                          {/* Destination details */}
                          <div className="space-y-4">
                            <p className="text-gray-700">{dest.description}</p>
                            
                            {/* Attractions section */}
                            <div className="pt-2">
                              <h4 className="text-sm font-semibold text-gray-600 mb-2">POPULAR ATTRACTIONS</h4>
                              <ul className="grid grid-cols-2 gap-2">
                                <li className="flex items-center text-sm">
                                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                                  Historical Sites
                                </li>
                                <li className="flex items-center text-sm">
                                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                                  Cultural Experiences
                                </li>
                                <li className="flex items-center text-sm">
                                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                                  Local Cuisine
                                </li>
                                <li className="flex items-center text-sm">
                                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                                  Scenic Views
                                </li>
                              </ul>
                            </div>
                            
                            <div className="pt-3">
                              <a 
                                href="/destinations" 
                                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm transition-colors"
                              >
                                Explore {dest.name} Tours
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100 p-8 shadow-md">
                    <div className="text-center max-w-xs">
                      <div className="mb-4 text-primary/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                      </div>
                      <h3 className="text-lg font-medium mb-2">Destination Details</h3>
                      <p className="text-gray-500 text-sm">Select a location on the map to view detailed information about that destination</p>
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