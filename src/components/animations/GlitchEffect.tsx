import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface GlitchEffectProps {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
  isActive?: boolean;
  onHover?: boolean;
  duration?: number;
  className?: string;
}

const GlitchEffect: React.FC<GlitchEffectProps> = ({
  children,
  intensity = 'medium',
  isActive = false,
  onHover = false,
  duration = 2,
  className = ''
}) => {
  const { colors } = useTheme();
  const [isGlitching, setIsGlitching] = useState(isActive);
  const [glitchKey, setGlitchKey] = useState(0);

  // Intensity settings
  const intensitySettings = {
    low: { offset: 2, interval: 4000, probability: 0.2 },
    medium: { offset: 4, interval: 3000, probability: 0.4 },
    high: { offset: 6, interval: 2000, probability: 0.6 }
  };

  const { offset, interval, probability } = intensitySettings[intensity];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const triggerGlitch = () => {
      if (Math.random() < probability) {
        setIsGlitching(true);
        setGlitchKey(prev => prev + 1);
        
        timeoutId = setTimeout(() => {
          setIsGlitching(false);
        }, duration * 1000);
      }
    };

    if (isActive) {
      const intervalId = setInterval(triggerGlitch, interval);
      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [isActive, intensity, duration, probability, interval]);

  const handleMouseEnter = () => {
    if (onHover) {
      setIsGlitching(true);
      setGlitchKey(prev => prev + 1);
    }
  };

  const handleMouseLeave = () => {
    if (onHover) {
      setIsGlitching(false);
    }
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={glitchKey}
          initial={{ opacity: 1 }}
          animate={{
            opacity: isGlitching ? [1, 0.8, 1, 0.9, 1] : 1,
            x: isGlitching ? [0, offset, -offset, offset/2, 0] : 0,
            y: isGlitching ? [0, -offset/2, offset/2, -offset, 0] : 0,
          }}
          transition={{
            duration: isGlitching ? duration : 0,
            times: [0, 0.2, 0.4, 0.6, 1],
            ease: "easeInOut"
          }}
          style={{
            textShadow: isGlitching 
              ? `${offset/2}px 0 ${colors.accent}, -${offset/2}px 0 ${colors.primary}`
              : 'none'
          }}
        >
          {children}
        </motion.div>

        {isGlitching && (
          <>
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, x: -offset }}
              animate={{ 
                opacity: [0, 0.3, 0],
                x: [-offset, 0, offset]
              }}
              transition={{ duration: duration / 2, ease: "linear" }}
              style={{
                color: colors.accent,
                clipPath: 'polygon(0 25%, 100% 25%, 100% 30%, 0 30%)',
                zIndex: -1
              }}
            >
              {children}
            </motion.div>
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, x: offset }}
              animate={{ 
                opacity: [0, 0.3, 0],
                x: [offset, 0, -offset]
              }}
              transition={{ duration: duration / 2, delay: duration / 2, ease: "linear" }}
              style={{
                color: colors.primary,
                clipPath: 'polygon(0 45%, 100% 45%, 100% 50%, 0 50%)',
                zIndex: -1
              }}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlitchEffect;
