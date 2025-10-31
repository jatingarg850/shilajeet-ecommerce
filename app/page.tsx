import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import InnovativeCarousel from '@/components/InnovativeCarousel';
import CustomerReviews from '@/components/CustomerReviews';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      <InnovativeCarousel />
      <CustomerReviews />
      <NewsletterSection />
      <Footer />
    </main>
  );
}