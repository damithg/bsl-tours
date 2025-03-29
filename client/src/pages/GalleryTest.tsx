import { useState } from 'react';
import { ResponsivePhotoGallery } from '@/components/ResponsivePhotoGallery';
import { Link } from 'wouter';

export default function GalleryTest() {
  // Demo gallery images using Cloudinary hosted images
  const galleryImages = [
    {
      url: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256371/sigiriya-rock-fortress_lvgxjv.jpg",
      alt: "Sigiriya Rock Fortress",
      small: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256371/sigiriya-rock-fortress_lvgxjv.jpg",
      medium: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256371/sigiriya-rock-fortress_lvgxjv.jpg",
      banner: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256371/sigiriya-rock-fortress_lvgxjv.jpg"
    },
    {
      url: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256026/dambulla-cave-temples_xpkz40.jpg",
      alt: "Dambulla Cave Temples",
      small: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256026/dambulla-cave-temples_xpkz40.jpg",
      medium: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256026/dambulla-cave-temples_xpkz40.jpg",
      banner: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256026/dambulla-cave-temples_xpkz40.jpg"
    },
    {
      url: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743255113/colombo-arrival_nfnyz0.jpg",
      alt: "Colombo Arrival",
      small: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743255113/colombo-arrival_nfnyz0.jpg",
      medium: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743255113/colombo-arrival_nfnyz0.jpg",
      banner: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743255113/colombo-arrival_nfnyz0.jpg"
    },
    {
      url: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743212891/galle-fort_kqntzk.jpg",
      alt: "Galle Fort",
      small: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743212891/galle-fort_kqntzk.jpg",
      medium: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743212891/galle-fort_kqntzk.jpg",
      banner: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743212891/galle-fort_kqntzk.jpg"
    },
    {
      url: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743211672/sample.jpg",
      alt: "Sri Lanka Sample Image",
      small: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743211672/sample.jpg",
      medium: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743211672/sample.jpg",
      banner: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743211672/sample.jpg"
    },
    // Repeat some images to have enough for gallery demonstration
    {
      url: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256371/sigiriya-rock-fortress_lvgxjv.jpg",
      alt: "Sigiriya Rock Fortress",
      small: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256371/sigiriya-rock-fortress_lvgxjv.jpg",
      medium: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256371/sigiriya-rock-fortress_lvgxjv.jpg",
      banner: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256371/sigiriya-rock-fortress_lvgxjv.jpg"
    },
    {
      url: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743212891/galle-fort_kqntzk.jpg",
      alt: "Galle Fort",
      small: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743212891/galle-fort_kqntzk.jpg",
      medium: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743212891/galle-fort_kqntzk.jpg",
      banner: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743212891/galle-fort_kqntzk.jpg"
    },
    {
      url: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743255113/colombo-arrival_nfnyz0.jpg",
      alt: "Colombo Arrival",
      small: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743255113/colombo-arrival_nfnyz0.jpg",
      medium: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743255113/colombo-arrival_nfnyz0.jpg",
      banner: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743255113/colombo-arrival_nfnyz0.jpg"
    }
  ];

  return (
    <main className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81]">
            Responsive Photo Gallery Demo
          </h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
        
        <p className="mb-8 text-gray-600">
          This is a demonstration of the responsive photo gallery component with mobile-friendly features including lightbox and touch navigation.
        </p>
        
        <div className="mb-10 p-6 bg-gray-50 rounded-lg">
          <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81] mb-6">
            Photo Gallery
          </h2>
          
          {/* Responsive Gallery Component */}
          <ResponsivePhotoGallery 
            images={galleryImages}
            className="mb-6"
          />
          
          <div className="mt-8 text-sm text-gray-500">
            <p>Features:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Responsive masonry-style grid layout</li>
              <li>Optimized for both desktop and mobile viewing</li>
              <li>Lightbox view with touch swipe support</li>
              <li>Keyboard navigation (arrow keys + escape)</li>
              <li>Image size optimization</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}