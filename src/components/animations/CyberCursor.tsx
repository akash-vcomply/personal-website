import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

const CyberCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { colors, cursorStyle } = useTheme();
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number; life: number }>>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      addParticles();
    };
    window.addEventListener('mousemove', handleMouseMove);

    const addParticles = () => {
      const particleCount = cursorStyle.name === 'matrix' ? 15 : 5;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = cursorStyle.name === 'quantum' ? 2 + Math.random() * 2 : 1;
        particlesRef.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: cursorStyle.name === 'hex' ? 6 : 3,
          life: 1
        });
      }
    };

    const drawHexagon = (x: number, y: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 * i) / 6;
        const px = x + Math.cos(angle) * size;
        const py = y + Math.sin(angle) * size;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.02;

        if (particle.life <= 0) return false;

        ctx.beginPath();
        switch (cursorStyle.name) {
          case 'hex':
            drawHexagon(particle.x, particle.y, particle.size * particle.life);
            break;
          case 'neural':
            ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
            break;
          case 'quantum':
            ctx.rect(particle.x - particle.size/2, particle.y - particle.size/2, 
                    particle.size * particle.life, particle.size * particle.life);
            break;
          case 'matrix':
            ctx.fillStyle = `rgba(0, 255, 0, ${particle.life})`;
            ctx.fillText(String.fromCharCode(0x30A0 + Math.random() * 96),
                        particle.x, particle.y);
            break;
          default:
            ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
        }

        if (cursorStyle.name !== 'matrix') {
          ctx.fillStyle = `rgba(${parseInt(colors.primary.slice(1, 3), 16)}, 
                               ${parseInt(colors.primary.slice(3, 5), 16)}, 
                               ${parseInt(colors.primary.slice(5, 7), 16)}, 
                               ${particle.life})`;
          ctx.fill();
        }

        return true;
      });

      // Draw main cursor
      ctx.beginPath();
      switch (cursorStyle.name) {
        case 'hex':
          drawHexagon(mouseRef.current.x, mouseRef.current.y, 12);
          break;
        case 'neural':
          ctx.arc(mouseRef.current.x, mouseRef.current.y, 8, 0, Math.PI * 2);
          break;
        case 'quantum':
          ctx.rect(mouseRef.current.x - 6, mouseRef.current.y - 6, 12, 12);
          break;
        case 'matrix':
          ctx.font = '20px monospace';
          ctx.fillStyle = colors.primary;
          ctx.fillText('>', mouseRef.current.x, mouseRef.current.y);
          break;
        default:
          ctx.arc(mouseRef.current.x, mouseRef.current.y, 8, 0, Math.PI * 2);
      }
      
      ctx.fillStyle = colors.primary;
      ctx.fill();
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 2;
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [colors, cursorStyle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default CyberCursor;
