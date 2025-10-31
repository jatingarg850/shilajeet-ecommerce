'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ShoppingCart, Star, Sparkles, Award, Zap } from 'lucide-react';
import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Shilajit Resin',
    price: 89.99,
    originalPrice: 119.99,
    image: '/images/image-removebg-preview.png',
    rating: 4.9,
    reviews: 234,
    description: 'Pure Himalayan Shilajit resin for maximum potency and absorption',
    badge: 'BESTSELLER',
    badgeColor: 'from-red-500 to-pink-500',
    icon: <Award className="w-5 h-5" />,
    features: ['100% Pure', 'Lab Tested', 'Premium Grade']
  },
  {
    id: 2,
    name: 'Shilajit Capsules',
    price: 59.99,
    originalPrice: 79.99,
    image: '/images/image-removebg-preview.png',
    rating: 4.8,
    reviews: 189,
    description: 'Convenient capsule form for daily supplementation on the go',
    badge: 'POPULAR',
    badgeColor: 'from-blue-500 to-cyan-500',
    icon: <Zap className="w-5 h-5" />,
    features: ['Easy Dosage', 'Travel Friendly', 'Fast Acting']
  },
  {
    id: 3,
    name: 'Shilajit Powder',
    price: 69.99,
    originalPrice: 89.99,
    image: '/images/image-removebg-preview.png',
    rating: 4.7,
    reviews: 156,
    description: 'Fine powder blend perfect for mixing with beverages',
    badge: 'NEW',
    badgeColor: 'from-green-500 to-emerald-500',
    icon: <Sparkles className="w-5 h-5" />,
    features: ['Versatile', 'Quick Mix', 'Pure Extract']
  }
];

const ProductCard = ({ product, index }: { product: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      viewport={{ once: true }}
      className="group perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        whileHover={{ z: 50 }}
        className="relative bg-gradient-to-br from-jet-800 to-black border border-white/20 overflow-hidden transform-gpu"
      >
        {/* Sharp corner accent */}
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[24px] border-l-transparent border-t-[24px] border-t-primary-400/30 group-hover:border-t-primary-400/50 transition-all duration-300"></div>

        {/* Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.15 + 0.5, type: "spring", stiffness: 200 }}
          className="absolute top-4 left-4 z-20"
        >
          <div className="bg-primary-400 text-black px-3 py-1 text-xs font-bold uppercase tracking-wide">
            {product.badge}
          </div>
        </motion.div>

        {/* Product image section */}
        <div className="relative h-72 overflow-hidden bg-jet-900">
          {/* Product image */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-48 h-48 object-contain drop-shadow-2xl"
              animate={{
                y: isHovered ? -10 : 0,
              }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        </div>

        {/* Content section */}
        <div className="relative p-8 space-y-6">
          {/* Rating and price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-1 h-4 bg-primary-400"></div>
                ))}
              </div>
              <span className="text-white font-bold text-sm">{product.rating}</span>
            </div>

            <div className="text-right">
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 text-sm line-through">${product.originalPrice}</span>
                <span className="text-2xl font-bold text-primary-400 tracking-tight">
                  ${product.price}
                </span>
              </div>
            </div>
          </div>

          {/* Product name */}
          <div className="flex items-center space-x-3">
            <motion.div
              className="text-primary-400"
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.6 }}
            >
              {product.icon}
            </motion.div>
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">{product.name}</h3>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed font-light">
            {product.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {product.features.map((feature: string, i: number) => (
              <motion.span
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 + 1 + i * 0.1 }}
                className="text-xs bg-primary-400/10 text-primary-300 px-3 py-1 border border-primary-400/20 uppercase tracking-wider font-medium"
              >
                {feature}
              </motion.span>
            ))}
          </div>

          {/* Add to cart button */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary-400 hover:bg-primary-500 text-black py-4 px-6 font-bold flex items-center justify-center space-x-3 transition-all duration-300 uppercase tracking-wider"
          >
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <ShoppingCart size={18} />
            </motion.div>
            <span>Add to Cart</span>
          </motion.button>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-400/5 via-transparent to-primary-600/5 pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default function FeaturedProducts() {
  return (
    <section className="py-24 bg-jet-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 border border-primary-400/10 rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-primary-300/10 rotate-12"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >


          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Featured Products
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover our premium collection of authentic Himalayan Shilajit products,
            each carefully sourced and lab-tested for purity and potency.
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-transparent border-2 border-primary-400 text-primary-400 hover:text-dark-950 px-10 py-4 rounded-xl font-bold transition-all duration-300 overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-primary-400"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center space-x-2">
              <span>View All Products</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}