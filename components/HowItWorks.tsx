'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Package, Truck, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: <ShoppingCart className="w-8 h-8" />,
    title: 'Order',
    description: 'Browse our premium collection and add your favorite products to cart'
  },
  {
    icon: <Package className="w-8 h-8" />,
    title: 'KYC-44 Ashwagandha',
    description: 'Premium Ashwagandha with KSM-66 for stress relief and vitality'
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'Delivery',
    description: 'Fast and secure delivery to your doorstep with tracking'
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: 'Black Haldi',
    description: 'Rare Black Turmeric for enhanced immunity and wellness'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white-to-mauve mb-4 uppercase tracking-wider">
            How does it work?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-jet-900 border border-white/20 p-6 relative overflow-hidden group hover:border-primary-400/50 transition-all duration-300 flex flex-col"
            >
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-primary-400/30 group-hover:border-t-primary-400/50 transition-all duration-300"></div>
              
              <div className="w-16 h-16 bg-primary-400/20 border border-primary-400/30 flex items-center justify-center mx-auto mb-6">
                <div className="text-primary-400">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider text-center">
                {step.title}
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed text-center flex-grow">
                {step.description}
              </p>

              <button className="mt-6 w-full bg-mauve-gradient text-white py-2 px-4 font-bold uppercase tracking-wider text-xs hover:bg-mauve-shine transition-colors">
                Learn More
              </button>
            </motion.div>
          ))}
        </div>

        {/* Full List of Ingredients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 bg-jet-900 border border-white/20 p-8"
        >
          <h3 className="text-2xl font-bold text-white-to-mauve mb-6 uppercase tracking-wider">
            Full List of Ingredients
          </h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            Imported Isolate: Whey Protein Isolate, Whey Protein Concentrate (Milk), Emulsifier (Soya Lecithin), Digestive Enzyme Blend (Protease, Amylase, Cellulase, Lactase, Lipase), Sweetener (Sucralose), Flavour, Colour.
          </p>
          <p className="text-gray-400 text-sm">
            Allergen Information: Contains Milk and Soya. May contain traces of Gluten, Eggs, Peanuts, Tree Nuts, Fish, Crustaceans, Molluscs, Sesame Seeds, Sulphur Dioxide and Sulphites.
          </p>
        </motion.div>

        {/* How to Use */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 bg-jet-900 border border-white/20 p-8"
        >
          <h3 className="text-2xl font-bold text-white-to-mauve mb-6 uppercase tracking-wider">
            How to Use
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
              <p className="text-gray-300">
                <strong className="text-white">Consume:</strong> 2 Gummies daily after a meal
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
              <p className="text-gray-300">
                <strong className="text-white">Dosage:</strong> Do not exceed recommended dosage
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
