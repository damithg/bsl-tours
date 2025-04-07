import { Color, ColorPalette } from '@/components/ColorPaletteGenerator';
import { getContrast } from 'color2k';

// Helper function to convert RGB array to hex string
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Helper function to safely convert RGB array to hex string
function rgbArrayToHex(rgb: number[]): string {
  if (rgb.length < 3) return '#000000';
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

// Helper function to convert RGB array to CSS rgb string
function rgbToCssString(rgb: number[]): string {
  if (rgb.length < 3) return 'rgb(0, 0, 0)';
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

// Determine if a color is light or dark (for text contrast)
function isLightColor(hex: string): boolean {
  const black = '#000000';
  const white = '#FFFFFF';
  
  const blackContrast = getContrast(hex, black);
  const whiteContrast = getContrast(hex, white);
  
  // If contrast with black is higher than with white, the color is light
  return blackContrast > whiteContrast;
}

// Get color name based on hex value (very simplified version)
// In a real app, this would use a more sophisticated color naming library
function getColorName(hex: string): string {
  // This is a very basic implementation - real apps would use a library or a larger database
  const colorMap: Record<string, string> = {
    '#FF0000': 'Red',
    '#00FF00': 'Green',
    '#0000FF': 'Blue',
    '#FFFF00': 'Yellow',
    '#FF00FF': 'Magenta',
    '#00FFFF': 'Cyan',
    '#FFFFFF': 'White',
    '#000000': 'Black',
  };
  
  return colorMap[hex.toUpperCase()] || 'Custom Color';
}

/**
 * This is a simplified version of the color extraction function that doesn't 
 * rely on color-thief-node, which requires canvas. It always returns the default palette.
 */
export async function extractPaletteFromImage(imageUrl: string): Promise<ColorPalette> {
  try {
    // Always return the default palette in this simplified version
    return createDefaultPalette();
  } catch (error) {
    console.error('Error extracting colors:', error);
    return createDefaultPalette();
  }
}

// Create a default palette when image analysis is not available
function createDefaultPalette(): ColorPalette {
  // Luxury gold/navy theme as default
  const primary: Color = {
    hex: '#0F4C81', // Navy blue
    rgb: 'rgb(15, 76, 129)',
    isLight: false,
    name: 'Navy Blue'
  };
  
  const secondary: Color = {
    hex: '#D4AF37', // Gold
    rgb: 'rgb(212, 175, 55)',
    isLight: true,
    name: 'Gold'
  };
  
  const accent: Color = {
    hex: '#6C9BCF', // Light blue
    rgb: 'rgb(108, 155, 207)',
    isLight: true,
    name: 'Light Blue'
  };
  
  return {
    primary,
    secondary,
    accent,
    background: {
      hex: '#FFFFFF',
      rgb: 'rgb(255, 255, 255)',
      isLight: true,
      name: 'White'
    },
    text: {
      hex: '#1F2937',
      rgb: 'rgb(31, 41, 55)',
      isLight: false,
      name: 'Gray 800'
    },
    muted: {
      hex: '#F3F4F6',
      rgb: 'rgb(243, 244, 246)',
      isLight: true,
      name: 'Gray 100'
    },
    border: {
      hex: '#E5E7EB',
      rgb: 'rgb(229, 231, 235)',
      isLight: true,
      name: 'Gray 200'
    },
    destructive: {
      hex: '#EF4444',
      rgb: 'rgb(239, 68, 68)',
      isLight: false,
      name: 'Red'
    },
    success: {
      hex: '#10B981',
      rgb: 'rgb(16, 185, 129)',
      isLight: false,
      name: 'Green'
    },
    warning: {
      hex: '#F59E0B',
      rgb: 'rgb(245, 158, 11)',
      isLight: true,
      name: 'Amber'
    },
    info: {
      hex: '#3B82F6',
      rgb: 'rgb(59, 130, 246)',
      isLight: false,
      name: 'Blue'
    }
  };
}

// Apply a color palette to the theme by updating the CSS variables
export function applyPaletteToTheme(palette: ColorPalette): void {
  const root = document.documentElement;

  // Set CSS variables
  root.style.setProperty('--primary', palette.primary.hex);
  root.style.setProperty('--primary-foreground', palette.primary.isLight ? '#000000' : '#ffffff');
  
  root.style.setProperty('--secondary', palette.secondary.hex);
  root.style.setProperty('--secondary-foreground', palette.secondary.isLight ? '#000000' : '#ffffff');
  
  root.style.setProperty('--accent', palette.accent.hex);
  root.style.setProperty('--accent-foreground', palette.accent.isLight ? '#000000' : '#ffffff');
  
  root.style.setProperty('--background', palette.background.hex);
  root.style.setProperty('--foreground', palette.text.hex);
  
  root.style.setProperty('--muted', palette.muted.hex);
  root.style.setProperty('--muted-foreground', `${palette.text.hex}88`); // 88 for opacity
  
  root.style.setProperty('--border', palette.border.hex);
  
  if (palette.destructive) {
    root.style.setProperty('--destructive', palette.destructive.hex);
    root.style.setProperty('--destructive-foreground', '#ffffff');
  }
}