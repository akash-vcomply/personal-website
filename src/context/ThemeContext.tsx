import React, { createContext, useContext, useState, useCallback } from 'react';

export type CursorStyle = {
  name: string;
  color: string;
  particleCount: number;
  particleSize: number;
  speed: number;
};

type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  accentLight: string;
  background: string;
  surface: string;
  text: string;
  glow: string;
};

type Theme = {
  name: string;
  colors: ThemeColors;
  cursorStyle: CursorStyle;
  isDark: boolean;
  isCyberpunk: boolean;
};

type ThemeContextType = {
  theme: Theme;
  colors: ThemeColors;
  cursorStyle: CursorStyle;
  isDark: boolean;
  isCyberpunk: boolean;
  cycleTheme: () => void;
  setCursorStyle: (style: CursorStyle) => void;
  toggleTheme: () => void;
  toggleCyberpunk: () => void;
};

const themes: Theme[] = [
  {
    name: 'Neon Pink',
    colors: {
      primary: '#ff0080',
      secondary: '#7928ca',
      accent: '#00ffff',
      accentLight: '#80ffff',
      background: '#0a0a0a',
      surface: '#1a1a1a',
      text: '#ffffff',
      glow: '#ff008080'
    },
    cursorStyle: {
      name: 'hex',
      color: '#ff0080',
      particleCount: 50,
      particleSize: 2,
      speed: 2
    },
    isDark: true,
    isCyberpunk: true
  },
  {
    name: 'Matrix Green',
    colors: {
      primary: '#00ff00',
      secondary: '#008000',
      accent: '#80ff80',
      accentLight: '#c0ffc0',
      background: '#001a00',
      surface: '#002600',
      text: '#00ff00',
      glow: '#00ff0080'
    },
    cursorStyle: {
      name: 'matrix',
      color: '#00ff00',
      particleCount: 100,
      particleSize: 1,
      speed: 3
    },
    isDark: true,
    isCyberpunk: true
  },
  {
    name: 'Quantum Blue',
    colors: {
      primary: '#00ffff',
      secondary: '#0080ff',
      accent: '#80ffff',
      accentLight: '#c0ffff',
      background: '#001a1a',
      surface: '#002626',
      text: '#ffffff',
      glow: '#00ffff80'
    },
    cursorStyle: {
      name: 'quantum',
      color: '#00ffff',
      particleCount: 75,
      particleSize: 1.5,
      speed: 2.5
    },
    isDark: true,
    isCyberpunk: true
  },
  {
    name: 'Cyber Gold',
    colors: {
      primary: '#ffd700',
      secondary: '#ff8c00',
      accent: '#ffe680',
      accentLight: '#fff2b3',
      background: '#1a1a00',
      surface: '#262600',
      text: '#ffffff',
      glow: '#ffd70080'
    },
    cursorStyle: {
      name: 'neural',
      color: '#ffd700',
      particleCount: 60,
      particleSize: 2,
      speed: 1.5
    },
    isDark: true,
    isCyberpunk: true
  },
  {
    name: 'Plasma Purple',
    colors: {
      primary: '#b14aed',
      secondary: '#7928ca',
      accent: '#d894ff',
      accentLight: '#e6b3ff',
      background: '#1a001a',
      surface: '#260026',
      text: '#ffffff',
      glow: '#b14aed80'
    },
    cursorStyle: {
      name: 'cyber',
      color: '#b14aed',
      particleCount: 80,
      particleSize: 1.8,
      speed: 2
    },
    isDark: true,
    isCyberpunk: true
  }
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const currentTheme = themes[currentThemeIndex];

  const cycleTheme = useCallback(() => {
    setCurrentThemeIndex((prev) => (prev + 1) % themes.length);
  }, []);

  const setCursorStyle = useCallback((style: CursorStyle) => {
    themes[currentThemeIndex].cursorStyle = style;
    setCurrentThemeIndex(currentThemeIndex);
  }, [currentThemeIndex]);

  const toggleTheme = useCallback(() => {
    themes[currentThemeIndex].isDark = !themes[currentThemeIndex].isDark;
    setCurrentThemeIndex(currentThemeIndex);
  }, [currentThemeIndex]);

  const toggleCyberpunk = useCallback(() => {
    themes[currentThemeIndex].isCyberpunk = !themes[currentThemeIndex].isCyberpunk;
    setCurrentThemeIndex(currentThemeIndex);
  }, [currentThemeIndex]);

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        colors: currentTheme.colors,
        cursorStyle: currentTheme.cursorStyle,
        isDark: currentTheme.isDark,
        isCyberpunk: currentTheme.isCyberpunk,
        cycleTheme,
        setCursorStyle,
        toggleTheme,
        toggleCyberpunk
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
