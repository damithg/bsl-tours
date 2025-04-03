import React from 'react';

// Sample tour data from the provided JSON
const tourData = {
  "id": 8,
  "name": "Scenic Wonders of Sri Lanka",
  "slug": "scenic-wonders-of-sri-lanka",
  "featured": true,
  "summary": "A 10-day adventure through Sri Lanka's stunning mountains, coastlines, and cultural sites.",
  "duration": "10 days",
  "startingFrom": 1450,
  "currency": "USD",
  "heroImage": {
    "publicId": "destinations/galle-ramparts",
    "alt": "Scenic landscape in Sri Lanka",
    "caption": "Explore Sri Lanka's diverse terrain",
    "orientation": "landscape",
    "baseUrl": "https://res.cloudinary.com/drsjp6bqz/image/upload/destinations/galle-ramparts.jpg",
    "small": "https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/destinations/galle-ramparts.jpg",
    "medium": "https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_600,c_fill/destinations/galle-ramparts.jpg",
    "large": "https://res.cloudinary.com/drsjp6bqz/image/upload/w_1600,h_900,c_fill/destinations/galle-ramparts.jpg"
  },
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Colombo",
      "description": "Meet and greet at the airport. Transfer to your hotel for a restful night.",
      "image": {
        "publicId": "tet",
        "alt": "ttt",
        "caption": "ttt",
        "baseUrl": "https://res.cloudinary.com/drsjp6bqz/image/upload/tet.jpg",
        "small": "https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/tet.jpg",
        "medium": "https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_600,c_fill/tet.jpg",
        "large": "https://res.cloudinary.com/drsjp6bqz/image/upload/w_1600,h_900,c_fill/tet.jpg"
      }
    },
    {
      "day": 2,
      "title": "Colombo to Kandy",
      "description": "Explore the Temple of the Tooth and enjoy a cultural performance."
    }
  ],
  "inclusions": [
    "Accommodation with breakfast",
    "Private vehicle with driver",
    "Entry fees to mentioned sites"
  ],
  "exclusions": [
    "International airfare",
    "Lunch and dinner",
    "Personal expenses"
  ]
};

const TestTourPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{tourData.name}</h1>
      
      {/* Hero Image */}
      <div className="mb-8 rounded-lg overflow-hidden">
        {tourData.heroImage && (
          <img 
            src={tourData.heroImage.medium || tourData.heroImage.baseUrl} 
            alt={tourData.heroImage.alt || tourData.name}
            className="w-full h-auto"
          />
        )}
      </div>
      
      {/* Tour Summary */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex justify-between mb-4">
          <div>
            <span className="text-gray-600 block">Duration:</span>
            <span className="font-semibold">{tourData.duration}</span>
          </div>
          <div>
            <span className="text-gray-600 block">Starting From:</span>
            <span className="font-semibold">{tourData.currency} {tourData.startingFrom}</span>
          </div>
        </div>
        <p className="text-gray-700">{tourData.summary}</p>
      </div>
      
      {/* Itinerary */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Tour Itinerary</h2>
        {tourData.itinerary.map((day) => (
          <div key={day.day} className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h3 className="text-xl font-semibold mb-2">Day {day.day}: {day.title}</h3>
            <p className="text-gray-700 mb-4">{day.description}</p>
            {day.image && (
              <img 
                src={day.image.medium || day.image.baseUrl} 
                alt={day.image.alt || day.title}
                className="w-full h-auto rounded"
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Inclusions */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">What's Included</h2>
        <ul className="list-disc pl-6">
          {tourData.inclusions.map((item, index) => (
            <li key={index} className="mb-1 text-gray-700">{item}</li>
          ))}
        </ul>
      </div>
      
      {/* Exclusions */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">What's Not Included</h2>
        <ul className="list-disc pl-6">
          {tourData.exclusions.map((item, index) => (
            <li key={index} className="mb-1 text-gray-700">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestTourPage;