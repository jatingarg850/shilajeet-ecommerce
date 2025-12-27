'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import SectionBlend from './SectionBlend';

const productImages = [
  {
    src: "/out/2.png",
    alt: "Product 2",
    title: "Pure & Potent",
    subtitle: "Lab Tested"
  },
  {
    src: "/out/3.png",
    alt: "Product 3",
    title: "Natural Wellness",
    subtitle: "Trusted Brand"
  },
  {
    src: "/out/1.png",
    alt: "Product 1",
    title: "Premium Quality",
    subtitle: "Authentic Himalayan"
  },
  {
    src: "/out/4.png",
    alt: "Product 4",
    title: "Maximum Benefits",
    subtitle: "Proven Results"
  }
];

const backgroundImages = [
  "/selling/shilajit banner.jpg",
  "/selling/shilajit banner.jpg",
  "/selling/shilajit banner.jpg",
  "/selling/shilajit banner.jpg"
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentImageIndex((prev) => {
        const newIndex = (prev + 1) % productImages.length;
        setBackgroundIndex(newIndex);
        return newIndex;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextImage = () => {
    setDirection(1);
    setCurrentImageIndex((prev) => {
      const newIndex = (prev + 1) % productImages.length;
      setBackgroundIndex(newIndex);
      return newIndex;
    });
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentImageIndex((prev) => {
      const newIndex = (prev - 1 + productImages.length) % productImages.length;
      setBackgroundIndex(newIndex);
      return newIndex;
    });
  };

  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/bg/vd.jpg"
          alt="Hero Background"
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 0
          }}
          priority
          quality={90}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        
        {/* Section blending */}
        <SectionBlend position="bottom" height="xl" intensity="medium" />

        {/* Rocky corner formations */}
        <div className="absolute top-16 left-16 w-24 h-24 border-l-4 border-t-4 border-primary-400/60 z-20" style={{
          borderImage: 'linear-gradient(45deg, #D4A5B8, #C899AC) 1',
          filter: 'drop-shadow(0 0 10px rgba(212, 165, 184, 0.3))'
        }}></div>
        <div className="absolute top-16 right-16 w-24 h-24 border-r-4 border-t-4 border-primary-400/60 z-20" style={{
          borderImage: 'linear-gradient(-45deg, #D4A5B8, #C899AC) 1',
          filter: 'drop-shadow(0 0 10px rgba(212, 165, 184, 0.3))'
        }}></div>
        <div className="absolute bottom-16 left-16 w-24 h-24 border-l-4 border-b-4 border-primary-400/60 z-20" style={{
          borderImage: 'linear-gradient(135deg, #D4A5B8, #C899AC) 1',
          filter: 'drop-shadow(0 0 10px rgba(212, 165, 184, 0.3))'
        }}></div>
        <div className="absolute bottom-16 right-16 w-24 h-24 border-r-4 border-b-4 border-primary-400/60 z-20" style={{
          borderImage: 'linear-gradient(-135deg, #D4A5B8, #C899AC) 1',
          filter: 'drop-shadow(0 0 10px rgba(212, 165, 184, 0.3))'
        }}></div>

        {/* Rocky texture overlay */}
        <div className="absolute inset-0 opacity-15 z-15">
          <div className="w-full h-full" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.1) 1px, transparent 2px),
              radial-gradient(circle at 80% 70%, rgba(184, 148, 31, 0.08) 1px, transparent 2px),
              linear-gradient(45deg, rgba(212, 175, 55, 0.05) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(212, 175, 55, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '150px 150px, 200px 200px, 80px 80px, 120px 120px',
            backgroundPosition: '0 0, 50px 50px, 0 0, 25px 25px'
          }} />
        </div>

        {/* Animated mineral veins */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-20 bg-gradient-to-b from-primary-400/60 via-primary-500/40 to-transparent z-20"
          animate={{
            scaleY: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
            boxShadow: ['0 0 5px rgba(212, 165, 184, 0.3)', '0 0 15px rgba(212, 165, 184, 0.6)', '0 0 5px rgba(212, 165, 184, 0.3)']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            filter: 'blur(0.5px)',
            borderRadius: '1px'
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-20 h-2 bg-gradient-to-r from-primary-400/60 via-primary-500/40 to-transparent z-20"
          animate={{
            scaleX: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
            boxShadow: ['0 0 5px rgba(212, 165, 184, 0.3)', '0 0 15px rgba(212, 165, 184, 0.6)', '0 0 5px rgba(212, 165, 184, 0.3)']
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          style={{
            filter: 'blur(0.5px)',
            borderRadius: '1px'
          }}
        />
        
        {/* Floating rock particles */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary-400/80 rounded-full z-20"
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/2 left-1/3 w-1 h-1 bg-primary-500/60 rounded-full z-20"
          animate={{
            y: [10, -10, 10],
            x: [5, -5, 5],
            opacity: [0.2, 0.7, 0.2],
            scale: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-4 mb-8"
            >
              <div className="w-12 h-1 bg-mauve-gradient"></div>
              <span className="text-white-to-mauve font-medium text-sm uppercase tracking-[0.2em]">
                Premium Himalayan
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl lg:text-8xl font-bold text-white mb-8 leading-none tracking-tight"
            >
              UNLOCK
              <span className="block text-white-to-mauve" style={{ display: 'inline-block', width: '100%' }}>ANCIENT</span>
              <span className="block text-white">POWER</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl text-gray-300 mb-12 max-w-lg font-light leading-relaxed"
            >
              Experience the legendary power of pure Himalayan Shilajit. 
              Pharmaceutical-grade quality for high-performance individuals who demand excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Link href="/products" className="bg-mauve-gradient hover:bg-mauve-gradient text-white px-10 py-4 font-bold flex items-center justify-center space-x-3 transition-all duration-300 transform hover:scale-105 uppercase tracking-wider">
                <span>Shop Premium</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/benefits" className="border-mauve-gradient text-white hover:text-white-to-mauve px-10 py-4 font-bold transition-all duration-300 uppercase tracking-wider text-center">
                View Research
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-16 grid grid-cols-3 gap-12"
            >
              <div className="text-left">
                <div className="text-3xl font-bold text-white-to-mauve mb-2 tracking-tight">100%</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Pure Grade</div>
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-white-to-mauve mb-2 tracking-tight">Lab</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Verified</div>
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-white-to-mauve mb-2 tracking-tight">16K+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Feet Source</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Product Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="relative">
              {/* Carousel Container */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <div className="w-96 h-96 mx-auto flex items-center justify-center relative">
                  {/* Enhanced mauve glow background */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-80 h-80 rounded-full opacity-40"
                      style={{
                        background: 'radial-gradient(circle, rgba(212, 165, 184, 0.6) 0%, rgba(240, 199, 218, 0.4) 40%, rgba(200, 153, 172, 0.2) 70%, transparent 100%)',
                        filter: 'blur(25px)'
                      }}
                    />
                  </div>

                  {/* Product carousel container */}
                  <div className="relative w-80 h-80 overflow-hidden z-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{
                          opacity: 0,
                          x: direction > 0 ? 100 : -100,
                          scale: 0.8
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          scale: 1
                        }}
                        exit={{
                          opacity: 0,
                          x: direction > 0 ? -100 : 100,
                          scale: 0.8
                        }}
                        transition={{
                          duration: 0.8,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="relative w-96 h-96">
                          <Image
                            src={productImages[currentImageIndex].src}
                            alt={productImages[currentImageIndex].alt}
                            fill
                            className="object-contain drop-shadow-2xl filter brightness-110 contrast-125 saturate-110"
                            priority={currentImageIndex === 0}
                          />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Product Info Overlay */}
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
                >
                  <div className="bg-black/70 backdrop-blur-sm border-2 border-primary-400/30 px-6 py-3 cave-shadow" style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,15,10,0.9) 100%)',
                    borderImage: 'linear-gradient(45deg, rgba(212, 165, 184, 0.6), rgba(200, 153, 172, 0.4)) 1'
                  }}>
                    <h3 className="text-white font-bold text-lg uppercase tracking-wider mineral-glow">
                      {productImages[currentImageIndex].title}
                    </h3>
                    <p className="text-white-to-mauve text-sm uppercase tracking-wider">
                      {productImages[currentImageIndex].subtitle}
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Navigation Buttons */}
              <motion.button
                onClick={prevImage}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-primary-900/40 text-primary-400 p-3 backdrop-blur-sm z-20 transition-all duration-300 border border-primary-400/30"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(20,15,10,0.8) 100%)',
                  boxShadow: '0 0 15px rgba(212, 165, 184, 0.2)'
                }}
              >
                <ChevronLeft size={18} />
              </motion.button>

              <motion.button
                onClick={nextImage}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-primary-900/40 text-primary-400 p-3 backdrop-blur-sm z-20 transition-all duration-300 border border-primary-400/30"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(20,15,10,0.8) 100%)',
                  boxShadow: '0 0 15px rgba(212, 165, 184, 0.2)'
                }}
              >
                <ChevronRight size={18} />
              </motion.button>

              {/* Sharp Progress Indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex items-center space-x-2">
                  {productImages.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentImageIndex ? 1 : -1);
                        setCurrentImageIndex(index);
                        setBackgroundIndex(index);
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`transition-all duration-300 ${index === currentImageIndex
                        ? 'w-8 h-2 bg-mauve-gradient'
                        : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                        }`}
                    />
                  ))}
                </div>

                {/* Auto-play progress bar */}
                <div className="mt-2 w-16 h-0.5 bg-white/20 overflow-hidden">
                  <motion.div
                    className="h-full bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: isAutoPlaying ? "100%" : "0%" }}
                    transition={{ duration: 3.5, ease: "linear" }}
                    key={currentImageIndex}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}