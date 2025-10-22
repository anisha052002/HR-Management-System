import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
}

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize stars
    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < 200; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          size: Math.random() * 2,
          opacity: Math.random() * 0.7 + 0.3,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    };
    initStars();

    // Animation loop
    const animate = () => {
      // Clear with deep space color
      ctx.fillStyle = 'rgba(0, 0, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, 'rgba(20, 50, 100, 0.1)');
      gradient.addColorStop(0.5, 'rgba(10, 20, 60, 0.15)');
      gradient.addColorStop(1, 'rgba(5, 10, 30, 0.2)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      starsRef.current.forEach((star) => {
        // Update position with parallax effect
        star.x += star.vx;
        star.y += star.vy;
        star.z += 2;

        // Wrap around
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
        if (star.z > 1000) {
          star.z = 0;
          star.opacity = Math.random() * 0.7 + 0.3;
        }

        // Calculate depth effect
        const scale = star.z / 1000;
        const depth = 1 - scale;

        // Draw star with glow
        const size = star.size * (1 + depth * 0.5);
        const opacity = star.opacity * depth;

        // Glow effect
        ctx.shadowColor = `rgba(100, 200, 255, ${opacity * 0.6})`;
        ctx.shadowBlur = 10 + size * 5;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Draw star
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Additional bright core
        ctx.fillStyle = `rgba(200, 220, 255, ${opacity * 1.2})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw nebula clouds
      ctx.shadowColor = 'rgba(100, 150, 255, 0.3)';
      ctx.shadowBlur = 50;

      // Multiple nebula clouds
      const nebulaCenters = [
        { x: canvas.width * 0.3, y: canvas.height * 0.3, color: 'rgba(150, 100, 255, 0.05)' },
        { x: canvas.width * 0.7, y: canvas.height * 0.7, color: 'rgba(100, 200, 255, 0.05)' },
        { x: canvas.width * 0.5, y: canvas.height * 0.5, color: 'rgba(100, 150, 255, 0.03)' },
      ];

      nebulaCenters.forEach((nebula) => {
        const nebulaGradient = ctx.createRadialGradient(
          nebula.x,
          nebula.y,
          0,
          nebula.x,
          nebula.y,
          400
        );
        nebulaGradient.addColorStop(0, nebula.color);
        nebulaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = nebulaGradient;
        ctx.fillRect(nebula.x - 400, nebula.y - 400, 800, 800);
      });

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: 'linear-gradient(135deg, #000015 0%, #001030 50%, #000015 100%)' }}
    />
  );
}
