'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialiser Lenis avec une configuration optimale pour un site gaming
    const lenis = new Lenis({
      duration: 1.2, // Durée du smooth scroll (1.2s pour très fluide)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing smooth
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Fonction d'animation
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
