import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

const CyberWaves: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { colors } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;
    const waves: { x: number; y: number; radius: number; speed: number }[] = [];
    
    // Create initial waves
    for (let i = 0; i < 5; i++) {
      waves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 100 + 50,
        speed: Math.random() * 0.02 + 0.01
      });
    }

    const animate = () => {
      ctx.fillStyle = `${colors.background}40`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave, index) => {
        const x = wave.x + Math.cos(time * wave.speed) * 50;
        const y = wave.y + Math.sin(time * wave.speed) * 50;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, wave.radius);
        gradient.addColorStop(0, `${colors.primary}20`);
        gradient.addColorStop(0.5, `${colors.primary}10`);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, wave.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      time += 0.05;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [colors]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.3 }}
    />
  );
};

export default CyberWaves;
