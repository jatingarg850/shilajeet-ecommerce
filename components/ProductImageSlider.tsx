'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageSliderProps {
  productId: string;
  productName: string;
  frontImage: string;
}

// Product image mappings
const productImages: { [key: string]: { front: string; back: string } } = {
  'agnishila-trublk-gold-resin': {
    front: '/selling/shilajit banner.jpg',
    back: '/selling/shilajit banner.jpg back.jpg'
  },
  'agnishila-shilajit-gummies': {
    front: '/selling/shilaboostimgae.jpg',
    back: '/selling/shilaboostimgae.jpg back.jpg'
  },
  'ashwa-glo-gummies': {
    front: '/selling/aswaglo iamge.jpg',
    back: '/selling/aswaglo iamge.jpg back.jpg'
  }
};

export default function ProductImageSlider({ productId, productName, frontImage }: ProductImageSliderProps) {
  const images = productImages[productId] || { front: frontImage, back: frontImage };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageArray = [images.front, images.back];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-jet-900 border border-white/20 p-6 lg:p-8 relative overflow-hidden flex flex-col lg:sticky lg:top-24 lg:self-start"
    >
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-primary-400/30"></div>

      {/* Image Container */}
      <div className="aspect-square bg-jet-800 flex items-center justify-center mb-6 relative overflow-hidden rounded-lg">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src={imageArray[currentImageIndex]}
            alt={`${productName} - ${currentImageIndex === 0 ? 'Front' : 'Back'}`}
            width={320}
            height={320}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>

        {/* Navigation Buttons */}
        {imageArray.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {imageArray.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-primary-400' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Image Label */}
      <div className="text-center mb-6 text-sm text-gray-400 uppercase tracking-wider">
        {currentImageIndex === 0 ? 'Front View' : 'Back View'}
      </div>

      {/* Product Actions Placeholder */}
      <div className="flex items-center justify-between pt-6 border-t border-white/20">
        <span className="text-xs text-gray-500">Swipe or click arrows to view</span>
      </div>
    </motion.div>
  );
}
