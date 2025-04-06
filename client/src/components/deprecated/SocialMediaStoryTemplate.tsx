import React, { forwardRef } from 'react';
import { MapPin } from 'lucide-react';
import type { ColorPalette } from '@/components/ColorPaletteGenerator';
import BSLLogo from '@/components/BSLLogo';

type StoryFormat = 'instagram' | 'facebook' | 'tiktok';

interface SocialMediaStoryTemplateProps {
  tourName: string;
  location: string;
  highlightText: string;
  imageUrl: string;
  format: StoryFormat;
  palette: ColorPalette;
}

// Dimensions for each format in pixels
const DIMENSIONS = {
  instagram: { width: 1080, height: 1920 }, // 9:16
  facebook: { width: 1080, height: 1920 }, // 9:16
  tiktok: { width: 1080, height: 1920 }, // 9:16
};

// Scale factor to make the templates fit nicely in the dialog
const SCALE_FACTOR = 0.25;

const SocialMediaStoryTemplate = forwardRef<HTMLDivElement, SocialMediaStoryTemplateProps>(
  ({ tourName, location, highlightText, imageUrl, format, palette }, ref) => {
    const dimensions = DIMENSIONS[format];
    
    // Calculate scaled dimensions for preview
    const scaledWidth = dimensions.width * SCALE_FACTOR;
    const scaledHeight = dimensions.height * SCALE_FACTOR;
    
    // Helper function to create linear gradient with palette colors
    const getGradient = () => {
      const primaryRgb = palette.primary.rgb;
      const accentRgb = palette.accent.rgb;
      return `linear-gradient(to bottom, ${primaryRgb}aa, ${accentRgb}dd)`;
    };
    
    // Styling based on the format
    const getLogoStyles = () => {
      switch (format) {
        case 'instagram':
        case 'facebook':
          return {
            top: '5%',
            left: '5%',
            width: '30%',
          };
        case 'tiktok':
          return {
            top: '3%',
            left: '5%',
            width: '25%',
          };
      }
    };
    
    return (
      <div 
        ref={ref}
        className="relative mx-auto overflow-hidden shadow-xl"
        style={{
          width: scaledWidth,
          height: scaledHeight,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Full scale container for export (hidden in preview but captured by html2canvas) */}
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            width: dimensions.width,
            height: dimensions.height,
            transform: `scale(${SCALE_FACTOR})`,
            transformOrigin: 'top left',
          }}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: dimensions.width,
              height: dimensions.height,
            }}
          />
          
          {/* Overlay Gradient */}
          <div 
            className="absolute inset-0"
            style={{
              background: getGradient(),
              width: dimensions.width,
              height: dimensions.height,
            }}
          />
          
          {/* Logo at top */}
          <div 
            className="absolute"
            style={{
              ...getLogoStyles(),
            }}
          >
            <BSLLogo 
              color="white" 
              fontSize="48px" 
              letterSpacing="0.15em"
            />
          </div>
          
          {/* Location Tag */}
          <div 
            className="absolute flex items-center"
            style={{
              top: '15%',
              left: '5%',
              color: 'white',
              fontSize: '36px',
            }}
          >
            <MapPin style={{ width: '36px', height: '36px', marginRight: '10px' }} />
            <span style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              {location}
            </span>
          </div>
          
          {/* Tour Name & Highlight */}
          <div 
            className="absolute bottom-0 left-0 w-full p-12"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              padding: '80px 60px',
              boxSizing: 'border-box',
            }}
          >
            <h2 
              style={{
                color: 'white',
                fontSize: '64px',
                fontWeight: 'bold',
                marginBottom: '20px',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              {tourName}
            </h2>
            
            <p 
              style={{
                color: 'white',
                fontSize: '42px',
                lineHeight: 1.4,
                marginBottom: '30px',
                textShadow: '0 1px 3px rgba(0,0,0,0.5)',
              }}
            >
              {highlightText}
            </p>
            
            <div 
              style={{
                color: 'white',
                fontSize: '36px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textShadow: '0 1px 3px rgba(0,0,0,0.5)',
              }}
            >
              www.bestsrilankatours.com
            </div>
          </div>
        </div>
      </div>
    );
  }
);

SocialMediaStoryTemplate.displayName = 'SocialMediaStoryTemplate';

export default SocialMediaStoryTemplate;