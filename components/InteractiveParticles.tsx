'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  pushVx: number;
  pushVy: number;
  size: number;
  color: string;
  glowColor: string;
}

export default function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Redimensionner le canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Créer les particules
    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = 15;

      const colors = [
        { color: '#FF6B1A', glow: 'rgba(255, 107, 26, 0.6)' }, // Orange primary
        { color: '#FF8A4C', glow: 'rgba(255, 138, 76, 0.6)' }, // Orange light
        { color: '#5BA4D4', glow: 'rgba(91, 164, 212, 0.4)' }, // Sky blue
        { color: '#7BC74D', glow: 'rgba(123, 199, 77, 0.4)' }, // Nature green
      ];

      for (let i = 0; i < particleCount; i++) {
        const colorData = colors[Math.floor(Math.random() * colors.length)];
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;

        particles.push({
          id: i,
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          pushVx: 0,
          pushVy: 0,
          size: Math.random() * 6 + 3,
          color: colorData.color,
          glowColor: colorData.glow,
        });
      }

      particlesRef.current = particles;
    };

    createParticles();

    // Suivre la position de la souris et sa direction
    const handleMouseMove = (e: MouseEvent) => {
      prevMouseRef.current = { ...mouseRef.current };
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouseRadius = 80; // Rayon du cercle de répulsion
      const pushStrength = 2.5;

      // Direction du mouvement de la souris
      const mouseDx = mouseRef.current.x - prevMouseRef.current.x;
      const mouseDy = mouseRef.current.y - prevMouseRef.current.y;

      particlesRef.current.forEach((particle) => {
        // Déplacement naturel des particules
        particle.baseX += particle.vx;
        particle.baseY += particle.vy;

        // Rebondir sur les bords
        if (particle.baseX < 0 || particle.baseX > canvas.width) particle.vx *= -1;
        if (particle.baseY < 0 || particle.baseY > canvas.height) particle.vy *= -1;

        // Garder les particules dans les limites
        particle.baseX = Math.max(0, Math.min(canvas.width, particle.baseX));
        particle.baseY = Math.max(0, Math.min(canvas.height, particle.baseY));

        // Calculer la distance entre la souris et la particule
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Si la souris touche la particule - POUSSER dans la direction du mouvement de la souris
        if (distance < mouseRadius && distance > 0) {
          // Ajouter de la vélocité dans la direction du mouvement de la souris
          particle.pushVx += mouseDx * pushStrength;
          particle.pushVy += mouseDy * pushStrength;
        }

        // Appliquer la vélocité de push
        particle.x += particle.pushVx;
        particle.y += particle.pushVy;

        // Friction pour ralentir progressivement
        particle.pushVx *= 0.92;
        particle.pushVy *= 0.92;

        // Retour progressif à la position de base
        particle.x += (particle.baseX - particle.x) * 0.05;
        particle.y += (particle.baseY - particle.y) * 0.05;

        // Dessiner la particule avec glow
        ctx.shadowBlur = particle.size * 3;
        ctx.shadowColor = particle.glowColor;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-40"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
