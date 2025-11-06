'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useDeviceOptimizations } from '@/hooks/useDeviceOptimizations';
import { useMobileAnimations } from '@/hooks/useMobileAnimations';

export default function CTASection() {
  const t = useTranslations('cta');
  const locale = useLocale();
  const { isMobile, shouldUseBlur } = useDeviceOptimizations();
  const ctaAnim = useMobileAnimations();

  return (
    <section className="relative py-16 sm:py-24 lg:py-28 bg-gradient-to-br from-primary via-primary to-primary-dark overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("/images/aetheris/illu-2.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
      </div>

      {/* Pattern de points */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Effets lumineux animés - Disabled on mobile for performance */}
      {!isMobile && (
        <>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.4, 0.3]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-light/30 rounded-full blur-3xl"
          />
        </>
      )}

      <div className="section-container relative z-10">
        <div ref={ctaAnim.ref} className="max-w-4xl mx-auto text-center">
          {isMobile ? (
            <h2 className={`text-3xl sm:text-6xl font-bold mb-6 sm:mb-8 text-white drop-shadow-2xl mobile-animate-init ${ctaAnim.isVisible ? 'animate-mobile-fade-in-up' : ''}`}>
              {t('title')}
            </h2>
          ) : (
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="text-3xl sm:text-6xl font-bold mb-6 sm:mb-8 text-white drop-shadow-2xl"
            >
              {t('title')}
            </motion.h2>
          )}

          {isMobile ? (
            <p className={`text-lg sm:text-3xl mb-8 sm:mb-12 text-white/95 drop-shadow-lg mobile-animate-init ${ctaAnim.isVisible ? 'animate-mobile-fade-in-up animate-delay-200' : ''}`}>
              {t('description')}
            </p>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-3xl mb-8 sm:mb-12 text-white/95 drop-shadow-lg"
            >
              {t('description')}
            </motion.p>
          )}

          {isMobile ? (
            <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mobile-animate-init ${ctaAnim.isVisible ? 'animate-mobile-scale-in animate-delay-300' : ''}`}>
              <div>
                <Link
                  href={`/${locale}/contact`}
                  className="px-6 py-3 sm:px-10 sm:py-5 bg-white text-primary hover:bg-gray-100 font-bold text-lg sm:text-xl rounded-xl transition-all duration-300 shadow-2xl hover:shadow-white/30 inline-block"
                >
                  {t('contact')}
                </Link>
              </div>

              <div>
                <a
                  href="https://twitter.com/lodennstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 sm:px-10 sm:py-5 bg-white/20 ${shouldUseBlur ? 'backdrop-blur-sm' : ''} border-3 border-white text-white hover:bg-white hover:text-primary font-bold text-lg sm:text-xl rounded-xl transition-all duration-300 shadow-xl inline-block`}
                >
                  {t('twitter')}
                </a>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring", bounce: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                <Link
                  href={`/${locale}/contact`}
                  className="px-6 py-3 sm:px-10 sm:py-5 bg-white text-primary hover:bg-gray-100 font-bold text-lg sm:text-xl rounded-xl transition-all duration-300 shadow-2xl hover:shadow-white/30 inline-block"
                >
                  {t('contact')}
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                <a
                  href="https://twitter.com/lodennstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 sm:px-10 sm:py-5 bg-white/20 ${shouldUseBlur ? 'backdrop-blur-sm' : ''} border-3 border-white text-white hover:bg-white hover:text-primary font-bold text-lg sm:text-xl rounded-xl transition-all duration-300 shadow-xl inline-block`}
                >
                  {t('twitter')}
                </a>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
