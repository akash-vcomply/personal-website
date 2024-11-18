import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface GlitchTextProps {
  text: string;
  delay?: number;
  className?: string;
  glitchInterval?: number;
  intensity?: 'low' | 'medium' | 'high';
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  delay = 0,
  className = '',
  glitchInterval = 3000,
  intensity = 'medium'
}) => {
  const { colors } = useTheme();
  const controls = useAnimation();
  const [isGlitching, setIsGlitching] = useState(false);

  const glitchIntensityConfig = {
    low: { probability: 0.3, duration: 50, offset: 2 },
    medium: { probability: 0.5, duration: 100, offset: 3 },
    high: { probability: 0.7, duration: 150, offset: 5 }
  };

  const config = glitchIntensityConfig[intensity];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const startGlitchEffect = async () => {
      await new Promise(resolve => setTimeout(resolve, delay));
      
      const glitchLoop = () => {
        if (Math.random() < config.probability) {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), config.duration);
        }
        timeout = setTimeout(glitchLoop, glitchInterval + Math.random() * 1000);
      };
      
      glitchLoop();
    };

    startGlitchEffect();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [delay, glitchInterval, config.probability, config.duration]);

  const getGlitchText = () => {
    if (!isGlitching) return text;

    const glitchChars = '!@#$%^&*<>[]{}|=+?';
    let result = '';
    for (let i = 0; i < text.length; i++) {
      if (Math.random() < 0.3) {
        result += glitchChars[Math.floor(Math.random() * glitchChars.length)];
      } else {
        result += text[i];
      }
    }
    return result;
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div
        animate={controls}
        className="relative"
        style={{ color: colors.primary }}
      >
        {isGlitching && (
          <>
            <div
              className="absolute"
              style={{
                left: `${Math.random() * config.offset}px`,
                color: colors.accent,
                clipPath: 'inset(0 0 50% 0)',
                transform: `translateX(${(Math.random() - 0.5) * config.offset}px)`,
                opacity: 0.8,
                mixBlendMode: 'screen'
              }}
            >
              {getGlitchText()}
            </div>
            <div
              className="absolute"
              style={{
                left: `${-Math.random() * config.offset}px`,
                color: colors.secondary,
                clipPath: 'inset(50% 0 0 0)',
                transform: `translateX(${(Math.random() - 0.5) * config.offset}px)`,
                opacity: 0.8,
                mixBlendMode: 'screen'
              }}
            >
              {getGlitchText()}
            </div>
          </>
        )}
        <span>{text}</span>
      </motion.div>
    </div>
  );
};

export default GlitchText;
