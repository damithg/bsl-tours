import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Check, Palette } from 'lucide-react';

// Define standard theme color palettes
const themes = [
  { 
    name: 'Beach Paradise', 
    file: 'theme-beach.json', 
    primary: 'hsl(199, 100%, 36%)', // Ocean Blue
    secondary: '#F6E27F', // Golden Sand
    accent: '#F26B6B',    // Warm Coral
  },
  { 
    name: 'Teal Gold', 
    file: 'theme.json', 
    primary: 'hsl(174, 77%, 29%)',
    secondary: '#D4AF37', // Gold
    accent: '#103556',    // Dark blue
  },
  { 
    name: 'Burgundy Gold', 
    file: 'theme-burgundy.json', 
    primary: 'hsl(345, 77%, 29%)',
    secondary: '#D4AF37', // Gold
    accent: '#2A1215',    // Dark burgundy
  },
  { 
    name: 'Emerald Gold', 
    file: 'theme-emerald.json', 
    primary: 'hsl(152, 77%, 29%)',
    secondary: '#D4AF37', // Gold
    accent: '#0F3D30',    // Dark green
  },
  { 
    name: 'Purple Gold', 
    file: 'theme-purple.json', 
    primary: 'hsl(270, 77%, 29%)',
    secondary: '#D4AF37', // Gold
    accent: '#2A1042',    // Dark purple
  },
  { 
    name: 'Royal Blue Gold', 
    file: 'theme-royal-blue.json', 
    primary: 'hsl(214, 77%, 29%)',
    secondary: '#D4AF37', // Gold
    accent: '#0A2A4D',    // Dark blue
  }
];

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<string>('theme-beach.json');
  const [open, setOpen] = useState(false);

  const changeTheme = async (themeFile: string) => {
    try {
      // Fetch the theme JSON file
      const response = await fetch(`/${themeFile}`);
      if (!response.ok) {
        // Debug code (temporarily hidden)
        // console.error(`Failed to load theme: ${themeFile}`);
        return;
      }
      
      const themeData = await response.json();
      
      // Apply theme to document root
      const rootElement = document.documentElement;
      
      // Get the theme object with complete color data
      const theme = themes.find(t => t.file === themeFile) || themes[0];
      
      // Set CSS variables based on theme data and selected palette
      rootElement.style.setProperty('--primary', themeData.primary);
      rootElement.style.setProperty('--primary-foreground', '#ffffff');
      
      // Set additional luxury theme variables
      rootElement.style.setProperty('--secondary', theme.secondary);
      rootElement.style.setProperty('--secondary-foreground', '#000000');
      rootElement.style.setProperty('--accent', theme.accent);
      rootElement.style.setProperty('--accent-foreground', '#ffffff');
      
      // Debug code (temporarily hidden)
      // console.log(`Applied theme: ${themeFile} with primary: ${themeData.primary}, secondary: ${theme.secondary}, accent: ${theme.accent}`);
      
      // Store the selected theme
      setCurrentTheme(themeFile);
      localStorage.setItem('selected-theme', themeFile);
      
      // Close the popover
      setOpen(false);
    } catch (error) {
      // Debug code (temporarily hidden)
      // console.error('Error applying theme:', error);
    }
  };
  
  // Load saved theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('selected-theme');
    if (savedTheme) {
      changeTheme(savedTheme);
    } else {
      // Set beach theme as default if none found
      changeTheme('theme-beach.json');
    }
  }, []);

  // Get the current theme object
  const activeTheme = themes.find(t => t.file === currentTheme) || themes[0];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-12 w-12 bg-white shadow-md border-2"
            style={{ borderColor: activeTheme.primary }}
          >
            <Palette className="h-6 w-6" style={{ color: activeTheme.primary }} />
            <span className="sr-only">Change theme</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3" align="end">
          <div className="space-y-2">
            <p className="text-sm font-medium text-center mb-2">Select Luxury Color Theme</p>
            {themes.map((theme) => (
              <Button
                key={theme.file}
                variant="ghost"
                className="w-full justify-start font-normal"
                onClick={() => changeTheme(theme.file)}
              >
                <div className="flex space-x-2 mr-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.secondary }}></div>
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.accent }}></div>
                </div>
                {theme.name}
                {currentTheme === theme.file && (
                  <Check className="h-4 w-4 ml-auto" />
                )}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}