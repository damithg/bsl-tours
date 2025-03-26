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
      
      // Line path connecting two points
      const pathId = `path-${start.id}-to-${end.id}`;
      const path = (
        <path
          key={pathId}
          id={pathId}
          d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
          stroke="#D1D5DB"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
        />
      );
      newPaths.push(path);
      
      // Animated path overlay with gradient
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
          style={{
            animation: `drawRoute 1.5s ease-in-out forwards ${i * 0.3}s`,
          }}
        />
      );
      newAnimatedPaths.push(animatedPath);
    }
    
    setPaths(newPaths);
    setAnimatedPaths(newAnimatedPaths);
  }, [activePoints]);

  return (
    <Card className={`shadow-lg border-0 overflow-hidden h-full ${className}`}>
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            {title}
          </h3>
          <Badge variant="outline" className="px-2 py-0 text-xs">
            {activePoints.length} Destinations
          </Badge>
        </div>

        <div className="relative border border-gray-100 rounded-lg shadow-sm overflow-hidden bg-blue-50/30 flex-grow">
          {/* SVG Definitions */}
          <svg height="0" width="0">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary) / 0.3)" />
              </linearGradient>
              
              {/* Animation for drawing route */}
              <style>
                {`
                @keyframes drawRoute {
                  to {
                    stroke-dashoffset: 0;
                  }
                }
                @keyframes pulse {
                  0% {
                    transform: scale(1);
                    opacity: 1;
                  }
                  50% {
                    transform: scale(1.3);
                    opacity: 0.7;
                  }
                  100% {
                    transform: scale(1);
                    opacity: 1;
                  }
                }
                .pulse {
                  animation: pulse 2s infinite;
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
                    
                    {/* Marker dot */}
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={6}
                      fill={isActivePoint ? "hsl(var(--primary))" : "#94A3B8"}
                      stroke="white"
                      strokeWidth="2"
                      style={{ cursor: onPointClick ? "pointer" : "default" }}
                      onClick={() => onPointClick && onPointClick(point.id)}
                    />
                    
                    {/* Day number label */}
                    {point.day !== undefined && (
                      <g>
                        <rect
                          x={point.x - 10}
                          y={point.y + 10}
                          width={20}
                          height={16}
                          rx={8}
                          fill={isActivePoint ? "hsl(var(--primary))" : "white"}
                          stroke={isActivePoint ? "none" : "#94A3B8"}
                          strokeWidth="1"
                        />
                        <text
                          x={point.x}
                          y={point.y + 22}
                          textAnchor="middle"
                          fontSize="10"
                          fontWeight="bold"
                          fill={isActivePoint ? "white" : "#64748B"}
                        >
                          {point.day}
                        </text>
                      </g>
                    )}
                    
                    {/* Location name label */}
                    <g 
                      style={{ 
                        opacity: isActivePoint ? 1 : 0.7,
                        transition: "opacity 0.3s ease" 
                      }}
                    >
                      <rect
                        x={point.x - 40}
                        y={point.y - 30}
                        width={80}
                        height={20}
                        rx={4}
                        fill="white"
                        stroke="#E2E8F0"
                        strokeWidth="1"
                      />
                      <text
                        x={point.x}
                        y={point.y - 16}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight={isActivePoint ? "bold" : "normal"}
                        fill="#334155"
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
            <div className="bg-white/80 backdrop-blur-sm text-xs px-2 py-1 rounded shadow-sm">
              <div className="flex items-center gap-1">
                <span className="w-3 h-1 bg-primary rounded-full"></span>
                <span>Tour Route</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-2 text-xs text-center text-gray-500">
          Interactive map showing the tour route with {activePoints.length} destinations
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimatedRouteMap;