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
     
    </section>
  );
}
