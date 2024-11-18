import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import GlitchText from '../animations/GlitchText';
import { CursorStyle } from '../../context/ThemeContext';

const CursorController: React.FC = () => {
  const { theme, colors, setCursorStyle } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const cursorStyles: CursorStyle[] = [
    {
      name: 'hex',
      color: colors.primary,
      particleCount: 50,
      particleSize: 2,
      speed: 2
    },
    {
      name: 'neural',
      color: colors.accent,
      particleCount: 60,
      particleSize: 2,
      speed: 1.5
    },
    {
      name: 'quantum',
      color: colors.secondary,
      particleCount: 75,
      particleSize: 1.5,
      speed: 2.5
    },
    {
      name: 'matrix',
      color: colors.primary,
      particleCount: 100,
      particleSize: 1,
      speed: 3
    },
    {
      name: 'cyber',
      color: colors.accent,
      particleCount: 80,
      particleSize: 1.8,
      speed: 2
    }
  ];

  return (
    <motion.div
      className="fixed bottom-8 left-8 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
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
        <GlitchText
          text={`Cursor: ${theme.cursorStyle.name}`}
          className="text-sm font-medium"
          intensity="low"
        />

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
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full mb-4 left-0"
            style={{
              background: `${colors.surface}80`,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${colors.primary}40`,
              boxShadow: `0 0 20px ${colors.glow}`
            }}
          >
            <div className="p-4 space-y-2">
              {cursorStyles.map((style) => (
                <motion.button
                  key={style.name}
                  onClick={() => {
                    setCursorStyle(style);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 rounded flex items-center justify-between"
                  whileHover={{
                    backgroundColor: `${colors.primary}20`,
                    transition: { duration: 0.2 }
                  }}
                  style={{
                    color: theme.cursorStyle.name === style.name ? colors.primary : colors.text
                  }}
                >
                  <span className="capitalize">{style.name}</span>
                  {theme.cursorStyle.name === style.name && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: colors.primary }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CursorController;
