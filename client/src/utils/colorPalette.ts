// Import from color-thief-node instead of colorthief
import { getColorFromURL } from 'color-thief-node';
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

// Extract a color palette from an image URL using color-thief-node
export async function extractPaletteFromImage(imageUrl: string): Promise<ColorPalette> {
  try {
    // Generate predefined colors if running in browser (color-thief-node is Node.js only)
    if (typeof window !== 'undefined') {
      // Generate a standard palette for browser environment
      return createDefaultPalette();
    }
    
    // Server-side color extraction
    const dominantColor = await getColorFromURL(imageUrl);
    const colors: Color[] = [
      {
        hex: rgbArrayToHex(dominantColor),
        rgb: rgbToCssString(dominantColor),
        isLight: isLightColor(rgbArrayToHex(dominantColor)),
        name: getColorName(rgbArrayToHex(dominantColor))
      },
      // Add some variations for the palette
      ...generateColorVariations(dominantColor)
    ];
    
    // Create the color palette
    return createPalette(colors);
  } catch (error) {
    console.error('Error extracting colors:', error);
    // Return a default palette if the extraction fails
    return createDefaultPalette();
  }
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