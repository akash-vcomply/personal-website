import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface Target {
  x: number;
  y: number;
  size: number;
  id: number;
  hit: boolean;
}

const TargetGame: React.FC = () => {
  const { colors } = useTheme();
  const [score, setScore] = useState(0);
  const [targets, setTargets] = useState<Target[]>([]);
  const [gameActive, setGameActive] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number>();
  const targetIdCounter = useRef(0);

  const spawnTarget = () => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    
    const newTarget: Target = {
      x: Math.random() * (width - 50),
      y: Math.random() * (height - 50),
      size: Math.random() * 20 + 30,
      id: targetIdCounter.current++,
      hit: false
    };

    setTargets(prev => [...prev, newTarget]);
  };

  const handleTargetClick = (targetId: number) => {
    setTargets(prev => prev.map(target => 
      target.id === targetId ? { ...target, hit: true } : target
    ));
    setScore(prev => prev + 100);
  };

  useEffect(() => {
    if (gameActive) {
      const spawnInterval = setInterval(spawnTarget, 1000);
      gameLoopRef.current = window.setInterval(() => {
        setTargets(prev => prev.filter(target => !target.hit));
      }, 100);

      return () => {
        clearInterval(spawnInterval);
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      };
    }
  }, [gameActive]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score]);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTargets([]);
  };

  const stopGame = () => {
    setGameActive(false);
    if (score > highScore) {
      setHighScore(score);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full h-full max-w-4xl max-h-[80vh] mx-4" ref={containerRef}>
        <div className="absolute top-4 right-4 flex gap-4 z-10">
          <div className="px-4 py-2 rounded bg-gray-800 text-neon-pink font-cyber">
            Score: {score}
          </div>
          <div className="px-4 py-2 rounded bg-gray-800 text-neon-blue font-cyber">
            High Score: {highScore}
          </div>
        </div>

        <button
          onClick={gameActive ? stopGame : startGame}
          className="absolute top-4 left-4 px-6 py-2 rounded bg-neon-pink text-black font-cyber hover:bg-neon-pink-bright transition-colors z-10"
        >
          {gameActive ? 'Stop Game' : 'Start Game'}
        </button>

        <AnimatePresence>
          {targets.map(target => (
            <motion.div
              key={target.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{
                position: 'absolute',
                left: target.x,
                top: target.y,
                width: target.size,
                height: target.size,
                cursor: 'crosshair'
              }}
              onClick={() => !target.hit && handleTargetClick(target.id)}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={colors.accent}
                  strokeWidth="2"
                  className="animate-pulse"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="none"
                  stroke={colors.accentLight}
                  strokeWidth="2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="15"
                  fill={colors.accent}
                  className="animate-ping"
                />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TargetGame;
