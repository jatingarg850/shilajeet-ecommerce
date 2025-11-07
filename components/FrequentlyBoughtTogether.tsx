'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
}

interface FrequentlyBoughtTogetherProps {
  mainProduct: Product;
  bundleProducts: Product[];
}

export default function FrequentlyBoughtTogether({ mainProduct, bundleProducts }: FrequentlyBoughtTogetherProps) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([mainProduct.id, ...bundleProducts.map(p => p.id)]);

  const toggleProduct = (productId: string) => {
    if (productId === mainProduct.id) return; // Main product always selected
    
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const allProducts = [mainProduct, ...bundleProducts];
  const totalPrice = allProducts
    .filter(p => selectedProducts.includes(p.id))
    .reduce((sum, p) => sum + p.price, 0);
  const totalOriginalPrice = allProducts
    .filter(p => selectedProducts.includes(p.id))
    .reduce((sum, p) => sum + p.originalPrice, 0);
  const savings = totalOriginalPrice - totalPrice;

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-jet-900 border border-white/20 p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-wider text-center">
            Frequently Bought Together
          </h2>
          <p className="text-primary-400 text-center mb-8">
            Bundle up and get extra 6% off
          </p>

          {/* Products Grid */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            {allProducts.map((product, index) => (
              <div key={product.id} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="relative"
                >
                  <div className={`bg-white p-4 border-2 ${selectedProducts.includes(product.id) ? 'border-primary-400' : 'border-gray-300'} transition-all duration-300`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </div>
                  
                  {product.id !== mainProduct.id && (
                    <button
                      onClick={() => toggleProduct(product.id)}
                      className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        selectedProducts.includes(product.id)
                          ? 'bg-primary-400 text-white'
                          : 'bg-gray-400 text-white'
                      }`}
                    >
                      {selectedProducts.includes(product.id) ? '✓' : ''}
                    </button>
                  )}

                  <div className="mt-3 text-center">
                    <p className="text-white text-sm font-medium line-clamp-2">{product.name}</p>
                    <p className="text-primary-400 font-bold mt-1">₹{product.price}</p>
                  </div>
                </motion.div>

                {index < allProducts.length - 1 && (
                  <Plus className="w-6 h-6 text-gray-400 mx-2" />
                )}
              </div>
            ))}
          </div>

          {/* Pricing Summary */}
          <div className="bg-black border border-white/20 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-300">Total Price:</span>
              <div className="text-right">
                <span className="text-gray-500 line-through mr-2">₹{totalOriginalPrice}</span>
                <span className="text-2xl font-bold text-primary-400">₹{totalPrice}</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">You Save:</span>
              <span className="text-green-400 font-bold">₹{savings} ({Math.round((savings / totalOriginalPrice) * 100)}% off)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            <button className="bg-mauve-gradient text-white py-4 px-6 font-bold uppercase tracking-wider hover:bg-mauve-shine transition-colors">
              Add Selected to Cart
            </button>
            <button className="border-2 border-primary-400 text-primary-400 py-4 px-6 font-bold uppercase tracking-wider hover:bg-primary-400 hover:text-white transition-colors">
              Buy Bundle Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
