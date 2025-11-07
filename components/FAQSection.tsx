'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQ {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    faqs?: FAQ[];
    title?: string;
}

const defaultFAQs: FAQ[] = [
    {
        question: 'What is Shilajit and where does it come from?',
        answer: 'Shilajit is a natural substance found primarily in the rocks of the Himalayas. It develops over centuries from the slow decomposition of plants and contains over 84 minerals and fulvic acid. Our Shilajit is sourced from pristine heights of 16,000+ feet in the Himalayas.'
    },
    {
        question: 'How should I take Shilajit?',
        answer: 'For resin: Take a rice grain-sized portion (300-500mg) dissolved in warm water or milk, twice daily on an empty stomach. For gummies: Take 2 gummies daily after meals. Best results are seen with consistent use for at least 3 months.'
    },
    {
        question: 'Is your Shilajit lab tested?',
        answer: 'Yes, every batch of our Shilajit is third-party lab tested for purity, heavy metals, and authenticity. We provide certificates of analysis and are certified by GMP, HACCP, ISO 22000, and FDA standards.'
    },
    {
        question: 'What are the main benefits of Shilajit?',
        answer: 'Shilajit offers numerous benefits including increased energy and stamina, enhanced cognitive function, improved immune system, better physical performance, anti-aging properties, and support for overall vitality and wellness.'
    },
    {
        question: 'Are there any side effects?',
        answer: 'Shilajit is generally safe when taken as directed. However, pregnant or nursing women, people with certain medical conditions, or those taking medications should consult their healthcare provider before use. Start with a smaller dose to assess tolerance.'
    },
    {
        question: 'How long does shipping take?',
        answer: 'We offer fast and secure delivery across India. Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 day delivery. All orders come with tracking information.'
    },
    {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with your purchase, you can return unopened products within 30 days for a full refund. Please contact our customer service team to initiate a return.'
    },
    {
        question: 'Do you offer wholesale or bulk pricing?',
        answer: 'Yes! We offer attractive wholesale rates with volume-based discounts. Minimum order quantity is 50 units per SKU. Visit our Wholesale page or contact our wholesale team for more information and pricing.'
    }
];

export default function FAQSection({ faqs = defaultFAQs, title = 'Frequently Asked Questions' }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-black relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center space-x-4 mb-8">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 48 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="h-1 bg-primary-400"
                        ></motion.div>
                        <span className="text-primary-400 font-medium text-sm uppercase tracking-[0.2em]">
                            Got Questions?
                        </span>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 48 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="h-1 bg-primary-400"
                        ></motion.div>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 uppercase tracking-wider">
                        {title}
                    </h2>
                    <p className="text-gray-300 text-lg">
                        Find answers to common questions about our products and services
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-jet-900 border border-white/20 overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="text-lg font-bold text-white pr-8">
                                    {faq.question}
                                </span>
                                <div className="flex-shrink-0">
                                    {openIndex === index ? (
                                        <Minus className="w-6 h-6 text-primary-400" />
                                    ) : (
                                        <Plus className="w-6 h-6 text-primary-400" />
                                    )}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-16 bg-jet-900 border border-white/20 p-8 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-primary-400/30"></div>

                    <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">
                        Still Have Questions?
                    </h3>
                    <p className="text-gray-300 mb-6">
                        Our customer support team is here to help you with any queries
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="bg-mauve-gradient text-white px-8 py-3 font-bold uppercase tracking-wider text-sm hover:bg-mauve-shine transition-colors"
                        >
                            Contact Us
                        </a>
                        <a
                            href="mailto:support@agnishila.com"
                            className="border-2 border-primary-400 text-primary-400 px-8 py-3 font-bold uppercase tracking-wider text-sm hover:bg-primary-400 hover:text-white transition-colors"
                        >
                            Email Support
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
