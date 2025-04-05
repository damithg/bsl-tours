import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { Color, ColorPalette } from '@/components/ColorPaletteGenerator';

// Default colors that match the existing theme
const defaultPalette: ColorPalette = {
  primary: { hex: '#0F766E', rgb: 'rgb(15, 118, 110)', name: 'Teal', isLight: false }, // Teal
  secondary: { hex: '#E5B45A', rgb: 'rgb(229, 180, 90)', name: 'Gold', isLight: true }, // Gold accent
  accent: { hex: '#F59E0B', rgb: 'rgb(245, 158, 11)', name: 'Amber', isLight: true },
  background: { hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', name: 'White', isLight: true },
  text: { hex: '#1F2937', rgb: 'rgb(31, 41, 55)', name: 'Gray 800', isLight: false },
  muted: { hex: '#F3F4F6', rgb: 'rgb(243, 244, 246)', name: 'Gray 100', isLight: true },
  border: { hex: '#E5E7EB', rgb: 'rgb(229, 231, 235)', name: 'Gray 200', isLight: true },
  destructive: { hex: '#EF4444', rgb: 'rgb(239, 68, 68)', name: 'Red', isLight: false },
  success: { hex: '#10B981', rgb: 'rgb(16, 185, 129)', name: 'Green', isLight: false },
  warning: { hex: '#F59E0B', rgb: 'rgb(245, 158, 11)', name: 'Amber', isLight: true },
  info: { hex: '#3B82F6', rgb: 'rgb(59, 130, 246)', name: 'Blue', isLight: false },
};

type ColorPaletteContextType = {
  palette: ColorPalette;
  setPalette: (palette: ColorPalette) => void;
  applyPalette: (palette: ColorPalette) => void;
  resetPalette: () => void;
  getColorHex: (role: keyof ColorPalette) => string;
  setPresetTheme: (theme: 'teal' | 'royal-blue' | 'purple' | 'emerald' | 'burgundy') => void;
};

const ColorPaletteContext = createContext<ColorPaletteContextType | undefined>(undefined);

export function ColorPaletteProvider({ children }: { children: ReactNode }) {
  const [palette, setPalette] = useState<ColorPalette>(defaultPalette);

  // Apply the palette to CSS variables
  const applyPalette = useCallback((newPalette: ColorPalette) => {
    const root = document.documentElement;

    // Set CSS variables
    root.style.setProperty('--primary', newPalette.primary.hex);
    root.style.setProperty('--primary-foreground', newPalette.primary.isLight ? '#000000' : '#ffffff');
    
    root.style.setProperty('--secondary', newPalette.secondary.hex);
    root.style.setProperty('--secondary-foreground', newPalette.secondary.isLight ? '#000000' : '#ffffff');
    
    root.style.setProperty('--accent', newPalette.accent.hex);
    root.style.setProperty('--accent-foreground', newPalette.accent.isLight ? '#000000' : '#ffffff');
    
    root.style.setProperty('--background', newPalette.background.hex);
    root.style.setProperty('--foreground', newPalette.text.hex);
    
    root.style.setProperty('--muted', newPalette.muted.hex);
    root.style.setProperty('--muted-foreground', `${newPalette.text.hex}88`); // 88 for opacity
    
    root.style.setProperty('--border', newPalette.border.hex);
    
    if (newPalette.destructive) {
      root.style.setProperty('--destructive', newPalette.destructive.hex);
      root.style.setProperty('--destructive-foreground', '#ffffff');
    }

    setPalette(newPalette);
    
    // You could also save to localStorage here if you want persistence
    localStorage.setItem('colorPalette', JSON.stringify(newPalette));
  }, []);

  // Reset to default palette
  const resetPalette = useCallback(() => {
    applyPalette(defaultPalette);
  }, [applyPalette]);

  // Get a specific color by role
  const getColorHex = useCallback((role: keyof ColorPalette): string => {
    const color = palette[role];
    return color ? color.hex : '#000000';
  }, [palette]);

  // Set a preset theme (teal, royal-blue, purple, emerald, burgundy)
  const setPresetTheme = useCallback((theme: 'teal' | 'royal-blue' | 'purple' | 'emerald' | 'burgundy') => {
    const presetPalettes = {
      teal: {
        ...defaultPalette,
        primary: { hex: '#0F766E', rgb: 'rgb(15, 118, 110)', name: 'Teal', isLight: false },
        secondary: { hex: '#E5B45A', rgb: 'rgb(229, 180, 90)', name: 'Gold', isLight: true },
      },
      'royal-blue': {
        ...defaultPalette,
        primary: { hex: '#1E40AF', rgb: 'rgb(30, 64, 175)', name: 'Royal Blue', isLight: false },
        secondary: { hex: '#E5B45A', rgb: 'rgb(229, 180, 90)', name: 'Gold', isLight: true },
      },
      purple: {
        ...defaultPalette,
        primary: { hex: '#7E22CE', rgb: 'rgb(126, 34, 206)', name: 'Purple', isLight: false },
        secondary: { hex: '#C084FC', rgb: 'rgb(192, 132, 252)', name: 'Light Purple', isLight: true },
      },
      emerald: {
        ...defaultPalette,
        primary: { hex: '#047857', rgb: 'rgb(4, 120, 87)', name: 'Emerald', isLight: false },
        secondary: { hex: '#6EE7B7', rgb: 'rgb(110, 231, 183)', name: 'Light Emerald', isLight: true },
      },
      burgundy: {
        ...defaultPalette,
        primary: { hex: '#9F1239', rgb: 'rgb(159, 18, 57)', name: 'Burgundy', isLight: false },
        secondary: { hex: '#FB7185', rgb: 'rgb(251, 113, 133)', name: 'Light Burgundy', isLight: true },
      },
    };

    const selectedPalette = presetPalettes[theme];
    applyPalette(selectedPalette);
  }, [applyPalette]);

  // Initialize with stored palette or default
  useEffect(() => {
    const storedPalette = localStorage.getItem('colorPalette');
    if (storedPalette) {
      try {
        const parsedPalette = JSON.parse(storedPalette) as ColorPalette;
        applyPalette(parsedPalette);
      } catch (error) {
        console.error('Failed to parse stored color palette:', error);
        resetPalette();
      }
    } else {
      // Apply default palette on first load
      applyPalette(defaultPalette);
    }
  }, [applyPalette, resetPalette]);

  return (
    <ColorPaletteContext.Provider value={{ 
      palette, 
      setPalette, 
      applyPalette, 
      resetPalette, 
      getColorHex,
      setPresetTheme
    }}>
      {children}
    </ColorPaletteContext.Provider>
  );
}

export function useColorPalette() {
  const context = useContext(ColorPaletteContext);
  if (context === undefined) {
    throw new Error('useColorPalette must be used within a ColorPaletteProvider');
  }
  return context;
}