'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Zap, Leaf, FlaskConical } from 'lucide-react';

const benefits = [
  {
    icon: <CheckCircle className="w-12 h-12" />,
    title: 'Made from Proprietary Shilajit Resin',
    description: 'Our advanced 7th generation Purification Technology ensures a highly purified and more bioavailable form of Shilajit extract for maximum effectiveness.'
  },
  {
    icon: <Zap className="w-12 h-12" />,
    title: '2.5x Higher Bioavailability',
    description: 'Engineered for superior absorption, delivering faster and more noticeable benefits compared to regular Shilajit.'
  },
  {
    icon: <Leaf className="w-12 h-12" />,
    title: '100% Natural',
    description: 'No artificial colors, flavors, or preservatives - just clean, high-quality Shilajit in its premium gummy form.'
  },
  {
    icon: <FlaskConical className="w-12 h-12" />,
    title: 'Every Batch Third Party Lab Tested',
    description: 'Each and Every Batch that you receive is 3rd Party Tested - Certified for Purity, Safety, and Quality - Guaranteed.'
  }
];

export default function WhyChoose() {
  return (
    <section className="py-20 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 uppercase tracking-wider">
            Why choose Shilajit Gummies
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-jet-900 border border-white/20 p-8 text-center relative overflow-hidden group hover:border-primary-400/50 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-primary-400/30 group-hover:border-t-primary-400/50 transition-all duration-300"></div>
              
              <div className="w-20 h-20 bg-primary-400/20 border-2 border-primary-400/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-primary-400">
                  {benefit.icon}
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">
                {benefit.title}
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
