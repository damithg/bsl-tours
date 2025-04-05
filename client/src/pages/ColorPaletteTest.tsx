import { useState } from 'react';
import { Link } from 'wouter';
import { ColorPaletteGenerator, ColorPalette } from '@/components/ColorPaletteGenerator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Palette } from 'lucide-react';

export default function ColorPaletteTest() {
  const [generatedPalette, setGeneratedPalette] = useState<ColorPalette | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
  
  // Example images from Sri Lanka destinations for testing
  const sampleImages = [
    '/attached_assets/A%20Week%20in%20the%20Tropics.jpg',
    '/attached_assets/mirissa%20(7).jpg',
    '/attached_assets/mirissa%20(8).jpg',
    '/attached_assets/romantic%20honeymoon%20escape.jpg',
    '/attached_assets/yves-alarie-3R50kTNBKiE-unsplash.jpg'
  ];

  const handlePaletteGenerated = (palette: ColorPalette) => {
    console.log('Palette generated:', palette);
    setGeneratedPalette(palette);
  };

  const handleSelectImage = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold flex items-center">
            <Palette className="mr-2 h-6 w-6" />
            Color Palette Generator
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          <ColorPaletteGenerator 
            imageUrl={selectedImageUrl}
            onPaletteGenerated={handlePaletteGenerated}
            title="Generate a Destination-Inspired Color Palette"
          />
        </div>
        
        <div className="md:col-span-4 space-y-6">
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Sample Images</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Select one of these images to generate a color palette inspired by Sri Lankan destinations.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {sampleImages.map((image, index) => (
                <div 
                  key={index}
                  className={`
                    aspect-video rounded-md overflow-hidden cursor-pointer border-2 transition-all
                    ${selectedImageUrl === image ? 'border-primary ring-2 ring-primary/30' : 'border-transparent hover:border-border'}
                  `}
                  onClick={() => handleSelectImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`Sample image ${index + 1}`} 
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {generatedPalette && (
            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Current Palette</h2>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(generatedPalette)
                  .filter(([key]) => ['primary', 'secondary', 'accent', 'background'].includes(key))
                  .map(([key, color]) => (
                    <div key={key} className="flex flex-col items-center">
                      <div 
                        className="w-full aspect-square rounded-md mb-1"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-xs capitalize">{key}</span>
                    </div>
                  ))
                }
              </div>
              
              <div className="mt-4 p-4 rounded-md" style={{ backgroundColor: generatedPalette.background.hex }}>
                <h3 className="text-base font-medium mb-2" style={{ color: generatedPalette.text.hex }}>
                  Theme Preview
                </h3>
                <div className="flex gap-2">
                  <button 
                    className="px-3 py-1 rounded-md text-white text-sm"
                    style={{ backgroundColor: generatedPalette.primary.hex }}
                  >
                    Primary
                  </button>
                  <button 
                    className="px-3 py-1 rounded-md text-white text-sm"
                    style={{ backgroundColor: generatedPalette.secondary.hex }}
                  >
                    Secondary
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}