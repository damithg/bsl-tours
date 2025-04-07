// No longer using color-thief-node or colorthief
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

// Extract a color palette from an image URL - now always returns the default palette
// since we removed the color-thief-node dependency
export async function extractPaletteFromImage(imageUrl: string): Promise<ColorPalette> {
  // With color-thief-node removed, we always return the default palette
  return createDefaultPalette();
}

// Generate color variations based on a dominant color
function generateColorVariations(dominantColor: number[]): Color[] {
  const variations: Color[] = [];
  const [r, g, b] = dominantColor as [number, number, number];
  
  // Lighten
  variations.push({
    hex: rgbArrayToHex([Math.min(255, r + 50), Math.min(255, g + 50), Math.min(255, b + 50)]),
    rgb: rgbToCssString([Math.min(255, r + 50), Math.min(255, g + 50), Math.min(255, b + 50)]),
    isLight: true,
    name: 'Lighter Shade'
  });
  
  // Darken
  variations.push({
    hex: rgbArrayToHex([Math.max(0, r - 50), Math.max(0, g - 50), Math.max(0, b - 50)]),
    rgb: rgbToCssString([Math.max(0, r - 50), Math.max(0, g - 50), Math.max(0, b - 50)]),
    isLight: false,
    name: 'Darker Shade'
  });
  
  // Complementary (simple version)
  variations.push({
    hex: rgbArrayToHex([255 - r, 255 - g, 255 - b]),
    rgb: rgbToCssString([255 - r, 255 - g, 255 - b]),
    isLight: isLightColor(rgbArrayToHex([255 - r, 255 - g, 255 - b])),
    name: 'Complementary'
  });
  
  return variations;
}

// Create a default palette when image analysis is not available
function createDefaultPalette(): ColorPalette {
  // Beach + Ocean Inspired Luxury theme
  const primary: Color = {
    hex: '#0077B6', // Ocean Blue
    rgb: 'rgb(0, 119, 182)',
    isLight: false,
    name: 'Ocean Blue'
  };
  
  const secondary: Color = {
    hex: '#F6E27F', // Golden Sand
    rgb: 'rgb(246, 226, 127)',
    isLight: true,
    name: 'Golden Sand'
  };
  
  const accent: Color = {
    hex: '#F26B6B', // Warm Coral
    rgb: 'rgb(242, 107, 107)',
    isLight: true,
    name: 'Warm Coral'
  };
  
  return {
    primary,
    secondary,
    accent,
    background: {
      hex: '#FAF9F6',
      rgb: 'rgb(250, 249, 246)',
      isLight: true,
      name: 'Soft Ivory'
    },
    text: {
      hex: '#004E64',
      rgb: 'rgb(0, 78, 100)',
      isLight: false,
      name: 'Deep Teal'
    },
    muted: {
      hex: '#A9A9A9',
      rgb: 'rgb(169, 169, 169)',
      isLight: true,
      name: 'Driftwood Gray'
    },
    border: {
      hex: '#88B04B',
      rgb: 'rgb(136, 176, 75)',
      isLight: true,
      name: 'Palm Green'
    },
    destructive: {
      hex: '#F26B6B',
      rgb: 'rgb(242, 107, 107)',
      isLight: false,
      name: 'Warm Coral'
    },
    success: {
      hex: '#88B04B',
      rgb: 'rgb(136, 176, 75)',
      isLight: false,
      name: 'Palm Green'
    },
    warning: {
      hex: '#F6E27F',
      rgb: 'rgb(246, 226, 127)',
      isLight: true,
      name: 'Golden Sand'
    },
    info: {
      hex: '#F8C8DC',
      rgb: 'rgb(248, 200, 220)',
      isLight: true,
      name: 'Sunset Peach'
    }
  };
}

// Simple function to parse hex color to RGBA values
function hexToRgba(hex: string): number[] {
  // Remove the hash if present
  hex = hex.replace(/^#/, '');
  
  // Parse hex to RGB
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  
  return [r, g, b, 1]; // Adding alpha value of 1
}

// Create a harmonious color palette from extracted colors
function createPalette(colors: Color[]): ColorPalette {
  // Sort colors by vibrance/saturation to find potential primary colors
  // This is a simplified approach - a real implementation would be more sophisticated
  const sortedColors = [...colors].sort((a, b) => {
    const aRgb = hexToRgba(a.hex);
    const bRgb = hexToRgba(b.hex);
    
    // Calculate rough saturation (max - min)
    const aSaturation = Math.max(...aRgb.slice(0, 3)) - Math.min(...aRgb.slice(0, 3));
    const bSaturation = Math.max(...bRgb.slice(0, 3)) - Math.min(...bRgb.slice(0, 3));
    
    return bSaturation - aSaturation; // Higher saturation first
  });
  
  // Find good candidates for different roles
  // Primary: Typically a saturated, darker color that stands out
  const primaryCandidates = sortedColors.filter(c => !c.isLight).slice(0, 3);
  const primary = primaryCandidates[0] || sortedColors[0];
  
  // Secondary: Contrasting color to primary, often lighter
  const secondaryCandidates = sortedColors.filter(
    c => getContrast(c.hex, primary.hex) > 2.5 && c.hex !== primary.hex
  );
  const secondary = secondaryCandidates[0] || sortedColors[1];
  
  // Accent: An eye-catching color different from primary/secondary
  const accentCandidates = sortedColors.filter(
    c => c.hex !== primary.hex && c.hex !== secondary.hex && c.isLight
  );
  const accent = accentCandidates[0] || sortedColors[2];
  
  // Find light colors for background
  const lightColors = sortedColors.filter(c => c.isLight);
  const background = { 
    hex: '#FFFFFF',
    rgb: 'rgb(255, 255, 255)', 
    name: 'White',
    isLight: true
  };
  
  // Text color - needs good contrast with background
  // Usually dark colors work best for text
  const darkColors = sortedColors.filter(c => !c.isLight);
  const text = darkColors[0] || { 
    hex: '#1F2937',
    rgb: 'rgb(31, 41, 55)', 
    name: 'Gray 800',
    isLight: false
  };
  
  // Find muted color
  const muted = { 
    hex: '#F3F4F6',
    rgb: 'rgb(243, 244, 246)', 
    name: 'Gray 100',
    isLight: true
  };
  
  // Border color
  const border = { 
    hex: '#E5E7EB',
    rgb: 'rgb(229, 231, 235)', 
    name: 'Gray 200',
    isLight: true
  };
  
  // Functional colors
  const destructive = { 
    hex: '#EF4444',
    rgb: 'rgb(239, 68, 68)', 
    name: 'Red',
    isLight: false
  };
  
  const success = { 
    hex: '#10B981',
    rgb: 'rgb(16, 185, 129)', 
    name: 'Green',
    isLight: false
  };
  
  const warning = { 
    hex: '#F59E0B',
    rgb: 'rgb(245, 158, 11)', 
    name: 'Amber',
    isLight: true
  };
  
  const info = { 
    hex: '#3B82F6',
    rgb: 'rgb(59, 130, 246)', 
    name: 'Blue',
    isLight: false
  };
  
  return {
    primary,
    secondary,
    accent,
    background,
    text,
    muted,
    border,
    destructive,
    success,
    warning,
    info
  };
}

// Apply a color palette to the theme by updating the CSS variables
export function applyPaletteToTheme(palette: ColorPalette): void {
  const root = document.documentElement;

  // Core UI colors
  root.style.setProperty('--primary', palette.primary.hex); // Ocean Blue
  root.style.setProperty('--primary-foreground', palette.primary.isLight ? '#000000' : '#ffffff');
  
  root.style.setProperty('--secondary', palette.secondary.hex); // Golden Sand
  root.style.setProperty('--secondary-foreground', palette.secondary.isLight ? '#000000' : '#ffffff');
  
  root.style.setProperty('--accent', palette.accent.hex); // Warm Coral
  root.style.setProperty('--accent-foreground', palette.accent.isLight ? '#000000' : '#ffffff');
  
  root.style.setProperty('--background', palette.background.hex); // Soft Ivory
  root.style.setProperty('--foreground', palette.text.hex); // Deep Teal
  
  root.style.setProperty('--muted', palette.muted.hex); // Driftwood Gray
  root.style.setProperty('--muted-foreground', `${palette.text.hex}88`); // Deep Teal with opacity
  
  root.style.setProperty('--border', palette.border.hex); // Palm Green
  root.style.setProperty('--input', palette.background.hex);
  root.style.setProperty('--ring', palette.primary.hex);
  
  // Status colors
  if (palette.destructive) {
    root.style.setProperty('--destructive', palette.destructive.hex); // Warm Coral
    root.style.setProperty('--destructive-foreground', '#ffffff');
  }
  
  if (palette.success) {
    root.style.setProperty('--success', palette.success.hex); // Palm Green
    root.style.setProperty('--success-foreground', '#ffffff');
  }
  
  if (palette.warning) {
    root.style.setProperty('--warning', palette.warning.hex); // Golden Sand
    root.style.setProperty('--warning-foreground', '#000000');
  }
  
  if (palette.info) {
    root.style.setProperty('--info', palette.info.hex); // Sunset Peach
    root.style.setProperty('--info-foreground', '#000000');
  }
  
  // Card styles 
  root.style.setProperty('--card', palette.background.hex); // Soft Ivory
  root.style.setProperty('--card-foreground', palette.text.hex); // Deep Teal
  
  // Popover styles
  root.style.setProperty('--popover', palette.background.hex); // Soft Ivory
  root.style.setProperty('--popover-foreground', palette.text.hex); // Deep Teal
  
  // Log the applied color palette
  console.log('Beach theme applied with colors:', {
    primary: palette.primary.name,
    secondary: palette.secondary.name,
    accent: palette.accent.name,
    background: palette.background.name,
    text: palette.text.name
  });
}