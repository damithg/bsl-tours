import { Link } from "wouter";
import { MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with background */}
      <div className="relative pt-28 pb-20 bg-primary">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1593693411515-c20261bcad6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            alt="Sri Lanka Map" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-white mb-6">
              404 - Page Not Found
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              We can't seem to find the page you're looking for
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="bg-white p-8 shadow-lg rounded-lg max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-12 w-12 text-primary" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              It seems you've ventured off the beaten path
            </h2>
            
            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved. 
              Let us guide you back to discover the beauty of Sri Lanka.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors w-full sm:w-auto">
                  Return Home
                </button>
              </Link>
              
              <Link to="/destinations">
                <button className="bg-transparent border border-primary text-primary px-6 py-3 rounded-md hover:bg-primary/5 transition-colors w-full sm:w-auto">
                  Explore Destinations
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
