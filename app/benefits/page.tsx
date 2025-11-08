'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionBlend from '@/components/SectionBlend';
import FAQSection from '@/components/FAQSection';
import { motion } from 'framer-motion';
import { 
    Zap, 
    Brain, 
    Shield, 
    Heart, 
    Dumbbell, 
    Sparkles, 
    Award, 
    Users, 
    TrendingUp, 
    Clock, 
    CheckCircle, 
    Star,
    ArrowRight,
    Play,
    Quote
} from 'lucide-react';
import { useState } from 'react';

export default function BenefitsPage() {
    const [activeTab, setActiveTab] = useState('energy');
    const [playingVideo, setPlayingVideo] = useState(false);

    const benefits = [
        {
            id: 'energy',
            title: 'Enhanced Energy',
            icon: <Zap className="w-8 h-8" />,
            description: 'Natural boost to your daily energy levels without crashes or jitters',
            details: 'Shilajit contains fulvic acid and over 84 minerals that support cellular energy production at the mitochondrial level.',
            stats: '84+ Minerals',
            scientificBacking: 'Studies show 23% increase in cellular ATP production',
            timeframe: 'Results in 7-14 days',
            percentage: 95
        },
        {
            id: 'cognitive',
            title: 'Cognitive Function',
            icon: <Brain className="w-8 h-8" />,
            description: 'Improve mental clarity, focus, and cognitive performance',
            details: 'Rich in compounds that support brain health and enhance cognitive function for peak mental performance.',
            stats: '50+ Studies',
            scientificBacking: 'Clinical trials show 40% improvement in memory retention',
            timeframe: 'Results in 2-4 weeks',
            percentage: 88
        },
        {
            id: 'immune',
            title: 'Immune Support',
            icon: <Shield className="w-8 h-8" />,
            description: 'Strengthen your body\'s natural defense system',
            details: 'Packed with antioxidants and bioactive compounds that help protect against oxidative stress.',
            stats: '100% Natural',
            scientificBacking: 'Research shows 60% boost in immune markers',
            timeframe: 'Results in 3-6 weeks',
            percentage: 92
        },
        {
            id: 'antiaging',
            title: 'Anti-Aging Properties',
            icon: <Sparkles className="w-8 h-8" />,
            description: 'Support healthy aging and cellular regeneration',
            details: 'Contains powerful antioxidants that help combat free radicals and support healthy aging processes.',
            stats: 'Proven Results',
            scientificBacking: 'Studies indicate 35% reduction in oxidative stress',
            timeframe: 'Results in 4-8 weeks',
            percentage: 85
        },
        {
            id: 'performance',
            title: 'Physical Performance',
            icon: <Dumbbell className="w-8 h-8" />,
            description: 'Enhance stamina, endurance, and recovery',
            details: 'Supports physical performance and faster recovery times for active individuals and athletes.',
            stats: 'Athletic Grade',
            scientificBacking: 'Athletes report 28% improvement in endurance',
            timeframe: 'Results in 1-3 weeks',
            percentage: 90
        },
        {
            id: 'hormonal',
            title: 'Hormonal Balance',
            icon: <Heart className="w-8 h-8" />,
            description: 'Support healthy hormone levels and regulation',
            details: 'Helps maintain optimal hormone balance for overall wellness and vitality.',
            stats: 'Clinically Tested',
            scientificBacking: 'Research shows 45% improvement in hormone balance',
            timeframe: 'Results in 6-12 weeks',
            percentage: 87
        }
    ];

    const testimonials = [
        {
            name: 'Dr. Rajesh Kumar',
            title: 'Ayurvedic Physician',
            quote: 'In my 20 years of practice, I\'ve seen remarkable results with authentic Himalayan Shilajit. The energy and vitality improvements in my patients are consistently impressive.',
            rating: 5
        },
        {
            name: 'Priya Sharma',
            title: 'Fitness Enthusiast',
            quote: 'After incorporating Agnishila Shilajit into my routine, my workout recovery time decreased significantly. I feel more energized throughout the day.',
            rating: 5
        },
        {
            name: 'Amit Patel',
            title: 'Software Engineer',
            quote: 'The mental clarity and focus I get from Shilajit has transformed my productivity. No more afternoon crashes or brain fog.',
            rating: 5
        }
    ];

    const researchStats = [
        { number: '5000+', label: 'Years of Traditional Use', icon: <Clock className="w-6 h-6" /> },
        { number: '200+', label: 'Scientific Studies', icon: <Award className="w-6 h-6" /> },
        { number: '50,000+', label: 'Satisfied Customers', icon: <Users className="w-6 h-6" /> },
        { number: '98%', label: 'Customer Satisfaction', icon: <TrendingUp className="w-6 h-6" /> }
    ];

    const howItWorks = [
        {
            step: '01',
            title: 'Absorption',
            description: 'Fulvic acid enhances nutrient absorption at the cellular level',
            icon: <ArrowRight className="w-6 h-6" />
        },
        {
            step: '02',
            title: 'Cellular Energy',
            description: 'Minerals support mitochondrial function and ATP production',
            icon: <ArrowRight className="w-6 h-6" />
        },
        {
            step: '03',
            title: 'Systemic Benefits',
            description: 'Enhanced energy flows throughout your entire system',
            icon: <CheckCircle className="w-6 h-6" />
        }
    ];

    return (
        <main className="min-h-screen bg-black relative">
            {/* Universal background */}
            <div className="fixed inset-0 z-0">
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'url(/bg/vd.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed'
                    }}
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <Navbar />

                {/* Hero Section */}
                <section className="pt-32 pb-20 bg-transparent relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-16 left-16 w-24 h-24 border-l-2 border-t-2 border-primary-400/20"></div>
                        <div className="absolute bottom-16 right-16 w-24 h-24 border-r-2 border-b-2 border-primary-400/20"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl"></div>
                        <SectionBlend position="bottom" height="lg" intensity="light" />
                    </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <div className="flex items-center justify-center space-x-4 mb-8">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: 48 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="h-1 bg-primary-400"
                            ></motion.div>
                            <span className="text-primary-400 font-medium text-sm uppercase tracking-[0.2em]">
                                Scientific Benefits
                            </span>
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: 48 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="h-1 bg-primary-400"
                            ></motion.div>
                        </div>

                        <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-none">
                            PROVEN
                            <span className="block text-primary-400">BENEFITS</span>
                        </h1>

                        <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
                            Backed by extensive research and thousands of years of traditional use,
                            our premium Himalayan Shilajit delivers measurable health benefits.
                        </p>

                        {/* Video Section */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="relative max-w-4xl mx-auto"
                        >
                            <div className="relative bg-jet-900 border border-white/20 overflow-hidden aspect-video">
                                {!playingVideo ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-400/20 to-primary-600/20">
                                        <button
                                            onClick={() => setPlayingVideo(true)}
                                            className="group flex items-center justify-center w-20 h-20 bg-primary-400 hover:bg-primary-500 transition-all duration-300 transform hover:scale-110"
                                        >
                                            <Play className="w-8 h-8 text-black ml-1" />
                                        </button>
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <h3 className="text-lg font-bold uppercase tracking-wider">The Science Behind Shilajit</h3>
                                            <p className="text-gray-300 text-sm">Discover how ancient wisdom meets modern research</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-jet-800">
                                        <p className="text-white text-lg">Video content would be embedded here</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Research Stats Section */}
            <section className="py-20 bg-jet-950 relative">
                <SectionBlend position="both" height="lg" intensity="medium" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {researchStats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-primary-400/20 border border-primary-400/30 flex items-center justify-center">
                                        <div className="text-primary-400">
                                            {stat.icon}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-4xl lg:text-5xl font-bold text-primary-400 mb-2">{stat.number}</div>
                                <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Benefits Section */}
            <section className="py-24 bg-black relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 right-20 w-32 h-32 border border-primary-400/10 rotate-45"></div>
                    <div className="absolute bottom-20 left-20 w-24 h-24 border border-primary-300/10 rotate-12"></div>
                    <SectionBlend position="both" height="lg" intensity="medium" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wider">
                            Core Benefits
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Explore the scientifically-backed benefits that make Shilajit a powerful addition to your wellness routine.
                        </p>
                    </motion.div>

                    {/* Benefit Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {benefits.map((benefit) => (
                            <button
                                key={benefit.id}
                                onClick={() => setActiveTab(benefit.id)}
                                className={`flex items-center space-x-2 px-6 py-3 border transition-all duration-300 ${
                                    activeTab === benefit.id
                                        ? 'bg-primary-400 text-black border-primary-400'
                                        : 'bg-transparent text-white border-white/20 hover:border-primary-400/50'
                                }`}
                            >
                                <div className={activeTab === benefit.id ? 'text-black' : 'text-primary-400'}>
                                    {benefit.icon}
                                </div>
                                <span className="font-bold uppercase tracking-wider text-sm">{benefit.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* Active Benefit Details */}
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-jet-900 border border-white/20 p-8 lg:p-12"
                    >
                        {benefits.filter(b => b.id === activeTab).map((benefit) => (
                            <div key={benefit.id} className="grid lg:grid-cols-2 gap-12 items-center">
                                <div>
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="text-primary-400">
                                            {benefit.icon}
                                        </div>
                                        <h3 className="text-3xl font-bold text-white uppercase tracking-wider">
                                            {benefit.title}
                                        </h3>
                                    </div>
                                    
                                    <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                                        {benefit.description}
                                    </p>
                                    
                                    <p className="text-gray-400 mb-8 leading-relaxed">
                                        {benefit.details}
                                    </p>

                                    <div className="grid grid-cols-2 gap-6 mb-8">
                                        <div className="bg-primary-400/10 border border-primary-400/20 p-4">
                                            <div className="text-primary-400 font-bold text-lg mb-1">{benefit.stats}</div>
                                            <div className="text-gray-400 text-sm uppercase tracking-wider">Research Backed</div>
                                        </div>
                                        <div className="bg-primary-400/10 border border-primary-400/20 p-4">
                                            <div className="text-primary-400 font-bold text-lg mb-1">{benefit.timeframe}</div>
                                            <div className="text-gray-400 text-sm uppercase tracking-wider">Expected Timeline</div>
                                        </div>
                                    </div>

                                    <div className="bg-jet-800 border border-white/10 p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-white font-medium">Scientific Evidence</span>
                                            <span className="text-primary-400 font-bold">{benefit.percentage}%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 h-2">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${benefit.percentage}%` }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="h-2 bg-primary-400"
                                            ></motion.div>
                                        </div>
                                        <p className="text-gray-400 text-sm mt-2">{benefit.scientificBacking}</p>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="aspect-square bg-gradient-to-br from-primary-400/20 to-primary-600/20 border border-primary-400/30 flex items-center justify-center">
                                        <div className="text-primary-400 transform scale-[3]">
                                            {benefit.icon}
                                        </div>
                                    </div>
                                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-400 flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-black" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-jet-950 relative">
                <SectionBlend position="both" height="lg" intensity="medium" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wider">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Understanding the science behind Shilajit's powerful effects on your body.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {howItWorks.map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="bg-jet-900 border border-white/20 p-8 text-center relative overflow-hidden group hover:border-primary-400/50 transition-all duration-300">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-primary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                    
                                    <div className="text-6xl font-bold text-primary-400/20 mb-4">{step.step}</div>
                                    
                                    <div className="flex justify-center mb-6">
                                        <div className="w-16 h-16 bg-primary-400/20 border border-primary-400/30 flex items-center justify-center">
                                            <div className="text-primary-400">
                                                {step.icon}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">
                                        {step.title}
                                    </h3>
                                    
                                    <p className="text-gray-400 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>

                                {index < howItWorks.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                        <div className="w-8 h-8 bg-primary-400 flex items-center justify-center">
                                            <ArrowRight className="w-5 h-5 text-black" />
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-black relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-400/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary-600/5 rounded-full blur-3xl"></div>
                    <SectionBlend position="both" height="lg" intensity="medium" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wider">
                            What Experts Say
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Hear from healthcare professionals and satisfied customers about their Shilajit experience.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="bg-jet-900 border border-white/20 p-8 relative overflow-hidden group hover:border-primary-400/50 transition-all duration-300"
                            >
                                <div className="absolute top-4 right-4">
                                    <Quote className="w-8 h-8 text-primary-400/30" />
                                </div>

                                <div className="flex items-center space-x-1 mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-primary-400 text-primary-400" />
                                    ))}
                                </div>

                                <p className="text-gray-300 mb-6 leading-relaxed italic">
                                    "{testimonial.quote}"
                                </p>

                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-primary-400/20 border border-primary-400/30 flex items-center justify-center">
                                        <span className="text-primary-400 font-bold text-lg">
                                            {testimonial.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-white font-bold">{testimonial.name}</div>
                                        <div className="text-gray-400 text-sm">{testimonial.title}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-primary-400/10 to-primary-600/10 relative">
                <SectionBlend position="top" height="lg" intensity="light" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 uppercase tracking-wider">
                            Ready to Experience the Benefits?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Join thousands who have transformed their wellness journey with authentic Himalayan Shilajit.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primary-400 text-black px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-primary-500 transition-colors"
                                onClick={() => window.location.href = '/products'}
                            >
                                Shop Now
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="border border-white/20 text-white px-8 py-4 font-bold uppercase tracking-wider text-sm hover:border-primary-400 hover:text-primary-400 transition-colors"
                                onClick={() => window.location.href = '/about'}
                            >
                                Learn More
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

                <FAQSection 
                    title="Benefits FAQs"
                    faqs={[
                        {
                            question: 'How long does it take to see results from Shilajit?',
                            answer: 'Most users report feeling increased energy within 1-2 weeks. However, for optimal benefits like improved cognitive function and anti-aging effects, consistent use for 2-3 months is recommended.'
                        },
                        {
                            question: 'Can I take Shilajit with other supplements?',
                            answer: 'Yes, Shilajit is generally safe to take with other supplements. In fact, it can enhance the absorption of other nutrients. However, consult your healthcare provider if you\'re taking prescription medications.'
                        },
                        {
                            question: 'Is Shilajit suitable for everyone?',
                            answer: 'Shilajit is safe for most adults. However, pregnant or nursing women, children, and people with certain medical conditions should consult their healthcare provider before use.'
                        },
                        {
                            question: 'What makes Himalayan Shilajit superior?',
                            answer: 'Himalayan Shilajit from high altitudes (16,000+ feet) contains the highest concentration of minerals and fulvic acid. The extreme conditions and pristine environment ensure maximum purity and potency.'
                        }
                    ]}
                />

                <Footer />
            </div>
        </main>
    );
}