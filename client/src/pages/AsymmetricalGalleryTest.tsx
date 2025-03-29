import { AsymmetricalGallery } from '@/components/AsymmetricalGallery';
import { Link } from 'wouter';

export default function AsymmetricalGalleryTest() {
  // Sample gallery images with different Cloudinary transformations
  const galleryImages = [
    {
      // Large featured image
      url: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256371/sigiriya-rock-fortress_lvgxjv.jpg",
      alt: "Sigiriya Rock Fortress",
      caption: "The ancient rock fortress rising majestically from the jungle",
      // Cloudinary transformations
      small: "https://res.cloudinary.com/drsjp6bqz/image/upload/c_fill,h_400,w_600/v1743256371/sigiriya-rock-fortress_lvgxjv.jpg",
      medium: "https://res.cloudinary.com/drsjp6bqz/image/upload/c_fill,h_800,w_1200/v1743256371/sigiriya-rock-fortress_lvgxjv.jpg",
      large: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256371/sigiriya-rock-fortress_lvgxjv.jpg"
    },
    {
      // First stacked image
      url: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256026/dambulla-cave-temples_xpkz40.jpg",
      alt: "Dambulla Cave Temples",
      caption: "Sacred Buddhist cave temples with ancient murals",
      small: "https://res.cloudinary.com/drsjp6bqz/image/upload/c_fill,h_400,w_600/v1743256026/dambulla-cave-temples_xpkz40.jpg",
      medium: "https://res.cloudinary.com/drsjp6bqz/image/upload/c_fill,h_800,w_1200/v1743256026/dambulla-cave-temples_xpkz40.jpg",
      large: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256026/dambulla-cave-temples_xpkz40.jpg"
    },
    {
      // Second stacked image
      url: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743255113/colombo-arrival_nfnyz0.jpg",
      alt: "Colombo Arrival",
      caption: "Modern skyscrapers in Colombo's business district",
      small: "https://res.cloudinary.com/drsjp6bqz/image/upload/c_fill,h_400,w_600/v1743255113/colombo-arrival_nfnyz0.jpg",
      medium: "https://res.cloudinary.com/drsjp6bqz/image/upload/c_fill,h_800,w_1200/v1743255113/colombo-arrival_nfnyz0.jpg",
      large: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743255113/colombo-arrival_nfnyz0.jpg"
    },
    {
      // Bottom left image
      url: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743212891/galle-fort_kqntzk.jpg",
      alt: "Galle Fort",
      caption: "Colonial architecture within the historic fort walls",
      small: "https://res.cloudinary.com/drsjp6bqz/image/upload/c_fill,h_400,w_600/v1743212891/galle-fort_kqntzk.jpg",
      medium: "https://res.cloudinary.com/drsjp6bqz/image/upload/c_fill,h_800,w_1200/v1743212891/galle-fort_kqntzk.jpg",
      large: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743212891/galle-fort_kqntzk.jpg"
    },
    {
      // Bottom right image
      url: "https://res.cloudinary.com/drsjp6bqz/image/upload/attached_assets/mirissa_7.jpg",
      alt: "Mirissa Beach",
      caption: "Paradise beach with palm trees and clear blue water",
      small: "https://res.cloudinary.com/drsjp6bqz/image/upload/c_fill,h_400,w_600/attached_assets/mirissa_7.jpg",
      medium: "https://res.cloudinary.com/drsjp6bqz/image/upload/c_fill,h_800,w_1200/attached_assets/mirissa_7.jpg",
      large: "https://res.cloudinary.com/drsjp6bqz/image/upload/attached_assets/mirissa_7.jpg"
    },
  ];

  return (
    <main className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81]">
            Asymmetrical Gallery Demo
          </h1>
          <div className="space-x-4">
            <Link href="/gallery-test" className="text-blue-600 hover:underline">
              View Masonry Gallery
            </Link>
            <Link href="/" className="text-blue-600 hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
        
        <p className="mb-8 text-gray-600 max-w-2xl">
          This demo showcases an asymmetrical gallery layout with a featured large image and smaller supporting images.
          The layout is inspired by modern travel websites and features responsive design, lightbox functionality,
          and optimized images through Cloudinary transformations.
        </p>
        
        <div className="mb-10 bg-gray-50 rounded-lg overflow-hidden">
          <div className="p-6 pb-0">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81] mb-6">
              Featured Destinations
            </h2>
          </div>
          
          {/* Asymmetrical Gallery Component */}
          <AsymmetricalGallery 
            images={galleryImages}
            className="p-6"
          />
          
          <div className="p-6 pt-0 text-sm text-gray-500">
            <p className="font-medium text-base text-gray-700 mb-2">Gallery Features:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Asymmetrical layout with featured image</li>
              <li>Responsive design that works on mobile and desktop</li>
              <li>Image hover effects with caption overlay</li>
              <li>Lightbox with touch and keyboard navigation</li>
              <li>Optimized image loading using Cloudinary transformations</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}