import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Liste des langues supportées
  locales: ['fr', 'en'],

  // Langue par défaut - anglais pour tous les visiteurs
  defaultLocale: 'en',

  // Détection automatique DÉSACTIVÉE - l'utilisateur choisit manuellement sa langue
  localeDetection: false,

  // Préfixe toujours présent dans l'URL (même pour la locale par défaut)
  localePrefix: 'always'
});

export const config = {
  // Matcher pour inclure toutes les routes sauf les fichiers statiques et API
  matcher: ['/', '/(fr|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
