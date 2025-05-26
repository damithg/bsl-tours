import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { Color, ColorPalette } from '@/components/ColorPaletteGenerator';
import { applyPaletteToTheme } from '@/utils/colorPalette';

// Royal Blue Gold theme as default
const defaultPalette: ColorPalette = {
  primary: { hex: '#1E40AF', rgb: 'rgb(30, 64, 175)', name: 'Royal Blue', isLight: false },
  secondary: { hex: '#E5B45A', rgb: 'rgb(229, 180, 90)', name: 'Gold', isLight: true },
  accent: { hex: '#F26B6B', rgb: 'rgb(242, 107, 107)', name: 'Warm Coral', isLight: true },
  background: { hex: '#FAF9F6', rgb: 'rgb(250, 249, 246)', name: 'Soft Ivory', isLight: true },
  text: { hex: '#004E64', rgb: 'rgb(0, 78, 100)', name: 'Deep Teal', isLight: false },
  muted: { hex: '#A9A9A9', rgb: 'rgb(169, 169, 169)', name: 'Driftwood Gray', isLight: true },
  border: { hex: '#88B04B', rgb: 'rgb(136, 176, 75)', name: 'Palm Green', isLight: true },
  destructive: { hex: '#F26B6B', rgb: 'rgb(242, 107, 107)', name: 'Warm Coral', isLight: false },
  success: { hex: '#88B04B', rgb: 'rgb(136, 176, 75)', name: 'Palm Green', isLight: false },
  warning: { hex: '#E5B45A', rgb: 'rgb(229, 180, 90)', name: 'Gold', isLight: true },
  info: { hex: '#F8C8DC', rgb: 'rgb(248, 200, 220)', name: 'Sunset Peach', isLight: true },
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
    // Use our utility function to apply the palette to CSS variables
    applyPaletteToTheme(newPalette);

    // Update our state
    setPalette(newPalette);
    
    // Save to localStorage for persistence
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

  // Initialize with our beach theme palette
  useEffect(() => {
    // Clear previous stored palette to ensure our new beach theme is applied
    localStorage.removeItem('colorPalette');
    
    // Apply our beach-inspired default palette
    applyPalette(defaultPalette);
    
    // Log that we're applying the beach theme
    console.log('Applied beach-inspired luxury theme palette');
  }, [applyPalette]);

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