'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Zap, Leaf, FlaskConical } from 'lucide-react';

const benefits = [
  {
    icon: <CheckCircle className="w-12 h-12" />,
    title: 'Pure & Potent Formulations',
    description: 'Our TruBlk™ Shilajit embodies the finest expression of Shilajit - contain high fulvic acid, maximum bioavailability, and zero unnecessary fillers.'
  },
  {
    icon: <Leaf className="w-12 h-12" />,
    title: 'Authentic Himalayan Sourcing',
    description: 'We source Shilajit from the untouched high-altitude Himalayan regions, ensuring purity, strength, and natural energy.'
  },
  {
    icon: <FlaskConical className="w-12 h-12" />,
    title: 'Lab-Tested for Safety',
    description: 'Every batch is FSSAI approved, 3rd-party lab verified and tested for heavy metals, ensuring total safety.'
  },
  {
    icon: <Zap className="w-12 h-12" />,
    title: 'GMP, HACCP & FDA-Compliant',
    description: 'Every batch of TruBlk™ undergoes exhaustive screening for heavy metals, solvent residues, microbial contaminants, and adulterants. Manufactured in GMP- and ISO-certified facilities.'
  }
];

interface WhyChooseProps {
  productName?: string;
}

export default function WhyChoose({ productName = 'Agnishila TruBlk™' }: WhyChooseProps) {
  return (
    <section className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white-to-mauve mb-6 uppercase tracking-wider">
            Why Choose {productName}?
          </h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            At Agnishila, after years of research we bring the purest form of Himalayan wellness straight to you — Shilajit enters a new era - one defined by proof, purity, and purpose.
          </p>
          <p className="text-base text-gray-400 max-w-3xl mx-auto leading-relaxed mt-4">
            Introducing {productName} — the gold standard in clinically validated, globally compliant Shilajit. Born in India. Built for global trust.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-jet-900 border border-white/20 p-6 lg:p-8 text-center relative overflow-hidden group hover:border-primary-400/50 transition-all duration-300 flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-primary-400/30 group-hover:border-t-primary-400/50 transition-all duration-300"></div>
              
              <div className="w-20 h-20 bg-primary-400/20 border-2 border-primary-400/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-primary-400">
                  {benefit.icon}
                </div>
              </div>

              <h3 className="text-base lg:text-lg font-bold text-white mb-4 uppercase tracking-wider">
                {benefit.title}
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed flex-grow">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
