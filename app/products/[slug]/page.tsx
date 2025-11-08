'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionBlend from '@/components/SectionBlend';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingCart,
    Star,
    ArrowLeft,
    Check,
    Shield,
    Truck,
    Award,
    Heart,
    Share2,
    Plus,
    Minus
} from 'lucide-react';
import ProductDetailsTabs from '@/components/ProductDetailsTabs';
import FrequentlyBoughtTogether from '@/components/FrequentlyBoughtTogether';
import WhyChoose from '@/components/WhyChoose';
import FAQSection from '@/components/FAQSection';

const products = [
    {
        id: 'agnishila-gold-shilajit-resin',
        name: 'Agnishila Gold Shilajit Resin',
        price: 2499,
        originalPrice: 3499,
        image: '/images/image-removebg-preview.png',
        rating: 4.9,
        reviews: 1247,
        description: 'Premium Himalayan Shilajit resin with 24K gold flakes. The ultimate vitality booster for peak performance.',
        features: ['24K Gold Infused', '100% Pure', 'Lab Tested', '30g Premium Jar'],
        detailedDescription: 'Sourced from the pristine heights of 16,000+ feet in the Himalayas, our Gold Shilajit Resin is enhanced with pure 24K gold flakes for maximum bioavailability. This ancient superfood contains over 84 minerals and fulvic acid to boost energy, enhance cognitive function, and support overall vitality.',
        ingredients: ['Pure Himalayan Shilajit', '24K Gold Flakes', 'Fulvic Acid', '84+ Trace Minerals'],
        benefits: ['Boosts Energy & Stamina', 'Enhances Cognitive Function', 'Supports Immune System', 'Improves Physical Performance', 'Anti-Aging Properties'],
        usage: 'Take a rice grain-sized portion (300-500mg) dissolved in warm water or milk, twice daily on empty stomach.',
        certifications: ['3rd Party Lab Tested', 'Heavy Metal Free', 'Ayush Certified', 'GMP Certified']
    },
    {
        id: 'agnishila-shilajit-gummies',
        name: 'Agnishila Shilajit Gummies',
        price: 1299,
        originalPrice: 1799,
        image: '/images/image-removebg-preview (1).png',
        rating: 4.8,
        reviews: 892,
        description: 'Delicious and convenient Shilajit gummies for daily wellness. Perfect for busy lifestyles.',
        features: ['Natural Flavors', 'Easy Dosage', 'Travel Friendly', '60 Gummies'],
        detailedDescription: 'Our Shilajit Gummies make ancient wellness accessible and enjoyable. Each gummy contains standardized Shilajit extract equivalent to 500mg of pure resin, combined with natural fruit flavors for a delightful daily ritual.',
        ingredients: ['Shilajit Extract (500mg equivalent)', 'Natural Fruit Flavors', 'Organic Cane Sugar', 'Pectin', 'Natural Colors'],
        benefits: ['Sustained Energy Release', 'Improved Focus & Clarity', 'Enhanced Mood', 'Better Sleep Quality', 'Stress Management'],
        usage: 'Take 2 gummies daily, preferably with meals. Do not exceed recommended dosage.',
        certifications: ['Vegetarian', 'No Artificial Preservatives', 'Lab Tested', 'Ayush Approved']
    },
    {
        id: 'agnishila-ashwagandha-gummies',
        name: 'Agnishila Ashwagandha Gummies',
        price: 999,
        originalPrice: 1399,
        image: '/images/image.png',
        rating: 4.7,
        reviews: 654,
        description: 'Premium Ashwagandha gummies for stress relief and adaptogenic support. Naturally delicious.',
        features: ['KSM-66 Ashwagandha', 'Stress Relief', 'Natural Taste', '60 Gummies'],
        detailedDescription: 'Formulated with clinically studied KSM-66 Ashwagandha root extract, these gummies provide powerful adaptogenic support to help your body manage stress naturally while promoting calm energy and mental clarity.',
        ingredients: ['KSM-66 Ashwagandha Extract (600mg)', 'Natural Berry Flavors', 'Organic Sweeteners', 'Pectin', 'Vitamin D3'],
        benefits: ['Reduces Stress & Anxiety', 'Improves Sleep Quality', 'Enhances Physical Performance', 'Supports Hormonal Balance', 'Boosts Immunity'],
        usage: 'Take 2 gummies daily, preferably in the evening. Can be taken with or without food.',
        certifications: ['Clinically Studied KSM-66', 'Vegan Friendly', 'Third Party Tested', 'FDA Registered Facility']
    }
];

interface Review {
    _id: string;
    userId: string;
    userName: string;
    rating: number;
    title: string;
    comment: string;
    createdAt: string;
    verified: boolean;
}

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { addItem } = useCart();
    const { user, isAuthenticated } = useAuth();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [activeTab, setActiveTab] = useState('description');
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewForm, setReviewForm] = useState({
        rating: 5,
        title: '',
        comment: ''
    });
    const [submittingReview, setSubmittingReview] = useState(false);
    const [wishlistLoading, setWishlistLoading] = useState(false);

    const product = products.find(p => p.id === params.slug);

    useEffect(() => {
        if (product) {
            fetchReviews();
        }
    }, [product]);

    const fetchReviews = async () => {
        try {
            const response = await fetch(`/api/reviews/${product?.id}`);
            if (response.ok) {
                const reviewsData = await response.json();
                setReviews(reviewsData);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoadingReviews(false);
        }
    };

    const handleAddToCart = async () => {
        if (!product) return;

        setIsAdding(true);

        for (let i = 0; i < quantity; i++) {
            await addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
            });
        }

        setTimeout(() => {
            setIsAdding(false);
        }, 1000);
    };

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAuthenticated || !user) {
            alert('Please login to submit a review');
            return;
        }

        setSubmittingReview(true);

        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product?.id,
                    ...reviewForm,
                }),
            });

            if (response.ok) {
                setReviewForm({ rating: 5, title: '', comment: '' });
                setShowReviewForm(false);
                fetchReviews(); // Refresh reviews
            } else {
                alert('Failed to submit review. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review. Please try again.');
        } finally {
            setSubmittingReview(false);
        }
    };

    const handleWishlistToggle = async () => {
        if (!product) return;

        setWishlistLoading(true);

        if (isInWishlist(product.id)) {
            await removeFromWishlist(product.id);
        } else {
            await addToWishlist({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
            });
        }

        setWishlistLoading(false);
    };

    const handleShare = async () => {
        if (!product) return;

        const shareData = {
            title: product.name,
            text: product.description,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(window.location.href);
                alert('Product link copied to clipboard!');
            }
        } catch (error) {
            console.error('Error sharing:', error);
            // Fallback: copy to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert('Product link copied to clipboard!');
            } catch (clipboardError) {
                console.error('Clipboard error:', clipboardError);
                alert('Unable to share. Please copy the URL manually.');
            }
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (!product) {
        return (
            <main className="min-h-screen bg-black">
                <Navbar />
                <div className="pt-32 pb-20 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">Product Not Found</h1>
                        <button
                            onClick={() => router.push('/products')}
                            className="bg-primary-400 text-black px-6 py-3 font-bold uppercase tracking-wider text-sm hover:bg-primary-500 transition-colors"
                        >
                            Back to Products
                        </button>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

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

                <section className="pt-32 pb-20 bg-transparent relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-16 left-16 w-24 h-24 border-l-2 border-t-2 border-primary-400/20"></div>
                        <div className="absolute bottom-16 right-16 w-24 h-24 border-r-2 border-b-2 border-primary-400/20"></div>
                        <SectionBlend position="both" height="lg" intensity="medium" />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        {/* Back Button */}
                        <button
                            onClick={() => router.push('/products')}
                            className="flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors mb-8"
                        >
                            <ArrowLeft size={20} />
                            <span className="text-sm uppercase tracking-wider">Back to Products</span>
                        </button>

                        <div className="grid lg:grid-cols-2 gap-16 mb-16">
                            {/* Product Image */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-jet-900 border border-white/20 p-8 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-primary-400/30"></div>

                                <div className="aspect-square bg-jet-800 flex items-center justify-center">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={320}
                                        height={320}
                                        className="object-contain drop-shadow-2xl"
                                        priority
                                    />
                                </div>

                                {/* Product Actions */}
                                <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/20">
                                    <button
                                        onClick={handleWishlistToggle}
                                        disabled={wishlistLoading}
                                        className={`flex items-center space-x-2 transition-colors disabled:opacity-50 ${isInWishlist(product.id)
                                            ? 'text-primary-400'
                                            : 'text-gray-400 hover:text-primary-400'
                                            }`}
                                    >
                                        <Heart
                                            size={20}
                                            className={isInWishlist(product.id) ? 'fill-current' : ''}
                                        />
                                        <span className="text-sm uppercase tracking-wider">
                                            {wishlistLoading
                                                ? 'Loading...'
                                                : isInWishlist(product.id)
                                                    ? 'In Wishlist'
                                                    : 'Add to Wishlist'
                                            }
                                        </span>
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors"
                                    >
                                        <Share2 size={20} />
                                        <span className="text-sm uppercase tracking-wider">Share</span>
                                    </button>
                                </div>
                            </motion.div>

                            {/* Product Info */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-8"
                            >
                                {/* Header */}
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 uppercase tracking-wider">
                                        {product.name}
                                    </h1>

                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-5 h-5 fill-primary-400 text-primary-400" />
                                                ))}
                                            </div>
                                            <span className="text-white font-bold">{product.rating}</span>
                                            <span className="text-gray-400">({product.reviews} reviews)</span>
                                        </div>
                                    </div>

                                    <p className="text-xl text-gray-300 font-light leading-relaxed mb-6">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Price */}
                                <div className="bg-jet-900 border border-white/20 p-6">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <span className="text-gray-500 text-xl line-through">₹{product.originalPrice}</span>
                                        <span className="text-4xl font-bold text-primary-400">₹{product.price}</span>
                                        <span className="bg-green-600/20 text-green-400 px-3 py-1 text-sm font-bold uppercase tracking-wider border border-green-600/30">
                                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                        </span>
                                    </div>

                                    <div className="text-sm text-gray-400">
                                        Inclusive of all taxes • Free shipping on all orders
                                    </div>
                                </div>

                                {/* Features */}
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">Key Features</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {product.features.map((feature) => (
                                            <div key={feature} className="flex items-center space-x-2">
                                                <Check className="w-4 h-4 text-primary-400" />
                                                <span className="text-gray-300 text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity & Add to Cart */}
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-white font-bold uppercase tracking-wider">Quantity:</span>
                                        <div className="flex items-center space-x-2 bg-jet-900 border border-white/20">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="p-2 text-white hover:text-primary-400 transition-colors"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="text-white font-bold px-4 py-2 min-w-[3rem] text-center">
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="p-2 text-white hover:text-primary-400 transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        disabled={isAdding}
                                        className="w-full bg-primary-400 text-black py-4 font-bold uppercase tracking-wider text-sm hover:bg-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                    >
                                        <ShoppingCart size={18} />
                                        <span>{isAdding ? 'Adding to Cart...' : `Add ${quantity} to Cart`}</span>
                                    </button>
                                </div>

                                {/* Trust Badges */}
                                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
                                    <div className="text-center">
                                        <Shield className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                                        <div className="text-xs text-gray-400 uppercase tracking-wider">Lab Tested</div>
                                    </div>
                                    <div className="text-center">
                                        <Truck className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                                        <div className="text-xs text-gray-400 uppercase tracking-wider">Free Shipping</div>
                                    </div>
                                    <div className="text-center">
                                        <Award className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                                        <div className="text-xs text-gray-400 uppercase tracking-wider">Certified</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Product Details Tabs */}
                        <div className="bg-jet-900 border border-white/20 relative overflow-hidden mb-16">
                            <div className="absolute bottom-0 left-0 w-0 h-0 border-r-[30px] border-r-transparent border-b-[30px] border-b-primary-400/30"></div>

                            {/* Tab Navigation */}
                            <div className="flex border-b border-white/20">
                                {['description', 'ingredients', 'benefits', 'usage'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-8 py-4 font-bold uppercase tracking-wider text-sm transition-colors ${activeTab === tab
                                            ? 'text-primary-400 border-b-2 border-primary-400'
                                            : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="p-8">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'description' && (
                                        <motion.div
                                            key="description"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                        >
                                            <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">Product Description</h3>
                                            <p className="text-gray-300 leading-relaxed">{product.detailedDescription}</p>
                                        </motion.div>
                                    )}

                                    {activeTab === 'ingredients' && (
                                        <motion.div
                                            key="ingredients"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                        >
                                            <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">Ingredients</h3>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {product.ingredients.map((ingredient, index) => (
                                                    <div key={index} className="flex items-center space-x-3 p-3 bg-black border border-white/10">
                                                        <Check className="w-5 h-5 text-primary-400" />
                                                        <span className="text-gray-300">{ingredient}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'benefits' && (
                                        <motion.div
                                            key="benefits"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                        >
                                            <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">Health Benefits</h3>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {product.benefits.map((benefit, index) => (
                                                    <div key={index} className="flex items-center space-x-3 p-3 bg-black border border-white/10">
                                                        <Star className="w-5 h-5 text-primary-400" />
                                                        <span className="text-gray-300">{benefit}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'usage' && (
                                        <motion.div
                                            key="usage"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                        >
                                            <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">Usage Instructions</h3>
                                            <div className="bg-black border border-white/10 p-6 mb-6">
                                                <p className="text-gray-300 leading-relaxed mb-4">{product.usage}</p>
                                            </div>

                                            <h4 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">Certifications</h4>
                                            <div className="grid md:grid-cols-2 gap-3">
                                                {product.certifications.map((cert, index) => (
                                                    <div key={index} className="flex items-center space-x-3 p-3 bg-black border border-white/10">
                                                        <Award className="w-5 h-5 text-primary-400" />
                                                        <span className="text-gray-300">{cert}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Customer Reviews Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-jet-900 border border-white/20 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-primary-400/30"></div>

                            <div className="p-8">
                                {/* Reviews Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider">Customer Reviews</h2>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-2">
                                                <div className="flex space-x-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className="w-5 h-5 fill-primary-400 text-primary-400" />
                                                    ))}
                                                </div>
                                                <span className="text-white font-bold text-lg">{product.rating}</span>
                                                <span className="text-gray-400">({product.reviews} reviews)</span>
                                            </div>
                                        </div>
                                    </div>
                                    {isAuthenticated && (
                                        <button
                                            onClick={() => setShowReviewForm(!showReviewForm)}
                                            className="bg-primary-400 text-black px-8 py-3 font-bold uppercase tracking-wider text-sm hover:bg-primary-500 transition-colors"
                                        >
                                            Write Review
                                        </button>
                                    )}
                                </div>

                                {/* Review Form */}
                                <AnimatePresence>
                                    {showReviewForm && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="bg-black border border-white/10 p-8 mb-8"
                                        >
                                            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Write Your Review</h3>
                                            <form onSubmit={handleReviewSubmit} className="space-y-6">
                                                <div>
                                                    <label className="block text-white font-bold mb-3 uppercase tracking-wider">Rating</label>
                                                    <div className="flex space-x-2">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <button
                                                                key={star}
                                                                type="button"
                                                                onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                                                className={`w-10 h-10 transition-colors ${star <= reviewForm.rating ? 'text-primary-400' : 'text-gray-600 hover:text-gray-400'
                                                                    }`}
                                                            >
                                                                <Star className="w-full h-full fill-current" />
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-white font-bold mb-3 uppercase tracking-wider">Review Title</label>
                                                    <input
                                                        type="text"
                                                        value={reviewForm.title}
                                                        onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                                                        className="w-full bg-jet-900 border border-white/20 text-white px-4 py-4 focus:border-primary-400 focus:outline-none transition-colors"
                                                        placeholder="Give your review a title"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-white font-bold mb-3 uppercase tracking-wider">Your Review</label>
                                                    <textarea
                                                        value={reviewForm.comment}
                                                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                                        rows={6}
                                                        className="w-full bg-jet-900 border border-white/20 text-white px-4 py-4 focus:border-primary-400 focus:outline-none transition-colors resize-none"
                                                        placeholder="Share your experience with this product. What did you like? How did it help you?"
                                                        required
                                                    />
                                                </div>

                                                <div className="flex space-x-4">
                                                    <button
                                                        type="submit"
                                                        disabled={submittingReview}
                                                        className="bg-primary-400 text-black px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {submittingReview ? 'Submitting...' : 'Submit Review'}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowReviewForm(false)}
                                                        className="border border-white/20 text-white px-8 py-4 font-bold uppercase tracking-wider text-sm hover:border-primary-400 hover:text-primary-400 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Reviews List */}
                                {loadingReviews ? (
                                    <div className="flex items-center justify-center py-16">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
                                    </div>
                                ) : reviews.length === 0 ? (
                                    <div className="text-center py-16">
                                        <Star className="w-20 h-20 text-gray-600 mx-auto mb-6" />
                                        <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">No Reviews Yet</h3>
                                        <p className="text-gray-400 text-lg">Be the first to review this product and help others make informed decisions</p>
                                        {!isAuthenticated && (
                                            <p className="text-gray-500 text-sm mt-4">Please log in to write a review</p>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        <div className="flex items-center justify-between border-b border-white/20 pb-4">
                                            <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                                                {reviews.length} Review{reviews.length !== 1 ? 's' : ''}
                                            </h3>
                                        </div>

                                        {reviews.map((review) => (
                                            <motion.div
                                                key={review._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-black border border-white/10 p-8"
                                            >
                                                <div className="flex items-start justify-between mb-6">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-12 h-12 bg-primary-400 flex items-center justify-center">
                                                            <span className="text-black font-bold text-lg">
                                                                {review.userName.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <div className="text-white font-bold text-lg">{review.userName}</div>
                                                            <div className="text-gray-400">{formatDate(review.createdAt)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="flex space-x-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`w-5 h-5 ${i < review.rating ? 'text-primary-400 fill-current' : 'text-gray-600'
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                        {review.verified && (
                                                            <span className="bg-green-600/20 text-green-400 px-3 py-1 text-xs font-bold uppercase tracking-wider border border-green-600/30">
                                                                Verified Purchase
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <h4 className="text-white font-bold text-xl mb-3">{review.title}</h4>
                                                <p className="text-gray-300 leading-relaxed text-lg">{review.comment}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Product Details Tabs */}
                        <div className="mt-12">
                            <ProductDetailsTabs
                                features={product.features}
                                detailedDescription={product.detailedDescription}
                                ingredients={product.ingredients}
                                benefits={product.benefits}
                                usage={product.usage}
                                certifications={product.certifications}
                            />
                        </div>
                    </div>
                </section>

                {/* Frequently Bought Together */}
                <FrequentlyBoughtTogether
                    mainProduct={{
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        image: product.image
                    }}
                    bundleProducts={[
                        {
                            id: 'agnishila-shilajit-gummies',
                            name: 'Agnishila Shilajit Gummies',
                            price: 1299,
                            originalPrice: 1799,
                            image: '/images/image-removebg-preview (1).png'
                        },
                        {
                            id: 'agnishila-ashwagandha-gummies',
                            name: 'Agnishila Ashwagandha Gummies',
                            price: 1199,
                            originalPrice: 1699,
                            image: '/images/image-removebg-preview (1).png'
                        }
                    ]}
                />

                {/* Why Choose Section */}
                <WhyChoose />

                {/* FAQ Section */}
                <FAQSection 
                    title="Product FAQs"
                    faqs={[
                        {
                            question: `What makes ${product.name} different from other products?`,
                            answer: product.detailedDescription
                        },
                        {
                            question: 'How should I use this product?',
                            answer: product.usage
                        },
                        {
                            question: 'What are the key benefits?',
                            answer: product.benefits.join(', ')
                        },
                        {
                            question: 'Is this product lab tested and certified?',
                            answer: `Yes, this product is ${product.certifications.join(', ')}. We ensure the highest quality standards for all our products.`
                        },
                        {
                            question: 'What are the main ingredients?',
                            answer: `This product contains: ${product.ingredients.join(', ')}`
                        },
                        {
                            question: 'How long will one package last?',
                            answer: 'Depending on the recommended dosage, one package typically lasts 30-60 days with regular use.'
                        }
                    ]}
                />

                <Footer />
            </div>
        </main>
    );
}