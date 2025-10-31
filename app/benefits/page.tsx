import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BenefitsPage() {
    const benefits = [
        {
            title: 'Enhanced Energy',
            description: 'Natural boost to your daily energy levels without crashes or jitters',
            details: 'Shilajit contains fulvic acid and over 84 minerals that support cellular energy production at the mitochondrial level.',
            stats: '84+ Minerals'
        },
        {
            title: 'Cognitive Function',
            description: 'Improve mental clarity, focus, and cognitive performance',
            details: 'Rich in compounds that support brain health and enhance cognitive function for peak mental performance.',
            stats: '50+ Studies'
        },
        {
            title: 'Immune Support',
            description: 'Strengthen your body\'s natural defense system',
            details: 'Packed with antioxidants and bioactive compounds that help protect against oxidative stress.',
            stats: '100% Natural'
        },
        {
            title: 'Anti-Aging Properties',
            description: 'Support healthy aging and cellular regeneration',
            details: 'Contains powerful antioxidants that help combat free radicals and support healthy aging processes.',
            stats: 'Proven Results'
        },
        {
            title: 'Physical Performance',
            description: 'Enhance stamina, endurance, and recovery',
            details: 'Supports physical performance and faster recovery times for active individuals and athletes.',
            stats: 'Athletic Grade'
        },
        {
            title: 'Hormonal Balance',
            description: 'Support healthy hormone levels and regulation',
            details: 'Helps maintain optimal hormone balance for overall wellness and vitality.',
            stats: 'Clinically Tested'
        }
    ];

    return (
        <main className="min-h-screen bg-black">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-black relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-16 left-16 w-24 h-24 border-l-2 border-t-2 border-primary-400/20"></div>
                    <div className="absolute bottom-16 right-16 w-24 h-24 border-r-2 border-b-2 border-primary-400/20"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-20">
                        <div className="flex items-center justify-center space-x-4 mb-8">
                            <div className="w-12 h-1 bg-primary-400"></div>
                            <span className="text-primary-400 font-medium text-sm uppercase tracking-[0.2em]">
                                Scientific Benefits
                            </span>
                            <div className="w-12 h-1 bg-primary-400"></div>
                        </div>

                        <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-none">
                            PROVEN
                            <span className="block text-primary-400">BENEFITS</span>
                        </h1>

                        <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
                            Backed by extensive research and thousands of years of traditional use,
                            our premium Himalayan Shilajit delivers measurable health benefits.
                        </p>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit) => (
                            <div key={benefit.title} className="bg-jet-900 border border-white/20 p-8 relative overflow-hidden group hover:border-primary-400/50 transition-all duration-300">
                                <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-primary-400/30 group-hover:border-t-primary-400/50 transition-all duration-300"></div>

                                <div className="mb-6">
                                    <div className="text-primary-400 font-bold text-lg mb-2 uppercase tracking-wider">{benefit.stats}</div>
                                    <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">{benefit.title}</h3>
                                    <p className="text-gray-400 mb-4 font-light">{benefit.description}</p>
                                    <p className="text-gray-500 text-sm font-light leading-relaxed">{benefit.details}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}