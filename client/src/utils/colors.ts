/**
 * Colors utility for consistent access to the site's color palette
 * This centralizes the color definitions and makes it easier to use them throughout the app
 */

// Beach-inspired luxury color palette 
export const COLORS = {
  // Primary palette
  primary: 'var(--primary)', // Ocean Blue (#0077B6)
  primaryForeground: 'var(--primary-foreground)',
  
  secondary: 'var(--secondary)', // Golden Sand (#F6E27F)
  secondaryForeground: 'var(--secondary-foreground)',
  
  accent: 'var(--accent)', // Warm Coral (#F26B6B)
  accentForeground: 'var(--accent-foreground)',
  
  // Background and text
  background: 'var(--background)', // Soft Ivory (#FAF9F6)
  foreground: 'var(--foreground)', // Deep Teal (#004E64)
  
  // UI components
  muted: 'var(--muted)', // Driftwood Gray (#A9A9A9)
  mutedForeground: 'var(--muted-foreground)',
  
  card: 'var(--card)',
  cardForeground: 'var(--card-foreground)',
  
  popover: 'var(--popover)',
  popoverForeground: 'var(--popover-foreground)',
  
  border: 'var(--border)', // Palm Green (#88B04B)
  input: 'var(--input)',
  ring: 'var(--ring)',
  
  // Status colors
  destructive: 'var(--destructive)', // Warm Coral (#F26B6B)
  destructiveForeground: 'var(--destructive-foreground)',
  
  success: 'var(--success)', // Palm Green (#88B04B)
  successForeground: 'var(--success-foreground)',
  
  warning: 'var(--warning)', // Golden Sand (#F6E27F)
  warningForeground: 'var(--warning-foreground)',
  
  info: 'var(--info)', // Sunset Peach (#F8C8DC)
  infoForeground: 'var(--info-foreground)',
};

// Tailwind class mapping for common colors
export const TAILWIND_CLASSES = {
  // Background colors
  bgPrimary: 'bg-primary',
  bgSecondary: 'bg-secondary',
  bgAccent: 'bg-accent',
  bgMuted: 'bg-muted',
  bgBackground: 'bg-background',
  bgCard: 'bg-card',
  
  // Text colors
  textPrimary: 'text-primary',
  textSecondary: 'text-secondary',
  textAccent: 'text-accent',
  textMuted: 'text-muted-foreground',
  textForeground: 'text-foreground',
  
  // Border colors
  borderPrimary: 'border-primary',
  borderSecondary: 'border-secondary',
  borderAccent: 'border-accent',
  borderMuted: 'border-muted',
  
  // Button styles
  buttonPrimary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  buttonSecondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
  buttonAccent: 'bg-accent text-accent-foreground hover:bg-accent/90',
  buttonDestructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  
  // Status colors
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  error: 'bg-destructive text-destructive-foreground',
  info: 'bg-info text-info-foreground',
};

// Common style objects for inline styling
export const STYLE_OBJECTS = {
  primaryBg: { backgroundColor: COLORS.primary },
  primaryText: { color: COLORS.primary },
  primaryBorder: { borderColor: COLORS.primary },
  
  secondaryBg: { backgroundColor: COLORS.secondary },
  secondaryText: { color: COLORS.secondary },
  secondaryBorder: { borderColor: COLORS.secondary },
  
  accentBg: { backgroundColor: COLORS.accent },
  accentText: { color: COLORS.accent },
  accentBorder: { borderColor: COLORS.accent },
  
  // Compound styles
  primaryButton: { 
    backgroundColor: COLORS.primary, 
    color: COLORS.primaryForeground 
  },
  
  secondaryButton: { 
    backgroundColor: COLORS.secondary, 
    color: COLORS.secondaryForeground 
  },
  
  accentButton: { 
    backgroundColor: COLORS.accent, 
    color: COLORS.accentForeground 
  },
  
  card: {
    backgroundColor: COLORS.card,
    color: COLORS.cardForeground,
    borderColor: COLORS.border
  }
};

// Color opacity variants (with alpha)
export const getColorWithOpacity = (colorVar: string, opacity: number): string => {
  // Make sure opacity is between 0 and 1
  const alpha = Math.max(0, Math.min(1, opacity));
  
  // For CSS variables, we can use RGB function with the opacity
  return `rgb(var(${colorVar}-rgb) / ${alpha})`;
};

// Function to get a color from the palette using the CSS variable
export const getColor = (colorName: keyof typeof COLORS): string => {
  return COLORS[colorName];
};

// Function to get a Tailwind class for a color
export const getTailwindClass = (className: keyof typeof TAILWIND_CLASSES): string => {
  return TAILWIND_CLASSES[className];
};

// Function to get a style object for a color
export const getStyleObject = (styleName: keyof typeof STYLE_OBJECTS): React.CSSProperties => {
  return STYLE_OBJECTS[styleName];
};