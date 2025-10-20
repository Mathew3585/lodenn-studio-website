'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState, useEffect } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    // Observer pour détecter les changements de classe
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const hasTransitioning = document.body.classList.contains('page-transitioning');
          const hasEntering = document.body.classList.contains('page-entering');
          setIsExiting(hasTransitioning);
          setIsEntering(hasEntering);
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Double wipe effect - SORTIE (monte de bas en haut) */}
      <motion.div
        className="fixed inset-0 z-[9999] bg-primary origin-bottom pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isExiting ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="fixed inset-0 z-[9998] bg-white origin-bottom pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isExiting ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Double wipe effect - ENTRÉE (descend de haut en bas) */}
      <motion.div
        className="fixed inset-0 z-[9999] bg-primary origin-top pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isEntering ? 0 : (isExiting ? 1 : 0) }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="fixed inset-0 z-[9998] bg-white origin-top pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isEntering ? 0 : (isExiting ? 1 : 0) }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Contenu de la page */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
}
