'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Hook pour gérer les animations CSS sur mobile via IntersectionObserver
 * Très performant car utilise l'API native du navigateur
 */
export function useMobileAnimations() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Marquer comme monté immédiatement
    setIsMounted(true);

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Une fois visible, on arrête d'observer pour économiser les ressources
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.05, // Se déclenche quand 5% de l'élément est visible
        rootMargin: '50px', // Commence l'animation un peu avant que l'élément soit visible
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return { ref, isVisible, isMounted };
}
