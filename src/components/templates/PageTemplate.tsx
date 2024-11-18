import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import CyberGrid from '../animations/CyberGrid';
import GlitchEffect from '../animations/GlitchEffect';

interface PageTemplateProps {
  title: string;
  children: React.ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ title, children }) => {
  const { colors } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative"
      style={{ background: colors.background }}
    >
      <CyberGrid />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <GlitchEffect intensity="medium" className="mb-8">
          <h1 
            className="text-4xl font-bold"
            style={{ color: colors.primary }}
          >
            {title}
          </h1>
        </GlitchEffect>

        <div className="mt-8">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default PageTemplate;
