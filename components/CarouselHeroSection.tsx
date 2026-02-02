'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Slide {
  url: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

interface CarouselSettings {
  slides: Slide[];
  autoPlayInterval: number;
  isActive: boolean;
}

const defaultSettings: CarouselSettings = {
  slides: [
    {
      url: 'https://res.cloudinary.com/dsejv31js/image/upload/v1767090441/agnishila/out12/2.png',
      title: 'Premium Shilajit',
      subtitle: 'Pure Himalayan Shilajit',
      ctaText: 'Shop Now',
      ctaLink: '/products',
    },
    {
      url: 'https://res.cloudinary.com/dsejv31js/image/upload/v1767090443/agnishila/out12/3.png',
      title: 'Ashwagandha Gummies',
      subtitle: 'Stress Relief & Wellness',
      ctaText: 'Explore',
      ctaLink: '/products',
    },
  ],
  autoPlayInterval: 4000,
  isActive: true,
};

export default function CarouselHeroSection() {
  const [settings, setSettings] = useState<CarouselSettings>(defaultSettings);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/carousel-hero');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to fetch carousel settings:', error);
      setSettings(defaultSettings);
    }
  };

  useEffect(() => {
    if (!isAutoPlaying || !settings.isActive || settings.slides.length === 0) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % settings.slides.length);
    }, settings.autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, settings.autoPlayInterval, settings.slides.length, settings.isActive]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % settings.slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + settings.slides.length) % settings.slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  if (!settings.isActive || settings.slides.length === 0) {
    return null;
  }

  const currentSlideData = settings.slides[currentSlide];

  return (
    <section className="relative w-full bg-black overflow-hidden pt-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: direction > 0 ? 1000 : -1000 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -1000 : 1000 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="relative w-full"
          style={{ aspectRatio: '16 / 9' }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Background Image - Responsive */}
            <div className="absolute inset-0">
              <img
                src={currentSlideData.url}
                alt={currentSlideData.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-2xl">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                >
                  {currentSlideData.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-base sm:text-lg md:text-xl text-gray-200 mb-8"
                >
                  {currentSlideData.subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <Link
                    href={currentSlideData.ctaLink}
                    className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors duration-300 text-sm sm:text-base"
                  >
                    {currentSlideData.ctaText}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      {settings.slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors duration-300"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {settings.slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {settings.slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-primary-500 w-8'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
