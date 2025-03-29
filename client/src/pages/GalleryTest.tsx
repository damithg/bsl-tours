import { useState } from 'react';
import { ResponsivePhotoGallery } from '@/components/ResponsivePhotoGallery';
import { Link } from 'wouter';

export default function GalleryTest() {
  // Demo gallery images using existing assets
  const galleryImages = [
    {
      url: "/attached_assets/A Week in the Tropics.jpg",
      alt: "Tropical View",
      small: "/attached_assets/A Week in the Tropics.jpg",
      medium: "/attached_assets/A Week in the Tropics.jpg",
      banner: "/attached_assets/A Week in the Tropics.jpg"
    },
    {
      url: "/attached_assets/mirissa (7).jpg",
      alt: "Mirissa Beach View",
      small: "/attached_assets/mirissa (7).jpg",
      medium: "/attached_assets/mirissa (7).jpg",
      banner: "/attached_assets/mirissa (7).jpg"
    },
    {
      url: "/attached_assets/mirissa (8).jpg",
      alt: "Ocean View",
      small: "/attached_assets/mirissa (8).jpg",
      medium: "/attached_assets/mirissa (8).jpg",
      banner: "/attached_assets/mirissa (8).jpg"
    },
    {
      url: "/attached_assets/romantic honeymoon escape.jpg",
      alt: "Romantic Setting",
      small: "/attached_assets/romantic honeymoon escape.jpg",
      medium: "/attached_assets/romantic honeymoon escape.jpg",
      banner: "/attached_assets/romantic honeymoon escape.jpg"
    },
    {
      url: "/attached_assets/yves-alarie-3R50kTNBKiE-unsplash.jpg",
      alt: "Beach Panorama",
      small: "/attached_assets/yves-alarie-3R50kTNBKiE-unsplash.jpg",
      medium: "/attached_assets/yves-alarie-3R50kTNBKiE-unsplash.jpg",
      banner: "/attached_assets/yves-alarie-3R50kTNBKiE-unsplash.jpg"
    },
    {
      url: "/attached_assets/A Week in the Tropics.jpg",
      alt: "Tropical Scene",
      small: "/attached_assets/A Week in the Tropics.jpg",
      medium: "/attached_assets/A Week in the Tropics.jpg",
      banner: "/attached_assets/A Week in the Tropics.jpg"
    },
    {
      url: "/attached_assets/romantic honeymoon escape.jpg",
      alt: "Sunset View",
      small: "/attached_assets/romantic honeymoon escape.jpg",
      medium: "/attached_assets/romantic honeymoon escape.jpg",
      banner: "/attached_assets/romantic honeymoon escape.jpg"
    },
    {
      url: "/attached_assets/mirissa (8).jpg",
      alt: "Coastal View",
      small: "/attached_assets/mirissa (8).jpg",
      medium: "/attached_assets/mirissa (8).jpg",
      banner: "/attached_assets/mirissa (8).jpg"
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