import React from 'react';
import { MapPin, Calendar, Hotel, Camera, Coffee, Utensils } from 'lucide-react';

// For use with the itinerary component
interface TourImage {
  publicId?: string;
  alt?: string;
  caption?: string;
  orientation?: string;
  baseUrl?: string;
  small?: string;
  medium?: string;
  large?: string;
}

interface ItineraryDayProps {
  day: number;
  title: string;
  description: string;
  image?: TourImage;
  isActive: boolean;
  accommodation?: string;
  activities?: Array<{
    title: string;
    description?: string;
    time?: string;
    imageUrl?: string;
  }>;
  meals?: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
}

export const EnhancedItineraryItem: React.FC<ItineraryDayProps> = ({
  day,
  title,
  description,
  image,
  isActive,
  accommodation = "Luxury Hotel",
  activities = [],
  meals = { breakfast: true, lunch: true, dinner: true }
}) => {
  if (!isActive) return null;
  
  // Extract locations from the description
  const extractedLocations = description.match(/([A-Z][a-z]+ ?(?:[A-Z][a-z]+)?)(?: National Park| Temple| Fort| Beach| Museum| Gardens| Estate| Lake| Rock| Peak| Falls| Ancient City| Village)/g) || [];
  
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden mb-8 transform transition-all duration-300">
      {/* Day Header */}
      <div className="bg-[#0F4C81] text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Calendar className="w-5 h-5 mr-3" />
          <h3 className="text-xl font-bold">Day {day}: {title}</h3>
        </div>
        <div className="flex items-center space-x-3">
          {meals.breakfast && <Coffee className="w-4 h-4 text-white/80" aria-label="Breakfast included" />}
          {meals.lunch && <Utensils className="w-4 h-4 text-white/80" aria-label="Lunch included" />}
          {meals.dinner && <Utensils className="w-4 h-4 text-white/80" aria-label="Dinner included" />}
        </div>
      </div>
      
      <div className="p-5">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: Description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="prose prose-lg max-w-none text-gray-700">
              {description.split('\n').map((paragraph, i) => {
                if (!paragraph.trim()) return <br key={`br-${i}`} />;
                return <p key={`para-${i}`}>{paragraph}</p>;
              })}
            </div>
            
            {/* Locations */}
            {extractedLocations.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center mb-3">
                  <MapPin className="w-4 h-4 mr-2 text-[#0F4C81]" />
                  <span>Key Locations</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {extractedLocations.map((location, i) => (
                    <div key={`location-${i}`} className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[#0F4C81]/10 text-[#0F4C81] border border-[#0F4C81]/20">
                      <MapPin className="w-3 h-3 mr-1" />
                      {location}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Accommodation */}
            <div className="mt-6 flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <Hotel className="w-5 h-5 text-[#0F4C81] mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Accommodation</h4>
                <p className="text-gray-600">{accommodation}</p>
              </div>
            </div>
          </div>
          
          {/* Right column: Image and activities */}
          <div className="lg:col-span-1 space-y-5">
            {/* Main image */}
            {image && (
              <div className="rounded-lg overflow-hidden shadow-md">
                <div className="relative">
                  <img 
                    src={image.medium || image.large || image.small || image.baseUrl} 
                    alt={image.alt || title}
                    className="w-full h-auto object-cover aspect-[3/2]"
                  />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-3 text-sm">
                      {image.caption}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Daily activities */}
            {activities.length > 0 ? (
              <div className="space-y-3">
                <h4 className="font-medium flex items-center text-gray-900">
                  <Camera className="w-4 h-4 mr-2 text-[#0F4C81]" />
                  Daily Activities
                </h4>
                <div className="space-y-2">
                  {activities.map((activity, i) => (
                    <div key={`activity-${i}`} className="p-3 bg-[#F9F7F4] rounded-lg">
                      <div className="flex justify-between">
                        <h5 className="font-medium text-gray-900">{activity.title}</h5>
                        {activity.time && (
                          <span className="text-sm text-gray-500">{activity.time}</span>
                        )}
                      </div>
                      {activity.description && (
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-[#F9F7F4] p-4 rounded-lg border border-[#D4AF37]/20 text-center">
                <p className="text-gray-600 text-sm">
                  Full detailed activities available upon request from our travel consultants.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedItineraryItem;