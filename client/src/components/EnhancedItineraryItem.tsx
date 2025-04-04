import React from 'react';
import { Coffee, UtensilsCrossed, BedDouble } from 'lucide-react';

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

interface Meals {
  breakfast?: boolean;
  lunch?: boolean;
  dinner?: boolean;
}

interface EnhancedItineraryItemProps {
  day: number;
  title: string;
  description: string;
  image?: TourImage;
  isActive?: boolean;
  accommodation?: string;
  meals?: Meals;
}

const EnhancedItineraryItem: React.FC<EnhancedItineraryItemProps> = ({
  day,
  title,
  description,
  image,
  isActive = false,
  accommodation,
  meals = { breakfast: false, lunch: false, dinner: false },
}) => {
  // For image URL, use the first available image size or fallback to baseUrl
  const imageUrl = image?.large || image?.medium || image?.small || image?.baseUrl;

  return (
    <div 
      className={`transition-all duration-300 overflow-hidden ${isActive ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 absolute pointer-events-none'}`}
    >
      <div className="bg-white rounded-lg">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Day content - Left side */}
          <div className="md:w-3/5">
            <h3 className="text-xl font-bold mb-3 text-gray-800 flex items-center">
              <span className="mr-3 flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                {day}
              </span>
              {title}
            </h3>
            
            <div className="prose prose-sm max-w-none text-gray-700 mb-4">
              {/* Convert description to paragraphs based on new lines */}
              {description.split('\n').filter(para => para.trim() !== '').map((paragraph, idx) => (
                <p key={`para-${idx}`}>{paragraph}</p>
              ))}
            </div>
            
            {/* Accommodation and meals section */}
            <div className="mt-4 flex flex-wrap gap-4 items-center">
              {accommodation && (
                <div className="flex items-center bg-gray-100 py-1.5 px-3 rounded-full text-sm">
                  <BedDouble className="w-4 h-4 mr-1.5 text-primary" />
                  <span>{accommodation}</span>
                </div>
              )}
              
              <div className="flex gap-2">
                {meals.breakfast && (
                  <div className="flex items-center bg-blue-50 py-1.5 px-3 rounded-full text-sm" title="Breakfast included">
                    <Coffee className="w-4 h-4 mr-1.5 text-blue-600" />
                    <span>Breakfast</span>
                  </div>
                )}
                
                {meals.lunch && (
                  <div className="flex items-center bg-green-50 py-1.5 px-3 rounded-full text-sm" title="Lunch included">
                    <UtensilsCrossed className="w-4 h-4 mr-1.5 text-green-600" />
                    <span>Lunch</span>
                  </div>
                )}
                
                {meals.dinner && (
                  <div className="flex items-center bg-purple-50 py-1.5 px-3 rounded-full text-sm" title="Dinner included">
                    <UtensilsCrossed className="w-4 h-4 mr-1.5 text-purple-600" />
                    <span>Dinner</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Day image - Right side */}
          {imageUrl && (
            <div className="md:w-2/5">
              <div className="rounded-lg overflow-hidden h-48 md:h-full">
                <img 
                  src={imageUrl} 
                  alt={image?.alt || `Day ${day}: ${title}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedItineraryItem;