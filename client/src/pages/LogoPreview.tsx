import React, { useState } from 'react';
import BSLLogo from '@/components/BSLLogo';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

const LogoPreview: React.FC = () => {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [logoColor, setLogoColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(48);
  const [letterSpacing, setLetterSpacing] = useState(0.15);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">BSL Tours Logo Preview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Preview Cards */}
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div 
                className="flex items-center justify-center p-16"
                style={{ backgroundColor }}
              >
                <BSLLogo 
                  color={logoColor} 
                  fontSize={`${fontSize}px`} 
                  letterSpacing={`${letterSpacing}em`}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div 
                className="flex items-center justify-center p-12 rounded-md bg-cover bg-center"
                style={{ 
                  backgroundImage: 'url(https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2000&auto=format&fit=crop)',
                }}
              >
                <BSLLogo 
                  color={logoColor} 
                  fontSize={`${fontSize}px`} 
                  letterSpacing={`${letterSpacing}em`}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-medium mb-2">Customize Logo</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="background-color">Background Color</Label>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div 
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor }}
                    />
                    <Input 
                      id="background-color"
                      type="text" 
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-32"
                    />
                  </div>
                </div>
                
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
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Developer Info</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="text-xs overflow-x-auto">
{`// Import the component
import BSLLogo from '@/components/BSLLogo';

// Use in your component
<BSLLogo 
  color="${logoColor}"
  fontSize="${fontSize}px"
  letterSpacing="${letterSpacing}em"
/>
`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LogoPreview;