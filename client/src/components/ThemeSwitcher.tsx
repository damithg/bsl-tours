import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Check, Palette } from 'lucide-react';

const themes = [
  { name: 'Default (Teal)', file: 'theme.json', color: 'hsl(174, 77%, 29%)' },
  { name: 'Burgundy', file: 'theme-burgundy.json', color: 'hsl(345, 77%, 29%)' },
  { name: 'Emerald', file: 'theme-emerald.json', color: 'hsl(152, 77%, 29%)' },
  { name: 'Purple', file: 'theme-purple.json', color: 'hsl(270, 77%, 29%)' },
  { name: 'Royal Blue', file: 'theme-royal-blue.json', color: 'hsl(214, 77%, 29%)' },
  { name: 'Teal', file: 'theme-teal.json', color: 'hsl(174, 77%, 29%)' },
];

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<string>('theme.json');
  const [open, setOpen] = useState(false);

  const changeTheme = async (themeFile: string) => {
    try {
      // Fetch the theme JSON file
      const response = await fetch(`/${themeFile}`);
      if (!response.ok) {
        console.error(`Failed to load theme: ${themeFile}`);
        return;
      }
      
      const themeData = await response.json();
      
      // Apply theme to document root
      const rootElement = document.documentElement;
      
      // Set CSS variables based on theme data
      if (themeData.primary) {
        rootElement.style.setProperty('--primary', themeData.primary);
        rootElement.style.setProperty('--primary-foreground', '#ffffff');
        console.log(`Applied theme: ${themeFile} with primary color ${themeData.primary}`);
      }
      
      // Store the selected theme
      setCurrentTheme(themeFile);
      localStorage.setItem('selected-theme', themeFile);
      
      // Close the popover
      setOpen(false);
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  };
  
  // Load saved theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('selected-theme');
    if (savedTheme) {
      changeTheme(savedTheme);
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
            style={{ borderColor: activeTheme.color }}
          >
            <Palette className="h-6 w-6" style={{ color: activeTheme.color }} />
            <span className="sr-only">Change theme</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2" align="end">
          <div className="space-y-1">
            <p className="text-sm font-medium text-center mb-2">Select Color Theme</p>
            {themes.map((theme) => (
              <Button
                key={theme.file}
                variant="ghost"
                className="w-full justify-start font-normal"
                onClick={() => changeTheme(theme.file)}
              >
                <div 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{ backgroundColor: theme.color }}
                ></div>
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