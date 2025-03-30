import { AsymmetricalGallery } from '@/components/AsymmetricalGallery';
import { Link } from 'wouter';

export default function ApiGalleryTest() {
  // This mock data matches the exact format from the API
  const galleryImages = [
    {
      "publicId": "activities/sigiriya-main-view",
      "alt": "Sigiriya Rock Fortress - Main View",
      "caption": "The iconic rock fortress rising above the plains",
      "orientation": "landscape",
      "baseUrl": "https://res.cloudinary.com/drsjp6bqz/image/upload/activities/sigiriya-main-view.jpg",
      "small": "https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/activities/sigiriya-main-view.jpg",
      "medium": "https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_600,c_fill/activities/sigiriya-main-view.jpg",
      "large": "https://res.cloudinary.com/drsjp6bqz/image/upload/w_1600,h_900,c_fill/activities/sigiriya-main-view.jpg"
    },
    {
      "publicId": "activities/sigiriya-frescoes",
      "alt": "Sigiriya Rock Fortress - Ancient Frescoes",
      "caption": "Beautiful ancient frescoes adorning the inner rock walls",
      "orientation": "portrait",
      "baseUrl": "https://res.cloudinary.com/drsjp6bqz/image/upload/activities/sigiriya-frescoes.jpg",
      "small": "https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/activities/sigiriya-frescoes.jpg",
      "medium": "https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_600,c_fill/activities/sigiriya-frescoes.jpg",
      "large": "https://res.cloudinary.com/drsjp6bqz/image/upload/w_1600,h_900,c_fill/activities/sigiriya-frescoes.jpg"
    },
    {
      "publicId": "activities/sigiriya-water-gardens-1",
      "alt": "Sigiriya Rock Fortress - Water Gardens",
      "caption": "Symmetrical water gardens at the base of the fortress",
      "orientation": "landscape",
      "baseUrl": "https://res.cloudinary.com/drsjp6bqz/image/upload/activities/sigiriya-water-gardens-1.jpg",
      "small": "https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/activities/sigiriya-water-gardens-1.jpg",
      "medium": "https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_600,c_fill/activities/sigiriya-water-gardens-1.jpg",
      "large": "https://res.cloudinary.com/drsjp6bqz/image/upload/w_1600,h_900,c_fill/activities/sigiriya-water-gardens-1.jpg"
    },
    {
      "publicId": "activities/sigiriya-water-gardens-2",
      "alt": "Sigiriya Rock Fortress - Water Gardens",
      "caption": "An ancient hydraulic engineering marvel",
      "orientation": "landscape",
      "baseUrl": "https://res.cloudinary.com/drsjp6bqz/image/upload/activities/sigiriya-water-gardens-2.jpg",
      "small": "https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/activities/sigiriya-water-gardens-2.jpg",
      "medium": "https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_600,c_fill/activities/sigiriya-water-gardens-2.jpg",
      "large": "https://res.cloudinary.com/drsjp6bqz/image/upload/w_1600,h_900,c_fill/activities/sigiriya-water-gardens-2.jpg"
    },
    {
      "publicId": "activities/sigiriya-summit-view",
      "alt": "Sigiriya Rock Fortress - Summit View",
      "caption": "Breathtaking panoramic views from the summit",
      "orientation": "landscape",
      "baseUrl": "https://res.cloudinary.com/drsjp6bqz/image/upload/activities/sigiriya-summit-view.jpg",
      "small": "https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/activities/sigiriya-summit-view.jpg",
      "medium": "https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_600,c_fill/activities/sigiriya-summit-view.jpg",
      "large": "https://res.cloudinary.com/drsjp6bqz/image/upload/w_1600,h_900,c_fill/activities/sigiriya-summit-view.jpg"
    }
  ];

  return (
    <main className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81]">
            API Gallery Test
          </h1>
          <div className="space-x-4">
            <Link href="/asymmetrical-gallery" className="text-blue-600 hover:underline">
              View Basic Gallery
            </Link>
            <Link href="/" className="text-blue-600 hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
        
        <p className="mb-8 text-gray-600 max-w-2xl">
          This demo displays a gallery using the exact data structure provided by the API.
          The gallery uses the API's optimized Cloudinary image URLs with proper transformations for each display context.
        </p>
        
        <div className="mb-10 bg-gray-50 rounded-lg overflow-hidden">
          <div className="p-6 pb-0">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81] mb-6">
              Sigiriya Rock Fortress Gallery
            </h2>
          </div>
          
          {/* Asymmetrical Gallery Component with API data format */}
          <AsymmetricalGallery 
            images={galleryImages}
            className="p-6"
          />
          
          <div className="p-6 pt-0 text-sm text-gray-500">
            <p className="font-medium text-base text-gray-700 mb-2">This gallery supports:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Direct API data format integration</li>
              <li>Multiple Cloudinary transformation sizes</li>
              <li>Fallback options for missing image URLs</li>
              <li>Asymmetrical layout for visual interest</li>
              <li>Responsive design for all device sizes</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}