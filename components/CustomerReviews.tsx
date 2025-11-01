'use client';

import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Star, Quote, CheckCircle, ThumbsUp, Heart, Zap } from 'lucide-react';
import { useState } from 'react';

const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'CEO, TechCorp',
    rating: 5,
    comment: 'Exceptional quality and results. This supplement has significantly enhanced my cognitive performance and energy levels during demanding business operations.',
    date: 'March 2024',
    verified: true,
    location: 'San Francisco, CA'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    title: 'Medical Director',
    rating: 5,
    comment: 'As a healthcare professional, I\'m impressed by the purity and efficacy. The lab results speak for themselves - this is pharmaceutical-grade quality.',
    date: 'February 2024',
    verified: true,
    location: 'New York, NY'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    title: 'Investment Banker',
    rating: 5,
    comment: 'The sustained energy and mental clarity I experience with this product is unparalleled. It\'s become essential for my high-performance lifestyle.',
    date: 'March 2024',
    verified: true,
    location: 'London, UK'
  },
  {
    id: 4,
    name: 'David Kumar',
    title: 'Olympic Athlete',
    rating: 5,
    comment: 'Recovery and performance enhancement at the highest level. This product meets the stringent requirements of professional athletics.',
    date: 'January 2024',
    verified: true,
    location: 'Toronto, CA'
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    title: 'Research Scientist',
    rating: 5,
    comment: 'The bioavailability and mineral profile are exceptional. From a scientific perspective, this represents the gold standard in Shilajit supplementation.',
    date: 'February 2024',
    verified: true,
    location: 'Boston, MA'
  },
  {
    id: 6,
    name: 'James Wilson',
    title: 'Fortune 500 Executive',
    rating: 5,
    comment: 'Consistent, reliable performance enhancement. The quality control and sourcing transparency give me complete confidence in this product.',
    date: 'March 2024',
    verified: true,
    location: 'Sydney, AU'
  }
];

const ReviewCard = ({ review, index }: { review: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      viewport={{ once: true }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-jet-900 border border-white/20 hover:border-primary-400/50 transition-all duration-500 overflow-hidden">
        {/* Sharp corner accent */}
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-primary-400/20 group-hover:border-t-primary-400/40 transition-all duration-300"></div>
        
        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h4 className="text-white font-bold text-lg tracking-tight">{review.name}</h4>
                {review.verified && (
                  <div className="w-2 h-2 bg-primary-400 transform rotate-45"></div>
                )}
              </div>
              <p className="text-gray-400 text-sm font-medium">{review.title}</p>
              <p className="text-gray-500 text-xs mt-1">{review.location}</p>
            </div>

            {/* Quote Icon */}
            <div className="text-white/10 group-hover:text-primary-400/20 transition-colors duration-300">
              <Quote size={24} />
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1 h-4 bg-primary-400"></div>
              ))}
            </div>
            <span className="text-white font-bold text-sm">{review.rating}.0</span>
          </div>

          {/* Review Text */}
          <blockquote className="text-gray-300 leading-relaxed mb-8 font-light text-base">
            "{review.comment}"
          </blockquote>

          {/* Bottom */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">
              {review.date}
            </div>
            
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-primary-400"></div>
              <div className="w-1 h-1 bg-primary-400/60"></div>
              <div className="w-1 h-1 bg-primary-400/30"></div>
            </div>
          </div>
        </div>

        {/* Hover effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-400/5 to-transparent opacity-0 pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

import SectionBlend from './SectionBlend';

export default function CustomerReviews() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Jet Black Background */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Section blending for smooth transitions */}
      <div className="absolute inset-0">
        <SectionBlend position="both" height="xl" intensity="medium" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-1 bg-primary-400"></div>
            <span className="text-primary-400 font-medium text-sm uppercase tracking-[0.2em]">
              Client Testimonials
            </span>
          </div>

          <h2 className="text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
            PREMIUM
            <span className="block text-primary-400">VALIDATION</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl font-light leading-relaxed">
            Testimonials from industry leaders, medical professionals, and high-performance individuals who demand excellence.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* Overall Rating Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-jet-900 border border-white/20 p-16 max-w-4xl mx-auto relative overflow-hidden">
            {/* Sharp corner accents */}
            <div className="absolute top-0 left-0 w-0 h-0 border-r-[30px] border-r-transparent border-t-[30px] border-t-primary-400/30"></div>
            <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-b-[30px] border-b-primary-400/30"></div>

            <div className="relative">
              {/* Rating Display */}
              <div className="flex items-center justify-center space-x-6 mb-12">
                <div className="flex space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2 h-8 bg-primary-400"></div>
                  ))}
                </div>
                <span className="text-6xl font-bold text-white tracking-tight">4.9</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-400 mb-2 tracking-tight">1,247+</div>
                  <div className="text-gray-400 text-sm uppercase tracking-[0.15em]">Verified Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-400 mb-2 tracking-tight">98%</div>
                  <div className="text-gray-400 text-sm uppercase tracking-[0.15em]">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-400 mb-2 tracking-tight">5.0</div>
                  <div className="text-gray-400 text-sm uppercase tracking-[0.15em]">Average Rating</div>
                </div>
              </div>

              {/* Bottom text */}
              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-gray-300 font-light text-lg">
                  Trusted by professionals who demand the highest standards of quality and performance.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}