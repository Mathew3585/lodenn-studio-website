'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useDeviceOptimizations } from '@/hooks/useDeviceOptimizations';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const { shouldUseBlur } = useDeviceOptimizations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  // Fonction pour changer la langue en gardant le même chemin
  const switchLocale = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    return `/${newLocale}${pathWithoutLocale}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsLangMenuOpen(false); // Ferme le dropdown quand le header se cache
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className={`bg-white/95 ${shouldUseBlur ? 'backdrop-blur-md' : ''} border-b border-gray-200 shadow-lg`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Image
                src="/images/logo.avif"
                alt="Lodenn Studio"
                width={50}
                height={50}
                className="w-12 h-12"
              />
              <span className="text-xl font-bold text-gray-900">Lodenn Studio</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href={`/${locale}`} className="text-gray-700 hover:text-primary transition-colors font-medium">
                {t('home')}
              </Link>
              <Link href={`/${locale}/games/aetheris`} className="text-gray-700 hover:text-primary transition-colors font-medium">
                {t('aetheris')}
              </Link>
              <Link href={`/${locale}/about`} className="text-gray-700 hover:text-primary transition-colors font-medium">
                {t('about')}
              </Link>
              <Link href={`/${locale}/contact`} className="btn-primary">
                {t('contact')}
              </Link>

              {/* Language Switcher */}
              <div className="relative flex items-center justify-center">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center px-2 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                  aria-label="Change language"
                >
                  <Image
                    src={`/images/Countrie/${locale}.webp`}
                    alt={locale === 'fr' ? 'Français' : 'English'}
                    width={24}
                    height={24}
                    className="rounded"
                  />
                </button>

                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-full mt-0 -ml-10 bg-white/95 ${shouldUseBlur ? 'backdrop-blur-sm' : ''} rounded-xl shadow-xl border border-gray-200 py-4 px-4 z-50 flex flex-col items-center gap-4 min-w-[96px]`}
                    >
                      <Link
                        href={switchLocale('fr')}
                        className="hover:scale-110 transition-transform"
                        onClick={() => setIsLangMenuOpen(false)}
                      >
                        <Image
                          src="/images/Countrie/fr.webp"
                          alt="Français"
                          width={44}
                          height={44}
                          className={`rounded-md transition-all ${locale === 'fr' ? 'ring-4 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
                        />
                      </Link>
                      <Link
                        href={switchLocale('en')}
                        className="hover:scale-110 transition-transform"
                        onClick={() => setIsLangMenuOpen(false)}
                      >
                        <Image
                          src="/images/Countrie/en.webp"
                          alt="English"
                          width={44}
                          height={44}
                          className={`rounded-md transition-all ${locale === 'en' ? 'ring-4 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
                        />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <Link
                  href={`/${locale}`}
                  className="text-gray-700 hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('home')}
                </Link>
                <Link
                  href={`/${locale}/games/aetheris`}
                  className="text-gray-700 hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('aetheris')}
                </Link>
                <Link
                  href={`/${locale}/about`}
                  className="text-gray-700 hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('about')}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="btn-primary inline-block text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('contact')}
                </Link>

                {/* Language Switcher Mobile */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex gap-6 justify-center">
                    <Link
                      href={switchLocale('fr')}
                      className="flex items-center justify-center transition-transform hover:scale-110"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Image
                        src="/images/Countrie/fr.webp"
                        alt="Français"
                        width={40}
                        height={40}
                        className={`rounded-md transition-all ${locale === 'fr' ? 'ring-4 ring-primary ring-offset-2 scale-110' : 'opacity-70'}`}
                      />
                    </Link>
                    <Link
                      href={switchLocale('en')}
                      className="flex items-center justify-center transition-transform hover:scale-110"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Image
                        src="/images/Countrie/en.webp"
                        alt="English"
                        width={40}
                        height={40}
                        className={`rounded-md transition-all ${locale === 'en' ? 'ring-4 ring-primary ring-offset-2 scale-110' : 'opacity-70'}`}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
