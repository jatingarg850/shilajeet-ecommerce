import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
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
          <div className="text-center mb-20">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-12 h-1 bg-primary-400"></div>
              <span className="text-primary-400 font-medium text-sm uppercase tracking-[0.2em]">
                Get In Touch
              </span>
              <div className="w-12 h-1 bg-primary-400"></div>
            </div>

            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-none">
              CONTACT
              <span className="block text-primary-400">US</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Have questions about our premium Himalayan Shilajit products? 
              Our expert team is here to help you on your wellness journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-jet-900 border border-white/20 p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-primary-400/30"></div>
              
              <h2 className="text-3xl font-bold text-white mb-8 uppercase tracking-wider">Send Message</h2>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2 uppercase tracking-wider">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:border-primary-400 focus:outline-none transition-colors"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2 uppercase tracking-wider">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:border-primary-400 focus:outline-none transition-colors"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:border-primary-400 focus:outline-none transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:border-primary-400 focus:outline-none transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2 uppercase tracking-wider">
                    Subject
                  </label>
                  <select className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:border-primary-400 focus:outline-none transition-colors">
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="order-support">Order Support</option>
                    <option value="wholesale">Wholesale Opportunities</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:border-primary-400 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-400 text-black py-4 font-bold uppercase tracking-wider text-sm hover:bg-primary-500 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-jet-900 border border-white/20 p-8 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-0 h-0 border-r-[20px] border-r-transparent border-b-[20px] border-b-primary-400/30"></div>
                
                <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-primary-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Address</h4>
                      <p className="text-gray-400">123 Wellness Street<br />Health City, HC 12345</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-primary-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Phone</h4>
                      <p className="text-gray-400">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-primary-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Email</h4>
                      <p className="text-gray-400">info@shilajitco.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-primary-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Business Hours</h4>
                      <p className="text-gray-400">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="bg-jet-900 border border-white/20 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-primary-400/30"></div>
                
                <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">Quick Help</h3>
                
                <div className="space-y-4">
                  <a href="/faq" className="block text-gray-300 hover:text-primary-400 transition-colors border-l-2 border-transparent hover:border-primary-400 pl-4 py-2">
                    Frequently Asked Questions
                  </a>
                  <a href="/shipping" className="block text-gray-300 hover:text-primary-400 transition-colors border-l-2 border-transparent hover:border-primary-400 pl-4 py-2">
                    Shipping & Delivery Info
                  </a>
                  <a href="/returns" className="block text-gray-300 hover:text-primary-400 transition-colors border-l-2 border-transparent hover:border-primary-400 pl-4 py-2">
                    Returns & Exchanges
                  </a>
                  <a href="/wholesale" className="block text-gray-300 hover:text-primary-400 transition-colors border-l-2 border-transparent hover:border-primary-400 pl-4 py-2">
                    Wholesale Inquiries
                  </a>
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