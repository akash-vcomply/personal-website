import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface CyberObject {
  x: number;
  y: number;
  size: number;
  type: 'dataCore' | 'energyOrb' | 'holoShard' | 'hexagon' | 'circuit' | 'data' | 'energy';
  rotation: number;
  alpha: number;
  hovered: boolean;
  exploding: boolean;
  explosionProgress: number;
  velocity: { x: number; y: number };
  pulsePhase?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface LaserBeam {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  life: number;
}

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const objectsRef = useRef<CyberObject[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const lasersRef = useRef<LaserBeam[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const { colors } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    ctx.current = canvas.getContext('2d');
    if (!ctx.current) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const generateObjects = () => {
      const objects: CyberObject[] = [];
      
      // Regular background objects
      const backgroundTypes: ('hexagon' | 'circuit' | 'data' | 'energy')[] = ['hexagon', 'circuit', 'data', 'energy'];
      for (let i = 0; i < 8; i++) {
        objects.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 20 + Math.random() * 30,
          type: backgroundTypes[Math.floor(Math.random() * backgroundTypes.length)],
          rotation: Math.random() * Math.PI * 2,
          alpha: 0.3 + Math.random() * 0.3,
          hovered: false,
          exploding: false,
          explosionProgress: 0,
          velocity: { x: 0, y: 0 }
        });
      }

      // Add interactive cyber objects
      const cyberTypes: ('dataCore' | 'energyOrb' | 'holoShard')[] = ['dataCore', 'energyOrb', 'holoShard'];
      
      for (let i = 0; i < 3; i++) {
        objects.push({
          x: Math.random() * (canvas.width - 100) + 50,
          y: Math.random() * (canvas.height - 100) + 50,
          size: 35,
          type: cyberTypes[i % cyberTypes.length],
          rotation: Math.random() * Math.PI * 2,
          alpha: 1,
          hovered: false,
          exploding: false,
          explosionProgress: 0,
          velocity: {
            x: (Math.random() - 0.5) * 3,
            y: (Math.random() - 0.5) * 3
          },
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
      
      objectsRef.current = objects;
    };

    generateObjects();

    const createExplosionParticles = (x: number, y: number, color: string) => {
      const particleCount = 20;
      const particles: Particle[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = 2 + Math.random() * 3;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 1,
          color,
          size: 2 + Math.random() * 2
        });
      }
      
      particlesRef.current = [...particlesRef.current, ...particles];
    };

    const drawTarget = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      // Glowing effect
      const gradient = ctx.createRadialGradient(0, 0, size * 0.1, 0, 0, size);
      gradient.addColorStop(0, `${colors.accent}80`);
      gradient.addColorStop(1, `${colors.accent}00`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fill();

      // Outer ring
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Inner ring
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2);
      ctx.lineWidth = 2;
      ctx.stroke();

      // Center dot
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = colors.accentLight;
      ctx.fill();

      // Crosshair lines
      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.lineTo(size, 0);
      ctx.moveTo(0, -size);
      ctx.lineTo(0, size);
      ctx.strokeStyle = colors.accentLight;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Pulsing effect
      const pulseSize = size * (1.2 + Math.sin(Date.now() * 0.005) * 0.1);
      ctx.beginPath();
      ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
      ctx.strokeStyle = `${colors.accent}40`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    };

    const drawDataCore = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, obj: CyberObject) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Outer hexagon with glow
      ctx.shadowBlur = 15;
      ctx.shadowColor = colors.accent;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const px = size * Math.cos(angle);
        const py = size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = obj.hovered ? 3 : 2;
      ctx.stroke();

      // Inner rotating circles with trails
      const innerRotation = Date.now() * 0.002;
      ctx.shadowBlur = 10;
      for (let i = 0; i < 3; i++) {
        const angle = innerRotation + (i * Math.PI * 2) / 3;
        const orbitRadius = size * 0.5;
        const cx = orbitRadius * Math.cos(angle);
        const cy = orbitRadius * Math.sin(angle);

        // Draw trail
        ctx.beginPath();
        ctx.arc(cx, cy, size * 0.15, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.15);
        gradient.addColorStop(0, `${colors.accentLight}80`);
        gradient.addColorStop(1, `${colors.accentLight}00`);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(cx, cy, size * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = colors.accentLight;
        ctx.fill();
      }

      // Center core with pulse
      const pulseScale = 1 + Math.sin(Date.now() * 0.005) * 0.1;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.3 * pulseScale, 0, Math.PI * 2);
      const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.3 * pulseScale);
      coreGradient.addColorStop(0, colors.accent);
      coreGradient.addColorStop(0.7, colors.accentLight);
      coreGradient.addColorStop(1, `${colors.accent}40`);
      ctx.fillStyle = coreGradient;
      ctx.fill();

      ctx.restore();
    };

    const drawEnergyOrb = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, obj: CyberObject) => {
      ctx.save();
      ctx.translate(x, y);
      
      // Pulsing effect
      obj.pulsePhase = (obj.pulsePhase || 0) + 0.05;
      const pulseSize = size * (1 + Math.sin(obj.pulsePhase) * 0.2);

      // Multiple layer glow effect
      ctx.shadowBlur = 20;
      ctx.shadowColor = colors.accent;
      
      // Outer energy field
      const fieldRotation = Date.now() * 0.001;
      for (let i = 0; i < 8; i++) {
        const angle = fieldRotation + (i * Math.PI) / 4;
        const fieldRadius = pulseSize * 1.2;
        const x1 = fieldRadius * Math.cos(angle);
        const y1 = fieldRadius * Math.sin(angle);
        const x2 = fieldRadius * Math.cos(angle + Math.PI);
        const y2 = fieldRadius * Math.sin(angle + Math.PI);
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `${colors.accentLight}40`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Outer glow
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, pulseSize);
      gradient.addColorStop(0, `${colors.accent}ff`);
      gradient.addColorStop(0.5, `${colors.accent}40`);
      gradient.addColorStop(1, `${colors.accent}00`);
      
      ctx.beginPath();
      ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Energy rings with rotation
      const ringRotation = Date.now() * 0.002;
      for (let i = 0; i < 3; i++) {
        const ringSize = pulseSize * (0.4 + i * 0.2);
        ctx.beginPath();
        ctx.arc(0, 0, ringSize, ringRotation + i * Math.PI / 3, ringRotation + i * Math.PI / 3 + Math.PI * 1.5);
        ctx.strokeStyle = `${colors.accentLight}${Math.floor((1 - i * 0.3) * 255).toString(16)}`;
        ctx.lineWidth = obj.hovered ? 3 : 2;
        ctx.stroke();
      }

      // Core energy
      ctx.beginPath();
      ctx.arc(0, 0, pulseSize * 0.3, 0, Math.PI * 2);
      const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, pulseSize * 0.3);
      coreGradient.addColorStop(0, colors.accentLight);
      coreGradient.addColorStop(0.6, colors.accent);
      coreGradient.addColorStop(1, `${colors.accent}80`);
      ctx.fillStyle = coreGradient;
      ctx.fill();

      ctx.restore();
    };

    const drawHoloShard = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, obj: CyberObject) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Shadow and glow effects
      ctx.shadowBlur = 15;
      ctx.shadowColor = colors.accent;

      // Crystal shape with multiple layers
      for (let i = 0; i < 3; i++) {
        const layerSize = size * (1 - i * 0.2);
        ctx.beginPath();
        ctx.moveTo(0, -layerSize);
        ctx.lineTo(layerSize * 0.7, layerSize * 0.3);
        ctx.lineTo(0, layerSize);
        ctx.lineTo(-layerSize * 0.7, layerSize * 0.3);
        ctx.closePath();
        
        // Holographic gradient with animation
        const timeOffset = Date.now() * 0.001 + i * Math.PI / 3;
        const gradient = ctx.createLinearGradient(0, -layerSize, 0, layerSize);
        const alpha1 = Math.floor(Math.abs(Math.sin(timeOffset)) * 255).toString(16).padStart(2, '0');
        const alpha2 = Math.floor(Math.abs(Math.cos(timeOffset)) * 255).toString(16).padStart(2, '0');
        
        gradient.addColorStop(0, `${colors.accent}${alpha1}`);
        gradient.addColorStop(0.5, `${colors.accentLight}40`);
        gradient.addColorStop(1, `${colors.accent}${alpha2}`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = `${colors.accentLight}${Math.floor((1 - i * 0.3) * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = obj.hovered ? 3 : 2;
        ctx.stroke();
      }

      // Glitch effect
      if (Math.random() > 0.85) {
        const glitchHeight = Math.random() * size * 0.5;
        const glitchWidth = size * 0.8;
        const glitchY = Math.random() * size * 2 - size;
        
        ctx.beginPath();
        ctx.moveTo(-glitchWidth, glitchY);
        ctx.lineTo(glitchWidth, glitchY + glitchHeight);
        ctx.strokeStyle = colors.accentLight;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Secondary glitch line
        ctx.beginPath();
        ctx.moveTo(-glitchWidth * 0.7, glitchY + 5);
        ctx.lineTo(glitchWidth * 0.7, glitchY + glitchHeight + 5);
        ctx.strokeStyle = `${colors.accent}40`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Energy particles
      const particleCount = obj.hovered ? 5 : 3;
      for (let i = 0; i < particleCount; i++) {
        const angle = Date.now() * 0.002 + (i * Math.PI * 2) / particleCount;
        const distance = size * 0.8;
        const px = Math.cos(angle) * distance;
        const py = Math.sin(angle) * distance;
        
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = colors.accentLight;
        ctx.fill();
      }

      ctx.restore();
    };

    const drawHexagon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = rotation + (i * Math.PI) / 3;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const drawCircuit = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.moveTo(x - size, y);
      ctx.lineTo(x - size/2, y);
      ctx.lineTo(x - size/4, y - size/4);
      ctx.lineTo(x + size/4, y - size/4);
      ctx.lineTo(x + size/2, y);
      ctx.lineTo(x + size, y);
      ctx.stroke();
    };

    const drawDataNode = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.arc(x, y, size/3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, size/2, 0, Math.PI * 2);
      ctx.stroke();
    };

    const drawEnergyPulse = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(-size/2, -size/2);
      ctx.lineTo(0, -size);
      ctx.lineTo(size/2, -size/2);
      ctx.lineTo(size, 0);
      ctx.lineTo(size/2, size/2);
      ctx.lineTo(0, size);
      ctx.lineTo(-size/2, size/2);
      ctx.lineTo(-size, 0);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    const drawExplosion = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, progress: number) => {
      const particleCount = 12;
      const maxRadius = size * 2;
      const radius = maxRadius * progress;
      
      ctx.save();
      ctx.translate(x, y);
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (i * Math.PI * 2) / particleCount;
        const particleRadius = radius * (0.5 + Math.random() * 0.5);
        const px = Math.cos(angle) * particleRadius;
        const py = Math.sin(angle) * particleRadius;
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(px, py);
        ctx.strokeStyle = colors.accent;
        ctx.globalAlpha = 1 - progress;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = colors.accentLight;
        ctx.fill();
      }
      
      ctx.restore();
    };

    const drawLaser = (ctx: CanvasRenderingContext2D, laser: LaserBeam) => {
      // Brightest core
      ctx.beginPath();
      ctx.moveTo(laser.startX, laser.startY);
      ctx.lineTo(laser.endX, laser.endY);
      ctx.strokeStyle = '#ffffff'; // Pure white core
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.globalAlpha = laser.life;
      ctx.stroke();

      // Medium layer
      ctx.beginPath();
      ctx.moveTo(laser.startX, laser.startY);
      ctx.lineTo(laser.endX, laser.endY);
      ctx.strokeStyle = '#00ffff'; // Cyan for visibility
      ctx.lineWidth = 4;
      ctx.globalAlpha = laser.life * 0.8;
      ctx.stroke();

      // Outer glow
      ctx.beginPath();
      ctx.moveTo(laser.startX, laser.startY);
      ctx.lineTo(laser.endX, laser.endY);
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 8;
      ctx.globalAlpha = laser.life * 0.4;
      ctx.stroke();

      // Add particle effects along the laser
      const dx = laser.endX - laser.startX;
      const dy = laser.endY - laser.startY;
      const length = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.floor(length / 10);
      
      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const x = laser.startX + dx * t;
        const y = laser.startY + dy * t;
        
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = laser.life * Math.random();
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const updateParticles = () => {
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.02;
        return particle.life > 0;
      });
    };

    const updateLasers = () => {
      lasersRef.current = lasersRef.current.filter(laser => {
        laser.life -= 0.03; // Faster fade out
        return laser.life > 0;
      });
    };

    const drawParticles = (ctx: CanvasRenderingContext2D) => {
      particlesRef.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.life * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
    };

    const animate = () => {
      if (!canvasRef.current || !ctx.current) return;

      // Clear canvas
      ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      // Update and draw particles
      updateParticles();
      drawParticles(ctx.current);

      // First draw background objects
      objectsRef.current.forEach(obj => {
        if (!['dataCore', 'energyOrb', 'holoShard'].includes(obj.type)) {
          drawObject(obj, ctx.current!);
        }
      });

      // Then draw interactive objects on top
      objectsRef.current.forEach(obj => {
        if (['dataCore', 'energyOrb', 'holoShard'].includes(obj.type)) {
          drawObject(obj, ctx.current!);
        }
      });

      requestAnimationFrame(animate);
    };

    const drawObject = (obj: CyberObject, ctx: CanvasRenderingContext2D) => {
      if (['dataCore', 'energyOrb', 'holoShard'].includes(obj.type)) {
        // Update position
        obj.x += obj.velocity.x;
        obj.y += obj.velocity.y;

        // Bounce off walls
        if (obj.x < obj.size || obj.x > canvasRef.current!.width - obj.size) obj.velocity.x *= -1;
        if (obj.y < obj.size || obj.y > canvasRef.current!.height - obj.size) obj.velocity.y *= -1;

        // Keep within bounds
        obj.x = Math.max(obj.size, Math.min(canvasRef.current!.width - obj.size, obj.x));
        obj.y = Math.max(obj.size, Math.min(canvasRef.current!.height - obj.size, obj.y));
      }

      ctx.strokeStyle = colors.accent;
      ctx.fillStyle = colors.accent;
      ctx.globalAlpha = obj.hovered ? Math.min(1, obj.alpha * 1.5) : obj.alpha;
      ctx.lineWidth = obj.hovered ? 2 : 1;

      if (obj.exploding) {
        createExplosionParticles(obj.x, obj.y, colors.accent);
        
        if (['dataCore', 'energyOrb', 'holoShard'].includes(obj.type)) {
          // Respawn at a new location
          obj.x = Math.random() * (canvasRef.current!.width - 100) + 50;
          obj.y = Math.random() * (canvasRef.current!.height - 100) + 50;
          obj.exploding = false;
          obj.velocity = {
            x: (Math.random() - 0.5) * 3,
            y: (Math.random() - 0.5) * 3
          };
        }
      } else {
        // Draw object based on type
        switch (obj.type) {
          case 'dataCore':
            drawDataCore(ctx, obj.x, obj.y, obj.size, obj.rotation, obj);
            break;
          case 'energyOrb':
            drawEnergyOrb(ctx, obj.x, obj.y, obj.size, obj.rotation, obj);
            break;
          case 'holoShard':
            drawHoloShard(ctx, obj.x, obj.y, obj.size, obj.rotation, obj);
            break;
          case 'hexagon':
            drawHexagon(ctx, obj.x, obj.y, obj.size, obj.rotation);
            ctx.stroke();
            break;
          case 'circuit':
            drawCircuit(ctx, obj.x, obj.y, obj.size);
            break;
          case 'data':
            drawDataNode(ctx, obj.x, obj.y, obj.size);
            break;
          case 'energy':
            drawEnergyPulse(ctx, obj.x, obj.y, obj.size, obj.rotation);
            break;
        }

        // Update rotation
        obj.rotation += obj.hovered ? 0.02 : 0.005;
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      
      const rect = canvasRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Create multiple laser beams for a spread shot effect
      const spreadCount = 3;
      const spreadAngle = Math.PI / 32; // Small spread angle

      for (let i = 0; i < spreadCount; i++) {
        const dx = clickX - mouseRef.current.x;
        const dy = clickY - mouseRef.current.y;
        const angle = Math.atan2(dy, dx);
        const spread = angle + (i - 1) * spreadAngle;
        
        const distance = Math.sqrt(dx * dx + dy * dy);
        const endX = mouseRef.current.x + Math.cos(spread) * distance;
        const endY = mouseRef.current.y + Math.sin(spread) * distance;

        lasersRef.current.push({
          startX: mouseRef.current.x,
          startY: mouseRef.current.y,
          endX,
          endY,
          life: 1
        });
      }

      // Check for hits with a larger hit area
      objectsRef.current.forEach(obj => {
        if (['dataCore', 'energyOrb', 'holoShard'].includes(obj.type)) {
          const dx = obj.x - mouseRef.current.x;
          const dy = obj.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < obj.size * 3) { // Much larger hit area
            obj.exploding = true;
            setScore(prev => prev + 1);
            
            // More particles for better explosion effect
            for (let i = 0; i < 30; i++) {
              const angle = (Math.PI * 2 * i) / 30;
              const speed = 2 + Math.random() * 4;
              particlesRef.current.push({
                x: obj.x,
                y: obj.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                maxLife: 1,
                color: i % 2 === 0 ? '#ffffff' : colors.accent,
                size: 1 + Math.random() * 2
              });
            }
          }
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current!.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    canvasRef.current.addEventListener('mousemove', handleMouseMove);
    canvasRef.current.addEventListener('click', handleClick);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvasRef.current!.removeEventListener('mousemove', handleMouseMove);
      canvasRef.current!.removeEventListener('click', handleClick);
    };
  }, [colors]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full"
        style={{ 
          background: colors.background,
          zIndex: 1,
          cursor: 'crosshair',
          pointerEvents: 'all'  // Ensure clicks are captured
        }}
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed top-5 right-5 px-4 py-2 rounded-lg backdrop-blur-md border z-50 pointer-events-auto"
        style={{
          backgroundColor: `${colors.background}80`,
          borderColor: colors.accent,
          color: colors.text
        }}
      >
        <div className="text-sm font-medium">Score</div>
        <div className="text-2xl font-bold text-center" style={{ color: colors.accent }}>
          {score}
        </div>
      </motion.div>
    </>
  );
};

export default InteractiveBackground;
