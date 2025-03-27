import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface MapPoint {
  id: number | string;
  name: string;
  x: number;
  y: number;
  day?: number;
  isActive?: boolean;
}

interface AnimatedRouteMapProps {
  title?: string;
  mapImage?: string;
  points: MapPoint[];
  activeDay?: number;
  className?: string;
  onPointClick?: (pointId: number | string) => void;
}

const AnimatedRouteMap: React.FC<AnimatedRouteMapProps> = ({
  title = "Tour Route",
  mapImage = "https://i.pinimg.com/736x/e6/c5/30/e6c5307dc64c80debc4c6f617fa4d26c.jpg",
  points,
  activeDay,
  className = "",
  onPointClick,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [paths, setPaths] = useState<JSX.Element[]>([]);
  const [animatedPaths, setAnimatedPaths] = useState<JSX.Element[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<number | string | null>(null);
  
  // Memoize active points to prevent recalculation on every render
  const activePoints = React.useMemo(() => {
    return points
      .filter(p => p.day !== undefined)
      .sort((a, b) => (a.day || 0) - (b.day || 0));
  }, [points]);

  // Effect to handle day change and trigger animation
  useEffect(() => {
    if (activeDay !== undefined) {
      // Find the point for this day
      const pointForDay = points.find(p => p.day === activeDay);
      if (pointForDay) {
        setSelectedPoint(pointForDay.id);
      }
    }
  }, [activeDay, points]);

  // Effect to generate and animate paths when points change
  useEffect(() => {
    if (activePoints.length < 2) return;

    // Create path elements
    const newPaths: JSX.Element[] = [];
    const newAnimatedPaths: JSX.Element[] = [];
    
    // Create path between each consecutive point
    for (let i = 0; i < activePoints.length - 1; i++) {
      const start = activePoints[i];
      const end = activePoints[i + 1];
      
      // Line path connecting two points with improved styling
      const pathId = `path-${start.id}-to-${end.id}`;
      const path = (
        <path
          key={pathId}
          id={pathId}
          d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
          stroke="#E2E8F0"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray="5,5"
          strokeLinecap="round"
          style={{
            opacity: 0.6,
            filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05))"
          }}
        />
      );
      newPaths.push(path);
      
      // Animated path overlay with gradient and smoother animation
      const animatedPathId = `animated-${pathId}`;
      const animatedPath = (
        <path
          key={animatedPathId}
          d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
          stroke="url(#routeGradient)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          strokeLinecap="round"
          filter="drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))"
          style={{
            animation: `drawRoute 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards ${i * 0.3}s`,
          }}
        />
      );
      newAnimatedPaths.push(animatedPath);
    }
    
    setPaths(newPaths);
    setAnimatedPaths(newAnimatedPaths);
  }, [activePoints]);

  return (
    <Card className={`shadow-lg border border-gray-100/80 overflow-hidden h-full hover:shadow-xl transition-all duration-500 ${className}`}>
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4 group">
          <h3 className="text-lg font-bold flex items-center gap-2 transition-all duration-300 group-hover:text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="relative">
              {title}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full"></span>
            </span>
          </h3>
          <Badge 
            variant="outline" 
            className="px-3 py-0.5 text-xs border-primary/20 bg-primary/5 text-primary shadow-sm transition-all duration-300 hover:bg-primary/10 cursor-default"
          >
            {activePoints.length} Destinations
          </Badge>
        </div>

        <div className="relative border border-gray-100 rounded-lg shadow-sm overflow-hidden bg-gradient-to-br from-blue-50/30 to-white flex-grow transition-all duration-500 hover:shadow-md group">
          {/* SVG Definitions */}
          <svg height="0" width="0">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary) / 0.3)" />
              </linearGradient>
              
              {/* Animation for drawing route and enhanced effects */}
              <style>
                {`
                @keyframes drawRoute {
                  0% {
                    stroke-dashoffset: 1000;
                    stroke-width: 2;
                  }
                  50% {
                    stroke-width: 3.5;
                  }
                  100% {
                    stroke-dashoffset: 0;
                    stroke-width: 3;
                  }
                }

                @keyframes pulse {
                  0% {
                    transform: scale(1);
                    opacity: 0.7;
                  }
                  50% {
                    transform: scale(1.5);
                    opacity: 0.4;
                  }
                  100% {
                    transform: scale(1);
                    opacity: 0.7;
                  }
                }

                @keyframes fadeIn {
                  from {
                    opacity: 0;
                    transform: translateY(10px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }

                @keyframes highlight {
                  0% {
                    stroke-width: 2;
                    filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0));
                  }
                  50% {
                    stroke-width: 3;
                    filter: drop-shadow(0 0 3px rgba(var(--primary-rgb), 0.5));
                  }
                  100% {
                    stroke-width: 2;
                    filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0));
                  }
                }

                .pulse {
                  animation: pulse 2.5s ease-in-out infinite;
                }

                .fade-in {
                  animation: fadeIn 0.5s ease-out forwards;
                }

                .highlight {
                  animation: highlight 1.5s ease-in-out infinite;
                }
                `}
              </style>
            </defs>
          </svg>

          {/* Sri Lanka map image */}
          <div className="relative w-full h-full rounded overflow-hidden flex items-center justify-center">
            <img
              src={mapImage}
              alt="Sri Lanka Map"
              className="absolute inset-0 w-full h-full object-contain"
            />
            
            {/* SVG overlay for animated routes */}
            <svg
              ref={svgRef}
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 350 450"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Background paths (dashed lines) */}
              {paths}
              
              {/* Animated paths */}
              {animatedPaths}
              
              {/* Destination markers */}
              {points.map((point) => {
                const isActivePoint = point.id === selectedPoint || point.isActive;
                const isCurrentDayPoint = point.day === activeDay;
                
                return (
                  <g key={`marker-${point.id}`}>
                    {/* Pulse effect for current day */}
                    {isCurrentDayPoint && (
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r={8}
                        fill="hsl(var(--primary) / 0.3)"
                        className="pulse"
                      />
                    )}
                    
                    {/* Marker dot with hover and click effects */}
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={isCurrentDayPoint ? 7 : 6}
                      fill={isActivePoint ? "hsl(var(--primary))" : "#94A3B8"}
                      stroke="white"
                      strokeWidth="2"
                      style={{ 
                        cursor: onPointClick ? "pointer" : "default",
                        transition: "all 0.3s ease-in-out",
                        transform: isCurrentDayPoint ? "scale(1.1)" : "scale(1)"
                      }}
                      onClick={() => onPointClick && onPointClick(point.id)}
                      onMouseEnter={(e) => {
                        const target = e.target as SVGCircleElement;
                        target.setAttribute('stroke', isActivePoint ? "hsl(var(--primary) / 0.3)" : "#E2E8F0");
                        target.setAttribute('r', '8');
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as SVGCircleElement;
                        target.setAttribute('stroke', 'white');
                        target.setAttribute('r', isCurrentDayPoint ? '7' : '6');
                      }}
                    />
                    
                    {/* Day number label with hover effects */}
                    {point.day !== undefined && (
                      <g 
                        style={{ cursor: "pointer" }}
                        onClick={() => onPointClick && onPointClick(point.id)}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.querySelector('rect');
                          const text = e.currentTarget.querySelector('text');
                          if (rect && text) {
                            if (!isActivePoint) {
                              rect.setAttribute('fill', 'hsl(var(--primary) / 0.1)');
                              rect.setAttribute('stroke', 'hsl(var(--primary) / 0.3)');
                              text.setAttribute('fill', 'hsl(var(--primary))');
                            } else {
                              rect.setAttribute('fill', 'hsl(var(--primary))');
                              rect.setAttribute('transform', 'scale(1.1)');
                              text.setAttribute('transform', 'scale(1.1)');
                            }
                          }
                        }}
                        onMouseLeave={(e) => {
                          const rect = e.currentTarget.querySelector('rect');
                          const text = e.currentTarget.querySelector('text');
                          if (rect && text) {
                            if (!isActivePoint) {
                              rect.setAttribute('fill', 'white');
                              rect.setAttribute('stroke', '#94A3B8');
                              text.setAttribute('fill', '#64748B');
                            } else {
                              rect.setAttribute('fill', 'hsl(var(--primary))');
                              rect.setAttribute('transform', 'scale(1)');
                              text.setAttribute('transform', 'scale(1)');
                            }
                          }
                        }}
                      >
                        <rect
                          x={point.x - 10}
                          y={point.y + 10}
                          width={20}
                          height={16}
                          rx={8}
                          fill={isActivePoint ? "hsl(var(--primary))" : "white"}
                          stroke={isActivePoint ? "none" : "#94A3B8"}
                          strokeWidth="1"
                          style={{ transition: "all 0.3s ease" }}
                        />
                        <text
                          x={point.x}
                          y={point.y + 22}
                          textAnchor="middle"
                          fontSize="10"
                          fontWeight="bold"
                          fill={isActivePoint ? "white" : "#64748B"}
                          style={{ transition: "all 0.3s ease" }}
                        >
                          {point.day}
                        </text>
                      </g>
                    )}
                    
                    {/* Location name label with hover effects */}
                    <g 
                      style={{ 
                        opacity: isActivePoint ? 1 : 0.7,
                        transition: "all 0.3s ease-in-out",
                        cursor: "pointer",
                        transform: isCurrentDayPoint ? "translateY(-3px)" : "translateY(0)",
                      }}
                      onClick={() => onPointClick && onPointClick(point.id)}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.querySelector('rect');
                        const text = e.currentTarget.querySelector('text');
                        e.currentTarget.style.opacity = "1";
                        
                        if (rect && text) {
                          if (!isActivePoint) {
                            rect.setAttribute('fill', 'hsl(var(--primary) / 0.05)');
                            rect.setAttribute('stroke', 'hsl(var(--primary) / 0.3)');
                            rect.setAttribute('filter', 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1))');
                            text.setAttribute('fill', 'hsl(var(--primary))');
                            text.setAttribute('font-weight', 'bold');
                          } else {
                            rect.setAttribute('filter', 'drop-shadow(0 3px 3px rgba(0, 0, 0, 0.15))');
                            rect.setAttribute('fill', 'hsl(var(--primary) / 0.1)');
                          }
                          e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        const rect = e.currentTarget.querySelector('rect');
                        const text = e.currentTarget.querySelector('text');
                        if (!isActivePoint) {
                          e.currentTarget.style.opacity = "0.7";
                        }
                        
                        if (rect && text) {
                          if (!isActivePoint) {
                            rect.setAttribute('fill', 'white');
                            rect.setAttribute('stroke', '#E2E8F0');
                            rect.removeAttribute('filter');
                            text.setAttribute('fill', '#334155');
                            text.setAttribute('font-weight', 'normal');
                          } else {
                            rect.removeAttribute('filter');
                            rect.setAttribute('fill', 'white');
                          }
                          e.currentTarget.style.transform = isCurrentDayPoint ? "translateY(-3px)" : "translateY(0)";
                        }
                      }}
                    >
                      <rect
                        x={point.x - 40}
                        y={point.y - 30}
                        width={80}
                        height={20}
                        rx={4}
                        fill="white"
                        stroke={isActivePoint ? "hsl(var(--primary) / 0.2)" : "#E2E8F0"}
                        strokeWidth="1"
                        style={{ transition: "all 0.3s ease" }}
                      />
                      <text
                        x={point.x}
                        y={point.y - 16}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight={isActivePoint ? "bold" : "normal"}
                        fill={isActivePoint ? "hsl(var(--primary))" : "#334155"}
                        style={{ transition: "all 0.3s ease" }}
                      >
                        {point.name}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="absolute bottom-2 right-2">
            <div className="bg-white/90 backdrop-blur-sm text-xs px-3 py-2 rounded-md shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
              <div className="flex flex-col gap-1.5">
                <div className="font-medium text-gray-700 mb-0.5">Tour Legend</div>
                <div className="flex items-center gap-2 group">
                  <span className="w-3 h-1.5 bg-primary rounded-full transition-all duration-300 group-hover:w-4 group-hover:bg-primary/80"></span>
                  <span className="transition-all duration-300 group-hover:text-primary/90">Active Route</span>
                </div>
                <div className="flex items-center gap-2 group">
                  <span className="w-3 h-1.5 bg-gray-300 rounded-full transition-all duration-300 group-hover:w-4 group-hover:bg-gray-400"></span>
                  <span className="transition-all duration-300 group-hover:text-gray-700">Planned Route</span>
                </div>
                <div className="flex items-center gap-2 group">
                  <div className="w-3 h-3 rounded-full bg-primary transition-all duration-300 group-hover:scale-110"></div>
                  <span className="transition-all duration-300 group-hover:text-primary/90">Active Destination</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-2 text-xs text-center text-gray-500 hover:text-primary/70 transition-colors duration-300">
          Interactive map showing the tour route with {activePoints.length} destinations
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimatedRouteMap;