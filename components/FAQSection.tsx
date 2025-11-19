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
    
];

export default function FAQSection({ faqs = defaultFAQs, title = 'Frequently Asked Questions' }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-black relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
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
