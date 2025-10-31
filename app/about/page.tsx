import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-16 left-16 w-24 h-24 border-l-2 border-t-2 border-primary-400/20"></div>
          <div className="absolute bottom-16 right-16 w-24 h-24 border-r-2 border-b-2 border-primary-400/20"></div>
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px'
            }} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-1 bg-primary-400"></div>
                <span className="text-primary-400 font-medium text-sm uppercase tracking-[0.2em]">
                  Our Story
                </span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-none">
                ABOUT
                <span className="block text-primary-400">SHILAJIT CO.</span>
              </h1>
              
              <div className="space-y-6 text-gray-300 font-light leading-relaxed">
                <p className="text-xl">
                  Founded on the principles of purity, potency, and performance, Shilajit Co. represents 
                  the pinnacle of Himalayan wellness supplementation.
                </p>
                
                <p>
                  Our journey began with a simple mission: to bring the ancient power of authentic 
                  Himalayan Shilajit to modern high-performance individuals who demand nothing but excellence.
                </p>
                
                <p>
                  Every product in our collection is sourced directly from pristine high-altitude regions 
                  of the Himalayas, processed using traditional methods, and rigorously tested to meet 
                  pharmaceutical-grade standards.
                </p>
              </div>
            </div>

            {/* Right Content - Stats */}
            <div className="bg-jet-900 border border-white/20 p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-0 h-0 border-r-[30px] border-r-transparent border-t-[30px] border-t-primary-400/30"></div>
              <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-b-[30px] border-b-primary-400/30"></div>

              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-8 uppercase tracking-wider">Our Impact</h2>
                
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-400 mb-2 tracking-tight">25K+</div>
                    <div className="text-gray-400 text-sm uppercase tracking-wider">Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-400 mb-2 tracking-tight">16K+</div>
                    <div className="text-gray-400 text-sm uppercase tracking-wider">Feet Altitude</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-400 mb-2 tracking-tight">100%</div>
                    <div className="text-gray-400 text-sm uppercase tracking-wider">Pure Grade</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-400 mb-2 tracking-tight">50+</div>
                    <div className="text-gray-400 text-sm uppercase tracking-wider">Studies</div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                  <p className="text-gray-300 font-light text-center">
                    Trusted by professionals worldwide for premium wellness solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}