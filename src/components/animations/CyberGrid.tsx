import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

const CyberGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { colors } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Grid configuration
    const gridSize = 50;
    const lineWidth = 1;
    let offset = 0;
    const speed = 0.5;

    // Parse color values
    const parseColor = (color: string) => {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return { r, g, b };
    };

    const primaryColor = parseColor(colors.primary);
    const accentColor = parseColor(colors.accent);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update offset
      offset = (offset + speed) % gridSize;

      // Draw horizontal lines
      for (let y = offset; y < canvas.height; y += gridSize) {
        const progress = (y + offset) / canvas.height;
        const alpha = Math.max(0.1, 1 - progress);
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.strokeStyle = `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${alpha * 0.3})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }

      // Draw vertical lines
      for (let x = offset; x < canvas.width; x += gridSize) {
        const progress = x / canvas.width;
        const alpha = Math.max(0.1, 1 - progress);
        
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.strokeStyle = `rgba(${accentColor.r}, ${accentColor.g}, ${accentColor.b}, ${alpha * 0.3})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }

      // Draw perspective lines
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);

      for (let radius = offset; radius < maxRadius; radius += gridSize) {
        const progress = radius / maxRadius;
        const alpha = Math.max(0.1, 1 - progress);

        // Draw circles
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${alpha * 0.2})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        // Draw radial lines
        const segments = 16;
        for (let i = 0; i < segments; i++) {
          const angle = (i * Math.PI * 2) / segments;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = `rgba(${accentColor.r}, ${accentColor.g}, ${accentColor.b}, ${alpha * 0.1})`;
          ctx.lineWidth = lineWidth;
          ctx.stroke();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [colors]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default CyberGrid;
