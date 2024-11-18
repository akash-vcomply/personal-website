import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import GlitchText from './animations/GlitchText';

const ThemeToggle: React.FC = () => {
  const { theme, colors, cycleTheme } = useTheme();

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={cycleTheme}
        className="relative p-4 rounded-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: `${colors.surface}80`,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${colors.primary}40`,
          boxShadow: `0 0 20px ${colors.glow}`
        }}
      >
        {/* Theme Name */}
        <GlitchText
          text={theme.name}
          className="text-sm font-medium"
          intensity="low"
        />

        {/* Color Preview */}
        <div className="flex items-center justify-center mt-2 space-x-1">
          {Object.entries(colors)
            .filter(([key]) => ['primary', 'secondary', 'accent'].includes(key))
            .map(([key, color]) => (
              <motion.div
                key={key}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
                whileHover={{ scale: 1.2 }}
              />
            ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner Accents */}
          <div
            className="absolute top-0 left-0 w-2 h-2"
            style={{ borderTop: `2px solid ${colors.primary}`, borderLeft: `2px solid ${colors.primary}` }}
          />
          <div
            className="absolute top-0 right-0 w-2 h-2"
            style={{ borderTop: `2px solid ${colors.primary}`, borderRight: `2px solid ${colors.primary}` }}
          />
          <div
            className="absolute bottom-0 left-0 w-2 h-2"
            style={{ borderBottom: `2px solid ${colors.primary}`, borderLeft: `2px solid ${colors.primary}` }}
          />
          <div
            className="absolute bottom-0 right-0 w-2 h-2"
            style={{ borderBottom: `2px solid ${colors.primary}`, borderRight: `2px solid ${colors.primary}` }}
          />
        </div>

        {/* Hover Effect */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}00, ${colors.accent}00)`,
            opacity: 0
          }}
          whileHover={{
            opacity: 0.1,
            transition: { duration: 0.3 }
          }}
        />
      </motion.button>
    </motion.div>
  );
};

export default ThemeToggle;
