import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export interface RouteDestination {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  days?: number;
}

interface TravelRoutePlannerProps {
  availableDestinations: RouteDestination[];
}

const TravelRoutePlanner: React.FC<TravelRoutePlannerProps> = ({ availableDestinations }) => {
  const [selectedDestinations, setSelectedDestinations] = useState<RouteDestination[]>([]);
  const [totalDays, setTotalDays] = useState(0);
  
  // Handle drag end event
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    
    // Dropped outside the list
    if (!destination) return;
    
    // Moving within the same list
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === 'selected-destinations') {
        const items = Array.from(selectedDestinations);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        setSelectedDestinations(items);
      }
    } 
    // Moving from available to selected
    else if (source.droppableId === 'available-destinations' && destination.droppableId === 'selected-destinations') {
      const sourceDestination = availableDestinations[source.index];
      
      // Don't add if already in the selected list
      if (selectedDestinations.some(item => item.id === sourceDestination.id)) {
        return;
      }
      
      // Add default 2 days per destination
      const destinationWithDays = {
        ...sourceDestination,
        days: sourceDestination.days || 2
      };
      
      const newSelectedDestinations = [
        ...selectedDestinations.slice(0, destination.index),
        destinationWithDays,
        ...selectedDestinations.slice(destination.index)
      ];
      
      setSelectedDestinations(newSelectedDestinations);
      updateTotalDays(newSelectedDestinations);
    }
    // Moving from selected to available (removing)
    else if (source.droppableId === 'selected-destinations' && destination.droppableId === 'available-destinations') {
      const newSelectedDestinations = Array.from(selectedDestinations);
      newSelectedDestinations.splice(source.index, 1);
      setSelectedDestinations(newSelectedDestinations);
      updateTotalDays(newSelectedDestinations);
    }
  };
  
  // Update days for a destination
  const updateDays = (index: number, days: number) => {
    const updatedDestinations = [...selectedDestinations];
    if (days < 1) days = 1; // Minimum 1 day
    updatedDestinations[index] = { ...updatedDestinations[index], days };
    setSelectedDestinations(updatedDestinations);
    updateTotalDays(updatedDestinations);
  };
  
  // Calculate total days
  const updateTotalDays = (destinations: RouteDestination[]) => {
    const sum = destinations.reduce((total, dest) => total + (dest.days || 0), 0);
    setTotalDays(sum);
  };
  
  // Remove a destination
  const removeDestination = (index: number) => {
    const updatedDestinations = [...selectedDestinations];
    updatedDestinations.splice(index, 1);
    setSelectedDestinations(updatedDestinations);
    updateTotalDays(updatedDestinations);
  };
  
  // Reset the planner
  const resetPlanner = () => {
    setSelectedDestinations([]);
    setTotalDays(0);
  };
  
  return (
    <div className="mt-8 mb-16">
      <h2 className="text-3xl font-bold text-center mb-8">Plan Your Route</h2>
      <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
        Drag destinations from the available list to create your custom travel route. 
        Reorder them to plan your perfect journey through Sri Lanka, and adjust the number of days at each destination.
      </p>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Destinations */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Available Destinations
            </h3>
            <Card className="shadow-md border-0">
              <CardContent className="p-4">
                <Droppable droppableId="available-destinations">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="min-h-[300px]"
                    >
                      {availableDestinations.map((destination, index) => (
                        <Draggable
                          key={destination.id}
                          draggableId={`available-${destination.id}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-3 mb-3 bg-white rounded-lg border flex items-center shadow-sm transition-all ${
                                snapshot.isDragging ? 'shadow-md border-primary/50' : 'border-gray-100'
                              }`}
                            >
                              <div className="w-12 h-12 rounded-md overflow-hidden mr-4 flex-shrink-0">
                                <img 
                                  src={destination.imageUrl} 
                                  alt={destination.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <h4 className="font-medium">{destination.name}</h4>
                                <p className="text-sm text-gray-500 line-clamp-1">{destination.description}</p>
                              </div>
                              <div className="ml-2 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M5 3a2 2 0 0 0-2 2m0 0v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Z"></path>
                                  <path d="M12 8v8m-4-4h8"></path>
                                </svg>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {availableDestinations.length === 0 && (
                        <div className="flex items-center justify-center h-[250px] text-gray-500">
                          No destinations available
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          </div>
          
          {/* Selected Destinations */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                Your Route
                <Badge variant="outline" className="ml-3 px-2 py-0 text-xs">
                  {totalDays} days
                </Badge>
              </h3>
              {selectedDestinations.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetPlanner}
                  className="text-xs"
                >
                  Reset
                </Button>
              )}
            </div>
            
            <Card className="shadow-md border-0">
              <CardContent className="p-4">
                <Droppable droppableId="selected-destinations">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="min-h-[300px]"
                    >
                      {selectedDestinations.map((destination, index) => (
                        <Draggable
                          key={destination.id}
                          draggableId={`selected-${destination.id}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`p-3 mb-3 rounded-lg border ${
                                snapshot.isDragging
                                  ? 'bg-primary/5 border-primary/30 shadow-md'
                                  : 'bg-white border-gray-100'
                              }`}
                            >
                              <div className="flex items-center">
                                <div
                                  {...provided.dragHandleProps}
                                  className="mr-3 cursor-grab text-gray-400 hover:text-gray-600"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 6a2 2 0 0 0-2-2 2 2 0 0 0-2 2m0 0v12m0 0a2 2 0 0 0 2 2 2 2 0 0 0 2-2m-8-2h8"></path>
                                  </svg>
                                </div>
                                <div className="w-10 h-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
                                  <img 
                                    src={destination.imageUrl} 
                                    alt={destination.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-grow">
                                  <h4 className="font-medium">{destination.name}</h4>
                                  <div className="text-xs text-gray-500">Day {index === 0 ? 1 : selectedDestinations.slice(0, index).reduce((sum, d) => sum + (d.days || 0), 1)}</div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <button 
                                    className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                                    onClick={() => updateDays(index, (destination.days || 0) - 1)}
                                    disabled={(destination.days || 0) <= 1}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M5 12h14"></path>
                                    </svg>
                                  </button>
                                  <span className="w-8 text-center font-medium text-sm">{destination.days}</span>
                                  <button 
                                    className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                                    onClick={() => updateDays(index, (destination.days || 0) + 1)}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M12 5v14M5 12h14"></path>
                                    </svg>
                                  </button>
                                  <button 
                                    className="ml-2 text-red-500 hover:text-red-700"
                                    onClick={() => removeDestination(index)}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M3 6h18"></path>
                                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {selectedDestinations.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-[250px] text-gray-500 text-center p-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-4"></path>
                            <path d="m17 2-5 5-5-5"></path>
                            <path d="M12 7v8"></path>
                          </svg>
                          <p className="mb-1">Drag destinations here to build your route</p>
                          <p className="text-xs">You can reorder them and adjust the number of days at each place</p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
            
            {selectedDestinations.length > 0 && (
              <div className="mt-4">
                <Button className="w-full">
                  Request This Customized Route
                </Button>
                <p className="text-xs text-center mt-2 text-gray-500">
                  Our travel experts will help you refine and book this itinerary
                </p>
              </div>
            )}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default TravelRoutePlanner;