import React, { useState } from 'react';
import BSLLogo from '@/components/BSLLogo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const LogoPreview: React.FC = () => {
  const [backgroundColor, setBackgroundColor] = useState('#111111');
  const [logoColor, setLogoColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(48);
  const [letterSpacing, setLetterSpacing] = useState(0.15);
  const [variant, setVariant] = useState<'standard' | 'compact' | 'stacked'>('standard');
  const [showTagline, setShowTagline] = useState(false);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">BSL Tours Logo Preview</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview Cards */}
        <div className="space-y-6">
          <Tabs defaultValue="dark" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dark">Dark Background</TabsTrigger>
              <TabsTrigger value="light">Light Background</TabsTrigger>
            </TabsList>
            <TabsContent value="dark">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div 
                    className="flex items-center justify-center p-16"
                    style={{ backgroundColor: '#111111' }}
                  >
                    <BSLLogo 
                      color={logoColor} 
                      fontSize={`${fontSize}px`} 
                      letterSpacing={`${letterSpacing}em`}
                      variant={variant}
                      showTagline={showTagline}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="light">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div 
                    className="flex items-center justify-center p-16"
                    style={{ backgroundColor: '#ffffff' }}
                  >
                    <BSLLogo 
                      color="#111111" 
                      fontSize={`${fontSize}px`} 
                      letterSpacing={`${letterSpacing}em`}
                      variant={variant}
                      showTagline={showTagline}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">All Variants</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <div className="p-6 border rounded-md bg-gray-900 flex flex-col items-center">
                <p className="text-white text-xs mb-2">Standard</p>
                <BSLLogo 
                  color="white" 
                  fontSize="24px"
                  letterSpacing="0.15em"
                  variant="standard"
                />
              </div>
              <div className="p-6 border rounded-md bg-gray-900 flex flex-col items-center">
                <p className="text-white text-xs mb-2">Compact</p>
                <BSLLogo 
                  color="white" 
                  fontSize="24px"
                  letterSpacing="0.15em"
                  variant="compact"
                />
              </div>
              <div className="p-6 border rounded-md bg-gray-900 flex flex-col items-center">
                <p className="text-white text-xs mb-2">Stacked</p>
                <BSLLogo 
                  color="white" 
                  fontSize="24px"
                  letterSpacing="0.15em"
                  variant="stacked"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">On Photo Background</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div 
                className="flex items-center justify-center p-16 rounded-md bg-cover bg-center"
                style={{ 
                  backgroundImage: 'url(https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2000&auto=format&fit=crop)',
                }}
              >
                <BSLLogo 
                  color={logoColor} 
                  fontSize={`${fontSize}px`} 
                  letterSpacing={`${letterSpacing}em`}
                  variant={variant}
                  showTagline={showTagline}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customize Logo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <Label htmlFor="variant" className="text-sm font-medium">Logo Variant</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <button
                        className={`p-2 border rounded-md text-xs text-center ${variant === 'standard' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                        onClick={() => setVariant('standard')}
                      >
                        Standard
                      </button>
                      <button
                        className={`p-2 border rounded-md text-xs text-center ${variant === 'compact' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                        onClick={() => setVariant('compact')}
                      >
                        Compact
                      </button>
                      <button
                        className={`p-2 border rounded-md text-xs text-center ${variant === 'stacked' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                        onClick={() => setVariant('stacked')}
                      >
                        Stacked
                      </button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-tagline" className="text-sm font-medium">Show Tagline</Label>
                      <Switch
                        id="show-tagline"
                        checked={showTagline}
                        onCheckedChange={setShowTagline}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="logo-color">Logo Color</Label>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div 
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor: logoColor }}
                    />
                    <Input 
                      id="logo-color"
                      type="text" 
                      value={logoColor}
                      onChange={(e) => setLogoColor(e.target.value)}
                      className="w-32"
                    />
                    <Input
                      type="color"
                      value={logoColor}
                      onChange={(e) => setLogoColor(e.target.value)}
                      className="w-10 h-10 p-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
                  <Slider
                    id="font-size"
                    min={12}
                    max={120}
                    step={1}
                    value={[fontSize]}
                    onValueChange={(values) => setFontSize(values[0])}
                    className="mt-1.5"
                  />
                </div>
                
                <div>
                  <Label htmlFor="letter-spacing">Letter Spacing: {letterSpacing}em</Label>
                  <Slider
                    id="letter-spacing"
                    min={0}
                    max={0.5}
                    step={0.01}
                    value={[letterSpacing]}
                    onValueChange={(values) => setLetterSpacing(values[0])}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Developer Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="text-xs overflow-x-auto">
{`// Import the component
import BSLLogo from '@/components/BSLLogo';

// Use in your component
<BSLLogo 
  color="${logoColor}"
  fontSize="${fontSize}px"
  letterSpacing="${letterSpacing}em"
  variant="${variant}"
  showTagline={${showTagline}}
/>
`}
                </pre>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Logo Variants</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Standard:</strong> Horizontal "BSL TOURS" with properly aligned letterforms</li>
                <li><strong>Compact:</strong> Just "BSL" for small spaces or icons</li>
                <li><strong>Stacked:</strong> "BSL" above "TOURS" - ideal for square spaces</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Each variant can optionally show the full "BEST SRI LANKA TOURS" tagline.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LogoPreview;