import React, { useState, useRef, useEffect } from 'react';
import { Download, Share2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useColorPalette } from '@/contexts/ColorPaletteContext';
import type { TourData, TourImage } from '@/types/tour';
import { Card, CardContent } from '@/components/ui/card';
import SocialMediaStoryTemplate from '@/components/SocialMediaStoryTemplate';

interface SocialMediaStoryGeneratorProps {
  tourData: TourData;
  className?: string;
}

export function SocialMediaStoryGenerator({ tourData, className = '' }: SocialMediaStoryGeneratorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('instagram');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<TourImage | null>(null);
  const [generatedStoryUrl, setGeneratedStoryUrl] = useState<string | null>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const { palette } = useColorPalette();

  // Select the best available image on load
  useEffect(() => {
    if (isDialogOpen && !selectedImage) {
      // Try hero image first, then card image, then first gallery image
      if (tourData.heroImage) {
        setSelectedImage(tourData.heroImage);
      } else if (tourData.cardImage) {
        setSelectedImage(tourData.cardImage);
      } else if (tourData.galleryImages && tourData.galleryImages.length > 0) {
        setSelectedImage(tourData.galleryImages[0]);
      }
    }
  }, [isDialogOpen, tourData, selectedImage]);

  const getImageUrl = (image: TourImage | null): string => {
    if (!image) return '';
    return image.large || image.medium || image.small || image.baseUrl || '';
  };

  const getHighlightText = (): string => {
    if (tourData.highlights && tourData.highlights.length > 0) {
      // Return the first highlight or a combination of them
      return tourData.highlights[0];
    }
    return tourData.summary?.slice(0, 100) || 'Experience the beauty of Sri Lanka';
  };

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value);
  };

  const handleImageSelection = (image: TourImage) => {
    setSelectedImage(image);
  };

  const generateStory = async () => {
    try {
      setIsGenerating(true);
      
      if (!storyRef.current) {
        throw new Error('Story reference not found');
      }

      try {
        // Attempt to dynamically import html2canvas
        const html2canvasModule = await import('html2canvas').catch(e => {
          console.warn('html2canvas module not available:', e);
          return null;
        });
        
        // Check if import was successful
        if (!html2canvasModule) {
          // Fallback for local development without html2canvas
          console.log('html2canvas not available - using fallback for local development');
          
          // Create a simulated delay and use a placeholder image
          setTimeout(() => {
            // Create a placeholder data URL (transparent 1x1 pixel)
            const placeholderDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
            setGeneratedStoryUrl(placeholderDataUrl);
            setIsGenerating(false);
            
            toast({
              title: 'Development Mode',
              description: 'Story generation simulation complete. Full functionality available in production.',
            });
          }, 1500);
          
          return;
        }
        
        const html2canvas = html2canvasModule.default;
        
        // Give a little time for any rendering to complete
        setTimeout(async () => {
          try {
            const canvas = await html2canvas(storyRef.current!, {
              scale: 2, // Higher quality
              useCORS: true, // Allow cross-origin images
              allowTaint: true,
              backgroundColor: null,
            });
            
            const dataUrl = canvas.toDataURL('image/png');
            setGeneratedStoryUrl(dataUrl);
            setIsGenerating(false);
            
            toast({
              title: 'Story Generated!',
              description: 'Your social media story is ready to download and share.',
            });
          } catch (error) {
            console.error('Error generating canvas:', error);
            setIsGenerating(false);
            toast({
              title: 'Generation Failed',
              description: 'There was a problem creating your story. Please try again.',
              variant: 'destructive',
            });
          }
        }, 100);
      } catch (error) {
        console.error('Error importing html2canvas:', error);
        setIsGenerating(false);
        toast({
          title: 'Feature Unavailable',
          description: 'Story generation requires additional dependencies. Full functionality available in production.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error in generate story:', error);
      setIsGenerating(false);
      toast({
        title: 'Generation Failed',
        description: 'There was a problem creating your story. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const downloadStory = () => {
    if (!generatedStoryUrl) return;
    
    // Check if we have the placeholder (1x1 transparent image)
    const isPlaceholder = generatedStoryUrl.length < 150;
    
    if (isPlaceholder) {
      toast({
        title: 'Development Mode',
        description: 'In local development, a blank placeholder image is downloaded. Full functionality available in production.',
      });
    }
    
    const link = document.createElement('a');
    link.href = generatedStoryUrl;
    link.download = `${tourData.name.replace(/\s+/g, '-').toLowerCase()}-story.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    if (!isPlaceholder) {
      toast({
        title: 'Story Downloaded',
        description: 'Your social media story has been downloaded.',
      });
    }
  };

  const shareStory = async () => {
    if (!generatedStoryUrl) return;
    
    // Check if we have the placeholder (1x1 transparent image)
    const isPlaceholder = generatedStoryUrl.length < 150;
    
    if (isPlaceholder) {
      toast({
        title: 'Development Mode',
        description: 'In local development, sharing is simulated. Full functionality available in production.',
      });
      return;
    }
    
    try {
      // Convert data URL to blob
      const fetchResponse = await fetch(generatedStoryUrl);
      const blob = await fetchResponse.blob();
      
      if (navigator.share) {
        await navigator.share({
          title: `${tourData.name} - Tour Story`,
          text: 'Check out this amazing tour in Sri Lanka!',
          files: [new File([blob], 'tour-story.png', { type: 'image/png' })],
        });
        
        toast({
          title: 'Story Shared',
          description: 'Your social media story has been shared.',
        });
      } else {
        toast({
          title: 'Sharing Not Available',
          description: 'Your browser does not support sharing. Please download and share manually.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: 'Sharing Failed',
        description: 'There was a problem sharing your story. Please try downloading instead.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <Button 
        onClick={() => setIsDialogOpen(true)}
        variant="outline"
        className={`${className} flex items-center gap-2`}
      >
        <Share2 className="h-4 w-4" />
        Create Social Story
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create Social Media Story</DialogTitle>
            <DialogDescription>
              Generate a beautiful social media story to share your Sri Lanka travel experience.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue={selectedTemplate} onValueChange={handleTemplateChange}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="instagram">Instagram</TabsTrigger>
              <TabsTrigger value="facebook">Facebook</TabsTrigger>
              <TabsTrigger value="tiktok">TikTok</TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1 space-y-4">
                <div>
                  <Label className="text-sm font-medium">Select Image</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2 max-h-[300px] overflow-y-auto">
                    {/* Hero Image */}
                    {tourData.heroImage && (
                      <Card 
                        className={`cursor-pointer border-2 ${selectedImage === tourData.heroImage ? 'border-primary' : 'border-transparent'}`}
                        onClick={() => handleImageSelection(tourData.heroImage!)}
                      >
                        <CardContent className="p-1">
                          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                            <img 
                              src={getImageUrl(tourData.heroImage)} 
                              alt={tourData.heroImage.alt || 'Tour hero image'} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {/* Card Image */}
                    {tourData.cardImage && (
                      <Card 
                        className={`cursor-pointer border-2 ${selectedImage === tourData.cardImage ? 'border-primary' : 'border-transparent'}`}
                        onClick={() => handleImageSelection(tourData.cardImage!)}
                      >
                        <CardContent className="p-1">
                          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                            <img 
                              src={getImageUrl(tourData.cardImage)} 
                              alt={tourData.cardImage.alt || 'Tour card image'} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {/* Gallery Images */}
                    {tourData.galleryImages && tourData.galleryImages.map((image, idx) => (
                      <Card 
                        key={`gallery-${idx}`}
                        className={`cursor-pointer border-2 ${selectedImage === image ? 'border-primary' : 'border-transparent'}`}
                        onClick={() => handleImageSelection(image)}
                      >
                        <CardContent className="p-1">
                          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                            <img 
                              src={getImageUrl(image)} 
                              alt={image.alt || `Gallery image ${idx + 1}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <Label className="text-sm font-medium">Preview</Label>
                <div className="mt-2 relative flex justify-center items-center">
                  <TabsContent value="instagram" className="w-full h-full m-0">
                    <SocialMediaStoryTemplate
                      ref={storyRef}
                      tourName={tourData.name}
                      location="Sri Lanka"
                      highlightText={getHighlightText()}
                      imageUrl={getImageUrl(selectedImage)}
                      format="instagram"
                      palette={palette}
                    />
                  </TabsContent>
                  
                  <TabsContent value="facebook" className="w-full h-full m-0">
                    <SocialMediaStoryTemplate
                      ref={storyRef}
                      tourName={tourData.name}
                      location="Sri Lanka"
                      highlightText={getHighlightText()}
                      imageUrl={getImageUrl(selectedImage)}
                      format="facebook"
                      palette={palette}
                    />
                  </TabsContent>
                  
                  <TabsContent value="tiktok" className="w-full h-full m-0">
                    <SocialMediaStoryTemplate
                      ref={storyRef}
                      tourName={tourData.name}
                      location="Sri Lanka"
                      highlightText={getHighlightText()}
                      imageUrl={getImageUrl(selectedImage)}
                      format="tiktok"
                      palette={palette}
                    />
                  </TabsContent>
                </div>
              </div>
            </div>
          </Tabs>
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            {!generatedStoryUrl ? (
              <Button 
                onClick={generateStory} 
                disabled={isGenerating || !selectedImage}
                className="w-full sm:w-auto"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Generate Story
                  </>
                )}
              </Button>
            ) : (
              <>
                <Button 
                  onClick={downloadStory} 
                  variant="default"
                  className="w-full sm:w-auto"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                
                <Button 
                  onClick={shareStory} 
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SocialMediaStoryGenerator;