import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const ThemeController: React.FC = () => {
  const { colors, isDark, isCyberpunk, toggleTheme, toggleCyberpunk } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
          isCyberpunk
            ? 'bg-cyber-black text-neon-pink border border-neon-pink shadow-[0_0_10px_rgba(255,0,255,0.3)]'
            : isDark
            ? 'bg-gray-800 text-gray-100 hover:bg-gray-700'
            : 'bg-white text-gray-800 hover:bg-gray-100'
        }`}
      >
        Theme
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
          >
            <div className="py-1">
              <button
                onClick={() => {
                  toggleTheme();
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${
                  isDark ? 'text-gray-100' : 'text-gray-800'
                } hover:bg-gray-700 transition-colors duration-150`}
              >
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button
                onClick={() => {
                  toggleCyberpunk();
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${
                  isCyberpunk ? 'text-neon-pink' : 'text-gray-100'
                } hover:bg-gray-700 transition-colors duration-150`}
              >
                {isCyberpunk ? 'Professional Mode' : 'Cyberpunk Mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeController;
