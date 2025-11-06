'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useDeviceOptimizations } from '@/hooks/useDeviceOptimizations';

// Lazy load InteractiveParticles pour améliorer le LCP
const InteractiveParticles = dynamic(() => import('@/components/InteractiveParticles'), {
  ssr: false,
  loading: () => null
});

import CTASection from '@/components/CTASection';

export default function Home() {
  const t = useTranslations('home');
  const { isMobile, shouldRenderParticles, shouldUseBlur } = useDeviceOptimizations();
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const aetherisRef = useRef(null);
  const isAetherisInView = useInView(aetherisRef, { once: true, amount: 0.2 });

  // Charger les animations après le premier rendu pour améliorer le LCP
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const slides = [
    '/images/aetheris/illu-1.webp',
    '/images/aetheris/illu-2.webp',
    '/images/aetheris/illu-3.webp',
    '/images/aetheris/illu-4.webp',
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000); // Changement toutes les 8 secondes
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative bg-black">
      {/* Hero Section - Orange Dominant */}
      <section className="relative h-screen overflow-hidden">
        {/* Slideshow Background */}
        <div className="absolute inset-0 bg-black">
          {slides.map((slide, index) => (
            <div
              key={slide}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={slide}
                alt="Aetheris"
                fill
                className="object-cover"
                style={{
                  transform: `scale(${1 + scrollY * 0.0002})`,
                }}
                priority={index === 0}
                loading={index === 0 ? undefined : "lazy"}
              />
              {/* Overlay sombre pour faire ressortir le contenu */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
            </div>
          ))}
        </div>

        {/* Particules interactives - Disabled on mobile for performance */}
        {shouldRenderParticles && <InteractiveParticles />}

        {/* Hero Content avec animations */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 sm:px-4">
          {/* Logo avec GROS glow orange et animations */}
          {isLoaded ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0, ease: "easeOut" }}
              className="mb-8 relative group"
            >
              <motion.div
                animate={!isMobile ? {
                  scale: [1.5, 1.8, 1.5],
                  opacity: [0.5, 0.7, 0.5]
                } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute inset-0 bg-primary/50 rounded-full ${shouldUseBlur ? 'blur-3xl' : 'blur-lg'}`}
                style={isMobile ? { transform: 'scale(1.5)', opacity: 0.5 } : {}}
              />
              <motion.div
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
              >
                <Image
                  src="/images/logo.avif"
                  alt="Lodenn Studio"
                  width={200}
                  height={200}
                  priority
                  fetchPriority="high"
                  className="w-32 h-32 sm:w-56 sm:h-56 relative z-10 drop-shadow-2xl"
                />
              </motion.div>
            </motion.div>
          ) : (
            <div className="mb-8 relative group">
              <div className={`absolute inset-0 bg-primary/50 rounded-full ${shouldUseBlur ? 'blur-3xl' : 'blur-lg'}`} style={{ transform: 'scale(1.5)', opacity: 0.5 }} />
              <Image
                src="/images/logo.avif"
                alt="Lodenn Studio"
                width={200}
                height={200}
                priority
                fetchPriority="high"
                className="w-32 h-32 sm:w-56 sm:h-56 relative z-10 drop-shadow-2xl"
              />
            </div>
          )}

          {/* Titre avec gradient orange et animation */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={isMobile ? { duration: 0.8, delay: 0.6 } : { duration: 1, delay: 0.6, type: "spring", bounce: 0.4 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 text-center"
          >
            <motion.span
              animate={!isMobile ? {
                backgroundPosition: ["0% center", "200% center", "0% center"]
              } : {}}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-primary drop-shadow-2xl"
              style={{ backgroundSize: "200% auto" }}
            >
              Lodenn Studio
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-xl sm:text-3xl lg:text-4xl mb-3 text-center text-white max-w-3xl font-light drop-shadow-lg mx-auto"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-base sm:text-xl mb-8 sm:mb-12 text-center text-gray-200 max-w-2xl drop-shadow-md mx-auto"
          >
            {t('hero.description')}
          </motion.p>

          {/* Boutons CTA - Orange vif avec animations */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-6 mb-16 items-center"
          >
            <motion.div
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="flex-shrink-0"
            >
              <Link
                href="/games/aetheris"
                className="group relative px-6 py-3 sm:px-10 sm:py-5 bg-primary hover:bg-primary-dark text-white font-bold text-lg sm:text-xl rounded-xl overflow-hidden transition-all duration-300 shadow-2xl shadow-primary/50 hover:shadow-primary/70 inline-block whitespace-nowrap"
              >
                <span className="relative z-10">{t('hero.discoverAetheris')}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="flex-shrink-0"
            >
              <Link
                href="/about"
                className={`px-6 py-3 sm:px-10 sm:py-5 bg-white/10 ${shouldUseBlur ? 'backdrop-blur-sm' : ''} border-2 border-primary text-white hover:bg-primary hover:border-primary font-bold text-lg sm:text-xl rounded-xl transition-all duration-300 shadow-xl inline-block whitespace-nowrap`}
              >
                {t('hero.ourStudio')}
              </Link>
            </motion.div>
          </motion.div>

        </div>

        {/* Scroll Indicator avec animations */}
        <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <motion.div
              animate={!isMobile ? { y: [0, 10, 0] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-primary cursor-pointer"
            >
              <motion.span
                animate={!isMobile ? { opacity: [1, 0.5, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-sm font-bold drop-shadow-lg text-center"
              >
                {t('hero.scrollText')}
              </motion.span>
              <motion.svg
                animate={!isMobile ? {
                  y: [0, 5, 0],
                  scale: [1, 1.1, 1]
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-7 h-7 drop-shadow-lg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </motion.svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section Featured Game - Aetheris en immersion totale */}
      <section ref={aetherisRef} className="relative min-h-screen bg-black overflow-hidden">
        {/* Grande image de fond avec zoom out */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.2 }}
          animate={isAetherisInView ? { scale: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="/images/aetheris/illu-2.webp"
            alt="Aetheris World"
            fill
            loading="lazy"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </motion.div>

        <div className="relative z-10 py-16 sm:py-24 lg:py-32 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Badge + Titre avec animations */}
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: -30, rotate: -10 }}
                animate={isAetherisInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.5 }}
                className="inline-block px-6 py-3 bg-primary text-white rounded-full text-sm font-bold mb-8 shadow-2xl shadow-primary/50"
              >
                <motion.span
                  animate={{
                    boxShadow: [
                      "0 0 20px 5px rgba(255, 107, 26, 0.5)",
                      "0 0 40px 10px rgba(255, 107, 26, 0.8)",
                      "0 0 20px 5px rgba(255, 107, 26, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block"
                >
                  {t('aetherisSection.badge')}
                </motion.span>
              </motion.span>

              <motion.h2
                initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, scale: 0.5, rotateX: 90 }}
                animate={isAetherisInView ? (isMobile ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : { opacity: 1, scale: 1, rotateX: 0 }) : {}}
                transition={isMobile ? { duration: 0.8, delay: 0.5 } : { duration: 1, delay: 0.5, type: "spring", bounce: 0.4 }}
                className="text-5xl sm:text-8xl lg:text-9xl font-bold mb-6 text-white drop-shadow-2xl"
              >
                Aetheris
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isAetherisInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-xl sm:text-4xl text-primary font-light drop-shadow-lg"
              >
                {t('aetherisSection.tagline')}
              </motion.p>
            </div>

            {/* Grille visuelle immersive avec animations stagger */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Grande image principale */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isAetherisInView ? { opacity: 1, y: 0 } : {}}
                transition={isMobile ? { duration: 0.6, delay: 0.8 } : { duration: 1, delay: 1, type: "spring", bounce: 0.3 }}
                className="lg:col-span-2 relative h-64 sm:h-80 lg:h-[600px] rounded-2xl overflow-hidden group"
              >
                <Image
                  src="/images/aetheris/illu-1.webp"
                  alt="Aetheris"
                  fill
                  loading="lazy"
                  className={`object-cover transition-transform duration-700 ${!isMobile ? 'group-hover:scale-110' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={isAetherisInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.3 }}
                  className="absolute bottom-8 left-8 right-8"
                >
                  <h3 className="text-2xl sm:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                    {t('aetherisSection.mainTitle')}
                  </h3>
                  <p className="text-xl text-gray-200 max-w-2xl drop-shadow-md hidden sm:block">
                    {t('aetherisSection.mainDescription')}
                  </p>
                </motion.div>
              </motion.div>

              {/* 2 images secondaires avec stagger */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isAetherisInView ? { opacity: 1, y: 0 } : {}}
                transition={isMobile ? { duration: 0.5, delay: 1 } : { duration: 0.8, delay: 1.2, type: "spring", bounce: 0.4 }}
                className="relative h-56 sm:h-72 rounded-2xl overflow-hidden group"
              >
                <Image
                  src="/images/aetheris/illu-3.webp"
                  alt="Aetheris"
                  fill
                  loading="lazy"
                  className={`object-cover transition-all duration-700 ${!isMobile ? 'group-hover:scale-110 group-hover:rotate-2' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isAetherisInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.5 }}
                  className="absolute bottom-6 left-6"
                >
                  <p className="text-lg sm:text-2xl font-bold text-white drop-shadow-lg">{t('aetherisSection.buildBase')}</p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isAetherisInView ? { opacity: 1, y: 0 } : {}}
                transition={isMobile ? { duration: 0.5, delay: 1.1 } : { duration: 0.8, delay: 1.4, type: "spring", bounce: 0.4 }}
                className="relative h-56 sm:h-72 rounded-2xl overflow-hidden group"
              >
                <Image
                  src="/images/aetheris/illu-4.webp"
                  alt="Aetheris"
                  fill
                  loading="lazy"
                  className={`object-cover transition-all duration-700 ${!isMobile ? 'group-hover:scale-110 group-hover:-rotate-2' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isAetherisInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.7 }}
                  className="absolute bottom-6 left-6"
                >
                  <p className="text-lg sm:text-2xl font-bold text-white drop-shadow-lg">{t('aetherisSection.discoverMysteries')}</p>
                </motion.div>
              </motion.div>
            </div>

            {/* CTA avec animation */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={isAetherisInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 2.2, type: "spring", bounce: 0.5 }}
              className="text-center"
            >
              <Link
                href="/games/aetheris"
                className="inline-flex items-center gap-3 px-8 py-4 sm:px-12 sm:py-6 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-bold text-xl sm:text-2xl rounded-xl transition-all duration-300 hover:scale-110 shadow-2xl shadow-primary/50 hover:shadow-primary/70 group"
              >
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {t('aetherisSection.discoverGame')}
                </motion.span>
                <motion.svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
