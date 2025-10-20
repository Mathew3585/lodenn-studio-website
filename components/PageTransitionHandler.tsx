'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function PageTransitionHandler() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (!link) return;

      const href = link.getAttribute('href');
      const isExternal = link.getAttribute('target') === '_blank' || href?.startsWith('http');

      // Ignorer les liens externes
      if (isExternal || !href) return;

      // Ignorer si c'est la même page
      if (href === pathname) return;

      e.preventDefault();

      // Déclencher l'animation de sortie
      document.body.classList.add('page-transitioning');

      // Naviguer quand l'écran est complètement couvert (après les 2 wipes)
      setTimeout(() => {
        router.push(href);
        // Déclencher l'animation d'entrée après navigation
        setTimeout(() => {
          document.body.classList.add('page-entering');
          document.body.classList.remove('page-transitioning');
        }, 50);
      }, 700); // 700ms = temps pour que les 2 wipes couvrent l'écran
    };

    // Écouter tous les clics
    document.addEventListener('click', handleLinkClick);

    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, [router, pathname]);

  useEffect(() => {
    // Retirer toutes les classes après le changement de page et l'animation d'entrée
    const timer = setTimeout(() => {
      document.body.classList.remove('page-transitioning');
      document.body.classList.remove('page-entering');
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
