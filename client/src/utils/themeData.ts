// Theme data to be imported directly instead of fetched

export const beachTheme = {
  variant: "professional",
  primary: "hsl(199, 100%, 36%)",
  appearance: "light",
  radius: 0.5
};

export const tealTheme = {
  variant: "professional",
  primary: "hsl(174, 77%, 29%)",
  appearance: "light",
  radius: 0.5
};

export const burgundyTheme = {
  variant: "professional",
  primary: "hsl(345, 77%, 29%)",
  appearance: "light",
  radius: 0.5
};

export const emeraldTheme = {
  variant: "professional",
  primary: "hsl(152, 77%, 29%)",
  appearance: "light",
  radius: 0.5
};

export const purpleTheme = {
  variant: "professional",
  primary: "hsl(270, 77%, 29%)",
  appearance: "light",
  radius: 0.5
};

export const royalBlueTheme = {
  variant: "professional",
  primary: "hsl(214, 77%, 29%)",
  appearance: "light",
  radius: 0.5
};

// Theme definitions with extended palette information
export const themeDefinitions = [
  { 
    name: 'Beach Paradise', 
    file: 'theme-beach.json', 
    primary: 'hsl(199, 100%, 36%)', // Ocean Blue
    secondary: '#F6E27F', // Golden Sand
    accent: '#F26B6B',    // Warm Coral
    data: beachTheme
  },
  { 
    name: 'Teal Gold', 
    file: 'theme.json', 
    primary: 'hsl(174, 77%, 29%)',
    secondary: '#D4AF37', // Gold
    accent: '#103556',    // Dark blue
    data: tealTheme
  },
  { 
    name: 'Burgundy Gold', 
    file: 'theme-burgundy.json', 
    primary: 'hsl(345, 77%, 29%)',
    secondary: '#D4AF37', // Gold
    accent: '#2A1215',    // Dark burgundy
    data: burgundyTheme
  },
  { 
    name: 'Emerald Gold', 
    file: 'theme-emerald.json', 
    primary: 'hsl(152, 77%, 29%)',
    secondary: '#D4AF37', // Gold
    accent: '#0F3D30',    // Dark green
    data: emeraldTheme
  },
  { 
    name: 'Purple Gold', 
    file: 'theme-purple.json', 
    primary: 'hsl(270, 77%, 29%)',
    secondary: '#D4AF37', // Gold
    accent: '#2A1042',    // Dark purple
    data: purpleTheme
  },
  { 
    name: 'Royal Blue Gold', 
    file: 'theme-royal-blue.json', 
    primary: 'hsl(214, 77%, 29%)',
    secondary: '#D4AF37', // Gold
    accent: '#0A2A4D',    // Dark blue
    data: royalBlueTheme
  }
];