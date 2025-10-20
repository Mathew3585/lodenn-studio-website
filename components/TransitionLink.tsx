'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode, MouseEvent } from 'react';

export interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export default function TransitionLink({ href, children, className, target, rel }: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Si c'est un lien externe, laisser le comportement par défaut
    if (target === '_blank' || href.startsWith('http')) {
      return;
    }

    e.preventDefault();

    // Déclencher l'animation de transition
    document.body.classList.add('page-transitioning');

    // Attendre la fin de l'animation avant de naviguer
    setTimeout(() => {
      router.push(href);
      // Retirer la classe après navigation
      setTimeout(() => {
        document.body.classList.remove('page-transitioning');
      }, 100);
    }, 600); // 600ms = durée de l'animation de sortie
  };

  return (
    <Link href={href} onClick={handleClick} className={className} target={target} rel={rel}>
      {children}
    </Link>
  );
}
