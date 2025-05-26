import React from "react";
import Breadcrumb, { BreadcrumbItem } from "./Breadcrumb";

interface HeroSectionProps {
  title: string;
  description?: string;
  backgroundImage: string;
  breadcrumbItems: BreadcrumbItem[];
  children?: React.ReactNode;
  overlayColor?: string; // Optional overlay color (default to primary)
  overlayOpacity?: number; // Optional overlay opacity (0-100 scale, default 20)
  customOverlay?: string; // Optional custom overlay class for gradients etc.
  imageTransform?: string; // Optional image transform class (e.g., scale-105)
  showDivider?: boolean; // Optional flag to show/hide the divider (default false)
}

const HeroSection = ({
  title,
  description,
  backgroundImage,
  breadcrumbItems,
  children,
  overlayColor = "bg-primary",
  overlayOpacity = 20, // 0-100 scale (will be divided by 100)
  customOverlay,
  imageTransform,
  showDivider = false,
}: HeroSectionProps) => {
  return (
    <section className={`relative pt-24 pb-20 ${overlayColor} overflow-hidden`}>
      {/* Background image with opacity - positioned below header */}
      {customOverlay ? (
        <>
          <div className="absolute inset-0 z-0">
            <img 
              src={backgroundImage} 
              alt={title} 
              className={`w-full h-full object-cover object-center ${imageTransform || ''}`} 
            />
          </div>
          <div className={`absolute inset-0 z-0 ${customOverlay}`}></div>
        </>
      ) : (
        <div className="absolute inset-0 z-0" style={{ opacity: 0.8 }}>
          <img 
            src={backgroundImage} 
            alt={title} 
            className={`w-full h-full object-cover object-center ${imageTransform || ''}`} 
          />
        </div>
      )}
      
      {/* Enhanced dark overlay for better text readability */}
      <div className={`absolute inset-0 z-0 ${overlayColor}/[.${overlayOpacity}]`}></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
      
      {/* Optional decorative elements */}
      <div className="absolute -bottom-6 -right-6 w-56 h-56 bg-secondary/20 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-10 -left-10 w-40 h-40 bg-secondary/30 rounded-full blur-3xl opacity-20"></div>
      
      {/* Breadcrumb Navigation - moved up */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-1">
        <Breadcrumb 
          items={breadcrumbItems} 
          className="mb-8" 
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-8">
        
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-none drop-shadow-2xl text-shadow-lg md:whitespace-nowrap bg-black/20 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/10">
            {title}
          </h1>
          {showDivider && <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>}
          {description && (
            <p className={`text-xl md:text-2xl text-white font-medium max-w-2xl mx-auto font-['Raleway'] ${!showDivider && description ? 'mt-4' : ''} mb-4 drop-shadow-2xl text-shadow bg-black/15 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/10`}>
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;