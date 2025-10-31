'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, Shield, Award, Leaf, Mountain, Microscope } from 'lucide-react';

const benefits = [
  {
    id: 1,
    icon: <Zap className="w-16 h-16" />,
    title: 'Enhanced Energy',
    description: 'Natural boost to your daily energy levels without crashes or jitters',
    detail: 'Shilajit contains fulvic acid and over 84 minerals that support cellular energy production at the mitochondrial level, providing sustained energy throughout the day.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&auto=format',
    stats: '84+ Minerals',
    benefit: 'All-Day Energy'
  },
  {
    id: 2,
    icon: <Shield className="w-16 h-16" />,
    title: 'Immune Support',
    description: 'Strengthen your body\'s natural defense system',
    detail: 'Rich in antioxidants and bioactive compounds that help protect against oxidative stress and support immune function for optimal health.',
    image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800&h=600&fit=crop&auto=format',
    stats: '100% Natural',
    benefit: 'Immune Boost'
  },
  {
    id: 3,
    icon: <Award className="w-16 h-16" />,
    title: 'Premium Quality',
    description: 'Lab-tested purity and potency guaranteed',
    detail: 'Every batch is third-party tested for heavy metals, contaminants, and authenticity to ensure maximum safety and efficacy.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&auto=format',
    stats: 'Lab Tested',
    benefit: 'Pure Quality'
  },
  {
    id: 4,
    icon: <Mountain className="w-16 h-16" />,
    title: 'Himalayan Source',
    description: 'Sourced from pristine high-altitude regions',
    detail: 'Harvested from the pristine Himalayan mountains at altitudes above 16,000 feet, where the purest form of Shilajit is naturally formed.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format',
    stats: '16,000+ Feet',
    benefit: 'Pure Origin'
  },
  {
    id: 5,
    icon: <Microscope className="w-16 h-16" />,
    title: 'Scientific Backing',
    description: 'Backed by extensive research and studies',
    detail: 'Supported by over 50 peer-reviewed studies demonstrating its effectiveness in enhancing vitality, cognitive function, and overall wellness.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop&auto=format',
    stats: '50+ Studies',
    benefit: 'Proven Results'
  },
  {
    id: 6,
    icon: <Leaf className="w-16 h-16" />,
    title: 'Natural & Pure',
    description: '100% authentic with no artificial additives',
    detail: 'Processed using traditional methods to preserve natural properties, with no artificial additives, fillers, or synthetic compounds.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&auto=format',
    stats: '0% Additives',
    benefit: 'Pure Nature'
  }
];

export default function InnovativeCarousel() {
  const slideRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (slideRef.current) {
      const items = slideRef.current.querySelectorAll('.carousel-item');
      slideRef.current.appendChild(items[0]);
    }
  };

  const prevSlide = () => {
    if (slideRef.current) {
      const items = slideRef.current.querySelectorAll('.carousel-item');
      slideRef.current.prepend(items[items.length - 1]);
    }
  };

  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >

          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Why Choose Our Shilajit?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the transformative power of authentic Himalayan Shilajit with scientifically proven benefits
          </p>
        </motion.div>

        {/* Enhanced Carousel Container */}
        <div className="relative">
          <div className="carousel-container relative w-full h-[500px] bg-gradient-to-br from-jet-900 to-black rounded-3xl shadow-2xl overflow-hidden border border-white/10">

            {/* Carousel Slide Container */}
            <div ref={slideRef} className="carousel-slide relative w-full h-full">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.id}
                  className="carousel-item absolute w-[280px] h-[350px] top-1/2 transform -translate-y-1/2 rounded-2xl shadow-2xl transition-all duration-500 ease-in-out overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${benefit.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Content that appears on the active slide */}
                  <div className="content absolute top-1/2 left-[120px] w-[400px] text-left text-white transform -translate-y-1/2 hidden">
                    <motion.div
                      className="mb-6 text-primary-400"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {benefit.icon}
                    </motion.div>

                    <motion.h3
                      className="text-5xl font-bold uppercase mb-4 leading-tight"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {benefit.title}
                    </motion.h3>

                    <motion.p
                      className="text-lg mb-6 opacity-90 leading-relaxed"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {benefit.detail}
                    </motion.p>

                    <motion.div
                      className="flex items-center space-x-6 mb-8"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-400">{benefit.stats}</div>
                        <div className="text-sm text-gray-300">{benefit.benefit}</div>
                      </div>
                    </motion.div>

                    <motion.button
                      className="bg-primary-400 hover:bg-primary-500 text-black px-8 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More
                    </motion.button>
                  </div>

                  {/* Card overlay for non-active slides */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <div className="text-primary-400 mb-3">
                      {benefit.icon}
                    </div>
                    <h4 className="text-white font-bold text-xl mb-2">{benefit.title}</h4>
                    <p className="text-gray-300 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="navigation-buttons absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6">
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl border border-white/20 transition-all duration-300 flex items-center justify-center"
              >
                <ChevronLeft size={20} />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl border border-white/20 transition-all duration-300 flex items-center justify-center"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-400 mb-2">100%</div>
            <div className="text-gray-300">Pure & Natural</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-400 mb-2">84+</div>
            <div className="text-gray-300">Essential Minerals</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-400 mb-2">16K+</div>
            <div className="text-gray-300">Feet Altitude</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-400 mb-2">50+</div>
            <div className="text-gray-300">Research Studies</div>
          </div>
        </motion.div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .carousel-item:nth-child(1),
        .carousel-item:nth-child(2) {
          top: 0;
          left: 0;
          transform: translate(0, 0);
          border-radius: 0;
          width: 100%;
          height: 100%;
          border-radius: 24px;
        }

        .carousel-item:nth-child(2) .content {
          display: block;
        }

        .carousel-item:nth-child(3) {
          left: 50%;
        }

        .carousel-item:nth-child(4) {
          left: calc(50% + 300px);
        }

        .carousel-item:nth-child(5) {
          left: calc(50% + 600px);
        }

        .carousel-item:nth-child(n + 6) {
          left: calc(50% + 900px);
          opacity: 0;
        }

        .content h3,
        .content p,
        .content button,
        .content div {
          animation: slideInUp 1s ease-in-out forwards;
        }

        .content p {
          animation-delay: 0.3s;
        }

        .content button {
          animation-delay: 0.6s;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(100px);
            filter: blur(33px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
      `}</style>
    </section>
  );
}