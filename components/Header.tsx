'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
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
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
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
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Change language"
                >
                  <span className="text-2xl">{locale === 'fr' ? '🇫🇷' : '🇬🇧'}</span>
                  <span className="font-medium text-gray-700">{locale.toUpperCase()}</span>
                  <svg className={`w-4 h-4 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      href={switchLocale('fr')}
                      className={`flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 transition-colors ${locale === 'fr' ? 'bg-gray-50' : ''}`}
                      onClick={() => setIsLangMenuOpen(false)}
                    >
                      <span className="text-2xl">🇫🇷</span>
                      <span className="font-medium">Français</span>
                    </Link>
                    <Link
                      href={switchLocale('en')}
                      className={`flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 transition-colors ${locale === 'en' ? 'bg-gray-50' : ''}`}
                      onClick={() => setIsLangMenuOpen(false)}
                    >
                      <span className="text-2xl">🇬🇧</span>
                      <span className="font-medium">English</span>
                    </Link>
                  </div>
                )}
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
                  <p className="text-sm text-gray-500 mb-2 font-medium">Language / Langue</p>
                  <div className="flex gap-2">
                    <Link
                      href={switchLocale('fr')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors flex-1 ${
                        locale === 'fr' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-xl">🇫🇷</span>
                      <span className="font-medium">FR</span>
                    </Link>
                    <Link
                      href={switchLocale('en')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors flex-1 ${
                        locale === 'en' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-xl">🇬🇧</span>
                      <span className="font-medium">EN</span>
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
