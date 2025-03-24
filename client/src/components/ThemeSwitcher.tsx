import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Check, Palette } from 'lucide-react';

const themes = [
  { name: 'Default', file: 'theme.json' },
  { name: 'Burgundy', file: 'theme-burgundy.json' },
  { name: 'Emerald', file: 'theme-emerald.json' },
  { name: 'Purple', file: 'theme-purple.json' },
  { name: 'Royal Blue', file: 'theme-royal-blue.json' },
  { name: 'Teal', file: 'theme-teal.json' },
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

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10 bg-background border-primary">
            <Palette className="h-5 w-5" />
            <span className="sr-only">Toggle themes</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2" align="end">
          <div className="space-y-1">
            {themes.map((theme) => (
              <Button
                key={theme.file}
                variant="ghost"
                className="w-full justify-start font-normal"
                onClick={() => changeTheme(theme.file)}
              >
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