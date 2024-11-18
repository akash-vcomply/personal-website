import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface CyberTextProps {
  text: string;
  className?: string;
  glowIntensity?: 'low' | 'medium' | 'high';
}

const CyberText: React.FC<CyberTextProps> = ({ 
  text, 
  className = '', 
  glowIntensity = 'medium' 
}) => {
  const { colors } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Split text into array of characters
  const characters = text.split('');

  // Glow intensity values
  const glowValues = {
    low: 2,
    medium: 4,
    high: 6
  };

  // Random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * characters.length);
      setHoveredIndex(randomIndex);
      setTimeout(() => setHoveredIndex(null), 150);
    }, 3000);

    return () => clearInterval(interval);
  }, [characters.length]);

  return (
    <div className={`flex flex-wrap ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            delay: index * 0.03,
            type: 'spring',
            stiffness: 100
          }}
          whileHover={{ 
            scale: 1.2,
            color: colors.accent,
            transition: { duration: 0.2 }
          }}
          style={{
            color: hoveredIndex === index ? colors.accent : colors.primary,
            textShadow: hoveredIndex === index 
              ? `0 0 ${glowValues[glowIntensity]}px ${colors.glow}`
              : 'none',
            cursor: 'default',
            display: 'inline-block',
            transition: 'color 0.3s ease, text-shadow 0.3s ease'
          }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};

export default CyberText;
