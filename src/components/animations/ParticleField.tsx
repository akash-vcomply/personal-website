import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  originalSize: number;
}

const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { colors } = useTheme();
  const particles = useRef<Particle[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>();
  const dpr = useRef(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with DPI scaling
    const setCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      canvas.width = Math.floor(width * dpr.current);
      canvas.height = Math.floor(height * dpr.current);
      
      ctx.scale(dpr.current, dpr.current);
      
      initParticles();
    };

    // Track mouse position with DPI scaling
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.current = {
        x: (e.clientX - rect.left) * (canvas.width / rect.width) / dpr.current,
        y: (e.clientY - rect.top) * (canvas.height / rect.height) / dpr.current
      };
    };

    // Initialize particles
    const initParticles = () => {
      const width = canvas.width / dpr.current;
      const height = canvas.height / dpr.current;
      const particleCount = Math.min(Math.floor((width * height) / 15000), 100);
      
      particles.current = [];
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          dx: (Math.random() - 0.5) * 0.5,
          dy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          originalSize: Math.random() * 2 + 1
        });
      }
    };

    const animate = () => {
      if (!ctx) return;
      
      const width = canvas.width / dpr.current;
      const height = canvas.height / dpr.current;

      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particles.current.forEach(particle => {
        // Move particle
        particle.x += particle.dx;
        particle.y += particle.dy;

        // Wrap around screen
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        // Calculate distance to mouse
        const dx = mousePosition.current.x - particle.x;
        const dy = mousePosition.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Particle size based on mouse proximity
        const maxDistance = 100;
        if (distance < maxDistance) {
          particle.size = particle.originalSize * (1 + (maxDistance - distance) / maxDistance);
        } else {
          particle.size = particle.originalSize;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = colors.primary;
        ctx.fill();

        // Draw connections
        particles.current.forEach(otherParticle => {
          const dx2 = otherParticle.x - particle.x;
          const dy2 = otherParticle.y - particle.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (distance2 < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `${colors.primary}${Math.floor((1 - distance2 / 100) * 255).toString(16).padStart(2, '0')}`;
            ctx.stroke();
          }
        });
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [colors.primary]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 50 }}
    />
  );
};

export default ParticleField;
