import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-black relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-16 w-24 h-24 border-l-2 border-t-2 border-primary-400/20"></div>
          <div className="absolute bottom-16 right-16 w-24 h-24 border-r-2 border-b-2 border-primary-400/20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-12 h-1 bg-primary-400"></div>
              <span className="text-primary-400 font-medium text-sm uppercase tracking-[0.2em]">
                Premium Collection
              </span>
              <div className="w-12 h-1 bg-primary-400"></div>
            </div>

            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-none">
              OUR
              <span className="block text-primary-400">PRODUCTS</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Discover our complete range of pharmaceutical-grade Himalayan Shilajit products, 
              each meticulously sourced and lab-tested for uncompromising quality.
            </p>
          </div>

          {/* Product Categories */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {['Resin', 'Capsules', 'Powder'].map((category, index) => (
              <div key={category} className="bg-jet-900 border border-white/20 p-8 relative overflow-hidden group hover:border-primary-400/50 transition-all duration-300">
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-primary-400/30 group-hover:border-t-primary-400/50 transition-all duration-300"></div>
                
                <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">{category}</h3>
                <p className="text-gray-400 mb-6 font-light">Premium {category.toLowerCase()} form for optimal absorption and convenience.</p>
                
                <button className="bg-primary-400 text-black px-6 py-2 font-bold uppercase tracking-wider text-sm hover:bg-primary-500 transition-colors">
                  View Products
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}