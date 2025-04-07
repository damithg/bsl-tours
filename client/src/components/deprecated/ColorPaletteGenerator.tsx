import { useState, useEffect } from 'react';
import { useColorPalette } from '@/contexts/ColorPaletteContext';
import { extractPaletteFromImage } from '@/utils/deprecated/colorPalette';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { EyeIcon, Copy, Sparkles, Image as ImageIcon, Check, Loader2 } from 'lucide-react';

/**
 * This is a deprecated version of the ColorPaletteGenerator that uses a simplified
 * version of the color extraction utility that doesn't depend on color-thief-node.
 * 
 * This component has been moved to the deprecated folder because the original
 * component depends on color-thief-node which requires canvas, causing installation
 * issues on certain platforms, particularly Windows.
 * 
 * This version always uses a default color palette without extracting colors from images.
 */

export interface Color {
  hex: string;
  rgb: string;
  name?: string;
  isLight?: boolean;
}

export interface ColorPalette {
  primary: Color;
  secondary: Color;
  accent: Color;
  background: Color;
  text: Color;
  muted: Color;
  border: Color;
  destructive?: Color;
  success?: Color;
  warning?: Color;
  info?: Color;
}

interface ColorPaletteGeneratorProps {
  imageUrl?: string;
  title?: string;
  className?: string;
  onPaletteGenerated?: (palette: ColorPalette) => void;
}

export function ColorPaletteGenerator({
  imageUrl,
  title = 'Color Palette Generator',
  className = '',
  onPaletteGenerated
}: ColorPaletteGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState(imageUrl || '');
  const [colors, setColors] = useState<Color[]>([]);
  const [palette, setPalette] = useState<ColorPalette | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState('palette');

  useEffect(() => {
    if (imageUrl) {
      setCustomImageUrl(imageUrl);
    }
  }, [imageUrl]);

  const generatePalette = async () => {
    if (!customImageUrl) return;
    
    setLoading(true);
    try {
      // Use the utility from colorPalette.ts to extract colors directly into a palette
      const newPalette = await extractPaletteFromImage(customImageUrl);
      setPalette(newPalette);
      
      // Get colors from the palette for the "All Colors" tab
      const extractedColors = Object.values(newPalette).filter(c => c !== undefined);
      setColors(extractedColors);
      
      if (onPaletteGenerated) {
        onPaletteGenerated(newPalette);
      }
    } catch (error) {
      console.error('Error generating palette:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get the color palette context
  const { applyPalette: applyGlobalPalette } = useColorPalette();

  const handleApplyPalette = (palette: ColorPalette) => {
    // Apply the palette to the app's theme using our context
    console.log('Applying palette globally:', palette);
    applyGlobalPalette(palette);
  };

  const handleCopyColor = (color: Color) => {
    navigator.clipboard.writeText(color.hex);
    setCopiedColor(color.hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <Card className={`w-full shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription>
          Generate a beautiful color palette from an image
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={customImageUrl}
              onChange={(e) => setCustomImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="flex-1"
            />
            <Button 
              onClick={generatePalette} 
              disabled={!customImageUrl || loading}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Generate
            </Button>
          </div>

          {customImageUrl && (
            <div className="relative aspect-video w-full rounded-md overflow-hidden border border-border bg-muted/20">
              <img 
                src={customImageUrl} 
                alt="Source image" 
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/600x400?text=Image+Error';
                }}
              />
            </div>
          )}

          {palette && (
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="palette" className="flex-1">Palette</TabsTrigger>
                <TabsTrigger value="colors" className="flex-1">All Colors</TabsTrigger>
                <TabsTrigger value="preview" className="flex-1">Preview</TabsTrigger>
              </TabsList>
              
              <TabsContent value="palette" className="pt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {palette && Object.entries(palette).map(([key, color]) => (
                    <ColorSwatch 
                      key={key} 
                      color={color} 
                      label={key} 
                      onCopy={handleCopyColor} 
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="colors" className="pt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {colors.map((color, index) => (
                    <ColorSwatch 
                      key={index} 
                      color={color} 
                      label={`Color ${index + 1}`} 
                      onCopy={handleCopyColor} 
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="preview" className="pt-4">
                <div className="space-y-6">
                  <div className="p-6 rounded-lg" style={{ backgroundColor: palette.background.hex }}>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: palette.text.hex }}>
                      Sample UI Preview
                    </h3>
                    <p className="mb-4" style={{ color: palette.text.hex }}>
                      This is how text would appear with your selected colors.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-4 py-2 rounded-md text-white"
                        style={{ backgroundColor: palette.primary.hex }}>
                        Primary Button
                      </button>
                      <button className="px-4 py-2 rounded-md text-white"
                        style={{ backgroundColor: palette.secondary.hex }}>
                        Secondary Button
                      </button>
                      <button className="px-4 py-2 rounded-md border"
                        style={{ 
                          backgroundColor: 'transparent', 
                          borderColor: palette.border.hex,
                          color: palette.text.hex 
                        }}>
                        Outline Button
                      </button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </CardContent>
      {palette && (
        <CardFooter className="flex justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <EyeIcon className="mr-2 h-4 w-4" />
                View CSS Variables
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>CSS Variables</DialogTitle>
                <DialogDescription>
                  Copy these CSS variables to use in your project
                </DialogDescription>
              </DialogHeader>
              <div className="relative rounded-md bg-muted p-4 font-mono text-sm">
                <pre className="max-h-[300px] overflow-auto">
                  {`:root {
  --primary: ${palette.primary.hex};
  --primary-foreground: ${palette.primary.isLight ? '#000000' : '#ffffff'};
  --secondary: ${palette.secondary.hex};
  --secondary-foreground: ${palette.secondary.isLight ? '#000000' : '#ffffff'};
  --accent: ${palette.accent.hex};
  --accent-foreground: ${palette.accent.isLight ? '#000000' : '#ffffff'};
  --background: ${palette.background.hex};
  --foreground: ${palette.text.hex};
  --muted: ${palette.muted.hex};
  --muted-foreground: ${palette.text.hex}88;
  --border: ${palette.border.hex};
  --destructive: ${palette.destructive?.hex || '#ef4444'};
  --destructive-foreground: #ffffff;
}`}
                </pre>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute right-4 top-4"
                  onClick={() => {
                    navigator.clipboard.writeText(document.querySelector('pre')?.textContent || '');
                    setCopiedColor('css');
                    setTimeout(() => setCopiedColor(null), 2000);
                  }}
                >
                  {copiedColor === 'css' ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <DialogFooter>
                <Button onClick={() => handleApplyPalette(palette)}>
                  Apply to Theme
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button onClick={() => handleApplyPalette(palette)}>
            <Sparkles className="mr-2 h-4 w-4" />
            Apply Palette
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

interface ColorSwatchProps {
  color: Color;
  label: string;
  showName?: boolean;
  onCopy?: (color: Color) => void;
}

function ColorSwatch({ color, label, showName = true, onCopy }: ColorSwatchProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-xs font-medium mb-1">
        <span className="capitalize">{label}</span>
        {showName && color.name && <span>{color.name}</span>}
      </div>
      <div 
        className="relative h-16 w-full rounded-md flex items-center justify-center overflow-hidden group"
        style={{ backgroundColor: color.hex }}
      >
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onCopy && onCopy(color)}
        >
          <Copy className="h-3 w-3 mr-1" />
          Copy
        </Button>
      </div>
      <div className="flex justify-between text-xs">
        <span>{color.hex}</span>
        <span>{color.rgb.replace('rgb(', '').replace(')', '')}</span>
      </div>
    </div>
  );
}