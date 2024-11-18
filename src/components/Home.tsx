import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import GlitchText from './animations/GlitchText';
import CyberGrid from './animations/CyberGrid';
import CyberCursor from './animations/CyberCursor';
import ParticleField from './animations/ParticleField';

const Home: React.FC = () => {
  const { theme, colors } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <ParticleField />
          <CyberGrid />
          <CyberCursor />
          {/* Main Content */}
          <div className="space-y-8">
            {/* Header */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <GlitchText
                text="AKASH PATIL"
                className="text-6xl font-bold"
                intensity="high"
              />
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ color: colors.secondary }}
                className="text-2xl"
              >
                Full Stack Developer & UI/UX Designer
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg max-w-2xl"
              style={{ color: colors.text }}
            >
              Crafting digital experiences at the intersection of design and technology. 
              Specializing in modern web applications, interactive experiences, and cyberpunk aesthetics.
            </motion.p>

            {/* Tech Stack */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              {['React', 'TypeScript', 'Node.js', 'Next.js', 'TailwindCSS', 'Three.js'].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    delay: 1 + index * 0.1
                  }}
                  className="px-4 py-2 rounded-full text-sm"
                  style={{
                    background: `${colors.primary}20`,
                    border: `1px solid ${colors.primary}40`,
                    color: colors.primary
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="inline-block px-6 py-3 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                    color: colors.text,
                    boxShadow: `0 0 20px ${colors.glow}`
                  }}
                >
                  Get in Touch
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/projects"
                  className="inline-block px-6 py-3 rounded-lg"
                  style={{
                    background: `${colors.surface}`,
                    border: `1px solid ${colors.primary}40`,
                    color: colors.primary
                  }}
                >
                  View Projects
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Grid Lines */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, ${colors.primary}10 1px, transparent 1px),
                  linear-gradient(to bottom, ${colors.primary}10 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />

            {/* Corner Accents */}
            {[
              'top-0 left-0 bg-gradient-to-br',
              'top-0 right-0 bg-gradient-to-bl',
              'bottom-0 left-0 bg-gradient-to-tr',
              'bottom-0 right-0 bg-gradient-to-tl'
            ].map((position, index) => (
              <div
                key={index}
                className={`absolute w-32 h-32 ${position}`}
                style={{
                  background: `radial-gradient(circle at center, ${colors.glow}20 0%, transparent 70%)`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
