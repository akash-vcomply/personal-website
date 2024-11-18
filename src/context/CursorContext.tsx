import React, { createContext, useContext, useState } from 'react';

export interface CursorStyle {
  name: string;
  config: {
    baseSize: number;
    particleCount: number;
    useHexagon?: boolean;
    useScanline?: boolean;
    useTrails?: boolean;
    rotationSpeed?: number;
    particleColors?: string[];
    trailLength?: number;
    customShape?: 'neural' | 'quantum' | 'matrix';
  };
}

interface CursorContextType {
  currentStyle: CursorStyle;
  setStyle: (style: string) => void;
}

const defaultStyle: CursorStyle = {
  name: 'hex',
  config: {
    baseSize: 12,
    particleCount: 50,
    useHexagon: true,
    useScanline: true,
    useTrails: true,
    rotationSpeed: 2,
    particleColors: ['#ff00ff', '#00ffff', '#ffff00'],
    trailLength: 8
  }
};

const styles: Record<string, CursorStyle> = {
  hex: defaultStyle,
  neural: {
    name: 'neural',
    config: {
      baseSize: 8,
      particleCount: 30,
      useHexagon: false,
      useScanline: false,
      useTrails: true,
      rotationSpeed: 1.5,
      particleColors: ['#00ffff', '#ff00ff'],
      trailLength: 6,
      customShape: 'neural'
    }
  },
  quantum: {
    name: 'quantum',
    config: {
      baseSize: 10,
      particleCount: 40,
      useHexagon: false,
      useScanline: true,
      useTrails: true,
      rotationSpeed: 3,
      particleColors: ['#ffff00', '#00ffff'],
      trailLength: 10,
      customShape: 'quantum'
    }
  },
  matrix: {
    name: 'matrix',
    config: {
      baseSize: 15,
      particleCount: 60,
      useHexagon: false,
      useScanline: true,
      useTrails: true,
      rotationSpeed: 1,
      particleColors: ['#00ff00', '#00cc00', '#009900'],
      trailLength: 12,
      customShape: 'matrix'
    }
  }
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStyle, setCurrentStyle] = useState<CursorStyle>(defaultStyle);

  const setStyle = (styleName: string) => {
    const newStyle = styles[styleName];
    if (newStyle) {
      setCurrentStyle(newStyle);
    }
  };

  return (
    <CursorContext.Provider
      value={{
        currentStyle,
        setStyle
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
