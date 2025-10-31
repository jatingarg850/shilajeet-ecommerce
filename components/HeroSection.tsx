'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const productImages = [
  {
    src: "/images/image-removebg-preview.png",
    alt: "Premium Shilajit Resin",
    title: "Pure Resin",
    subtitle: "Maximum Potency"
  },
  {
    src: "/images/image-removebg-preview.png",
    alt: "Shilajit Capsules",
    title: "Capsule Form",
    subtitle: "Daily Convenience"
  },
  {
    src: "/images/image-removebg-preview.png",
    alt: "Shilajit Powder",
    title: "Powder Blend",
    subtitle: "Versatile Use"
  }
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextImage = () => {
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden pt-20">
      {/* Sharp geometric background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-jet-900 to-black"></div>

        {/* Corner brackets */}
        <div className="absolute top-16 left-16 w-24 h-24 border-l-2 border-t-2 border-primary-400/20"></div>
        <div className="absolute top-16 right-16 w-24 h-24 border-r-2 border-t-2 border-primary-400/20"></div>
        <div className="absolute bottom-16 left-16 w-24 h-24 border-l-2 border-b-2 border-primary-400/20"></div>
        <div className="absolute bottom-16 right-16 w-24 h-24 border-r-2 border-b-2 border-primary-400/20"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }} />
        </div>

        {/* Animated sharp elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-1 h-20 bg-gradient-to-b from-primary-400/30 to-transparent"
          animate={{
            scaleY: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-20 h-1 bg-gradient-to-r from-primary-400/30 to-transparent"
          animate={{
            scaleX: [1, 1.8, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div className="w-12 h-1 bg-primary-400"></div>
              <span className="text-primary-400 font-medium text-sm uppercase tracking-[0.2em]">
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
              <span className="block text-primary-400">ANCIENT</span>
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
              <button className="bg-primary-400 hover:bg-primary-500 text-black px-10 py-4 font-bold flex items-center justify-center space-x-3 transition-all duration-300 transform hover:scale-105 uppercase tracking-wider">
                <span>Shop Premium</span>
                <ArrowRight size={18} />
              </button>
              <button className="border-2 border-white/20 text-white hover:border-primary-400 hover:text-primary-400 px-10 py-4 font-bold transition-all duration-300 uppercase tracking-wider">
                View Research
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-16 grid grid-cols-3 gap-12"
            >
              <div className="text-left">
                <div className="text-3xl font-bold text-primary-400 mb-2 tracking-tight">100%</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Pure Grade</div>
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-primary-400 mb-2 tracking-tight">Lab</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Verified</div>
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-primary-400 mb-2 tracking-tight">16K+</div>
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
                  {/* Static golden glow background */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="w-64 h-64 rounded-full opacity-30"
                      style={{
                        background: 'radial-gradient(circle, rgba(249, 199, 79, 0.4) 0%, rgba(249, 199, 79, 0.2) 40%, rgba(249, 199, 79, 0.1) 70%, transparent 100%)',
                        filter: 'blur(20px)'
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
                        <div className="relative">
                          <Image
                            src={productImages[currentImageIndex].src}
                            alt={productImages[currentImageIndex].alt}
                            width={350}
                            height={350}
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
                  <div className="bg-black/50 backdrop-blur-sm border border-white/20 px-6 py-3">
                    <h3 className="text-white font-bold text-lg uppercase tracking-wider">
                      {productImages[currentImageIndex].title}
                    </h3>
                    <p className="text-primary-400 text-sm uppercase tracking-wider">
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
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 backdrop-blur-sm z-20 transition-all duration-300"
              >
                <ChevronLeft size={18} />
              </motion.button>
              
              <motion.button
                onClick={nextImage}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 backdrop-blur-sm z-20 transition-all duration-300"
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
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'w-8 h-2 bg-primary-400' 
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