import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showRatingValue?: boolean;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 'md',
  showRatingValue = false,
  className = '',
}) => {
  // Calculate the number of full stars, half stars, and empty stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  // Determine star size based on prop
  const starSize = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }[size];
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex">
        {/* Render full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star 
            key={`star-${i}`} 
            className={`${starSize} text-yellow-400 fill-yellow-400`} 
          />
        ))}
        
        {/* Render half star if needed */}
        {hasHalfStar && (
          <StarHalf 
            className={`${starSize} text-yellow-400 fill-yellow-400`} 
          />
        )}
        
        {/* Render empty stars */}
        {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }).map((_, i) => (
          <Star 
            key={`empty-star-${i}`} 
            className={`${starSize} text-yellow-400`} 
          />
        ))}
      </div>
      
      {/* Optionally show the rating value */}
      {showRatingValue && (
        <span className="ml-2 text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
      )}
    </div>
  );
};