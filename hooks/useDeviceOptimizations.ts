'use client';

import { useState, useEffect } from 'react';

export function useDeviceOptimizations() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if mobile (max-width: 768px)
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    setIsMobile(mobileQuery.matches);
    setPrefersReducedMotion(motionQuery.matches);

    const handleMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);

    mobileQuery.addEventListener('change', handleMobileChange);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      mobileQuery.removeEventListener('change', handleMobileChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return {
    isMobile,
    shouldAnimate: !isMobile && !prefersReducedMotion,
    shouldUseParallax: !isMobile,
    shouldUseBlur: !isMobile,
    shouldRenderParticles: !isMobile,
    shouldUseSmoothScroll: !isMobile,
    animationDuration: isMobile ? 0.3 : 0.8,
    springConfig: isMobile
      ? { type: 'tween' as const, ease: 'easeOut' }
      : { type: 'spring' as const, bounce: 0.3 },
  };
}
