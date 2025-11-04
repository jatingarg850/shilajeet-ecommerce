'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { ShoppingCart, Star, Heart, Search, Filter, X, ChevronDown } from 'lucide-react';
import { useState, useMemo } from 'react';

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
    category: 'Shilajit',
    type: 'Resin',
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
    category: 'Shilajit',
    type: 'Gummies',
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
    category: 'Ashwagandha',
    type: 'Gummies',
    detailedDescription: 'Formulated with clinically studied KSM-66 Ashwagandha root extract, these gummies provide powerful adaptogenic support to help your body manage stress naturally while promoting calm energy and mental clarity.',
    ingredients: ['KSM-66 Ashwagandha Extract (600mg)', 'Natural Berry Flavors', 'Organic Sweeteners', 'Pectin', 'Vitamin D3'],
    benefits: ['Reduces Stress & Anxiety', 'Improves Sleep Quality', 'Enhances Physical Performance', 'Supports Hormonal Balance', 'Boosts Immunity'],
    usage: 'Take 2 gummies daily, preferably in the evening. Can be taken with or without food.',
    certifications: ['Clinically Studied KSM-66', 'Vegan Friendly', 'Third Party Tested', 'FDA Registered Facility']
  }
];

export default function ProductsPage() {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [addingStates, setAddingStates] = useState<{[key: string]: boolean}>({});
  const [wishlistStates, setWishlistStates] = useState<{[key: string]: boolean}>({});
  
  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Filter options
  const categories = ['All', 'Shilajit', 'Ashwagandha'];
  const types = ['All', 'Resin', 'Gummies'];
  const priceRanges = [
    { label: 'All', value: 'All' },
    { label: 'Under ₹1,000', value: '0-1000' },
    { label: '₹1,000 - ₹2,000', value: '1000-2000' },
    { label: 'Above ₹2,000', value: '2000+' }
  ];
  const sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Rating: High to Low', value: 'rating-desc' },
    { label: 'Name: A to Z', value: 'name-asc' }
  ];

  const handleAddToCart = async (product: any) => {
    setAddingStates(prev => ({ ...prev, [product.id]: true }));
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    setTimeout(() => {
      setAddingStates(prev => ({ ...prev, [product.id]: false }));
    }, 1000);
  };

  const handleWishlistToggle = async (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    setWishlistStates(prev => ({ ...prev, [product.id]: true }));
    
    const productData = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    };

    if (isInWishlist(product.id)) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(productData);
    }
    
    setWishlistStates(prev => ({ ...prev, [product.id]: false }));
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Category filter
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      // Type filter
      const matchesType = selectedType === 'All' || product.type === selectedType;
      
      // Price filter
      let matchesPrice = true;
      if (priceRange !== 'All') {
        const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
        if (max) {
          matchesPrice = product.price >= parseInt(min) && product.price <= parseInt(max);
        } else {
          matchesPrice = product.price >= parseInt(min);
        }
      }
      
      return matchesSearch && matchesCategory && matchesType && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedType, priceRange, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedType('All');
    setPriceRange('All');
    setSortBy('featured');
  };
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
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-16 w-24 h-24 border-l-2 border-t-2 border-gold-500/20"></div>
          <div className="absolute bottom-16 right-16 w-24 h-24 border-r-2 border-b-2 border-gold-500/20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-12 h-1 bg-mauve-gradient"></div>
              <span className="text-white-to-mauve font-medium text-sm uppercase tracking-[0.2em]">
                Agnishila Collection
              </span>
              <div className="w-12 h-1 bg-mauve-gradient"></div>
            </div>

            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-none">
              OUR
              <span className="block text-white-to-mauve" style={{ display: 'inline-block', width: '100%' }}>PRODUCTS</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Discover our curated collection of premium Himalayan wellness products, 
              each crafted to awaken the fire within you.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12">
            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products, features, or benefits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-jet-900 border border-white/20 text-white pl-12 pr-4 py-4 focus:outline-none focus:border-gold-400 transition-colors placeholder-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Toggle Button (Mobile) */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center space-x-2 bg-jet-900 border border-white/20 text-white px-4 py-2 hover:border-gold-400 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm uppercase tracking-wider">Filters</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Results count */}
                <div className="text-gray-400 text-sm">
                  {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? 's' : ''} found
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-jet-900 border border-white/20 text-white px-4 py-2 pr-8 focus:outline-none focus:border-gold-400 transition-colors text-sm uppercase tracking-wider appearance-none cursor-pointer"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-jet-900">
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-gray-400 text-sm uppercase tracking-wider mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-jet-900 border border-white/20 text-white px-3 py-2 focus:outline-none focus:border-gold-400 transition-colors text-sm"
                  >
                    {categories.map(category => (
                      <option key={category} value={category} className="bg-jet-900">
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-gray-400 text-sm uppercase tracking-wider mb-2">Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-jet-900 border border-white/20 text-white px-3 py-2 focus:outline-none focus:border-gold-400 transition-colors text-sm"
                  >
                    {types.map(type => (
                      <option key={type} value={type} className="bg-jet-900">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Filter */}
                <div>
                  <label className="block text-gray-400 text-sm uppercase tracking-wider mb-2">Price Range</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full bg-jet-900 border border-white/20 text-white px-3 py-2 focus:outline-none focus:border-gold-400 transition-colors text-sm"
                  >
                    {priceRanges.map(range => (
                      <option key={range.value} value={range.value} className="bg-jet-900">
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearAllFilters}
                    className="w-full bg-red-600/20 border border-red-600/30 text-red-400 px-3 py-2 hover:bg-red-600/30 transition-colors text-sm uppercase tracking-wider"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Active Filters */}
              {(searchQuery || selectedCategory !== 'All' || selectedType !== 'All' || priceRange !== 'All' || sortBy !== 'featured') && (
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-gray-400 text-sm uppercase tracking-wider">Active filters:</span>
                  {searchQuery && (
                    <span className="bg-gold-500/20 text-gold-300 px-3 py-1 text-xs border border-gold-500/30 flex items-center space-x-2">
                      <span>Search: "{searchQuery}"</span>
                      <button onClick={() => setSearchQuery('')} className="hover:text-white">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedCategory !== 'All' && (
                    <span className="bg-gold-500/20 text-gold-300 px-3 py-1 text-xs border border-gold-500/30 flex items-center space-x-2">
                      <span>Category: {selectedCategory}</span>
                      <button onClick={() => setSelectedCategory('All')} className="hover:text-white">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedType !== 'All' && (
                    <span className="bg-gold-500/20 text-gold-300 px-3 py-1 text-xs border border-gold-500/30 flex items-center space-x-2">
                      <span>Type: {selectedType}</span>
                      <button onClick={() => setSelectedType('All')} className="hover:text-white">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {priceRange !== 'All' && (
                    <span className="bg-gold-500/20 text-gold-300 px-3 py-1 text-xs border border-gold-500/30 flex items-center space-x-2">
                      <span>Price: {priceRanges.find(r => r.value === priceRange)?.label}</span>
                      <button onClick={() => setPriceRange('All')} className="hover:text-white">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {sortBy !== 'featured' && (
                    <span className="bg-gold-500/20 text-gold-300 px-3 py-1 text-xs border border-gold-500/30 flex items-center space-x-2">
                      <span>Sort: {sortOptions.find(s => s.value === sortBy)?.label}</span>
                      <button onClick={() => setSortBy('featured')} className="hover:text-white">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {filteredAndSortedProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-600/20 mx-auto mb-8 flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-wider">
                No Products Found
              </h3>
              <p className="text-gray-400 text-lg mb-8">
                Try adjusting your search or filters to find what you're looking for
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-mauve-gradient text-white px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-mauve-shine transition-colors shadow-mauve"
              >
                Clear All Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-jet-900 border border-white/20 relative overflow-hidden group hover:border-gold-400/50 transition-all duration-300 cursor-pointer"
                onClick={() => window.location.href = `/products/${product.id}`}
              >
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-gold-500/30 group-hover:border-t-gold-400/50 transition-all duration-300"></div>
                
                {/* Wishlist Heart Icon */}
                <motion.button
                  onClick={(e) => handleWishlistToggle(e, product)}
                  disabled={wishlistStates[product.id]}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-sm border border-white/20 hover:border-gold-400/50 transition-all duration-300 disabled:opacity-50"
                >
                  <Heart 
                    className={`w-5 h-5 transition-all duration-300 ${
                      isInWishlist(product.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-white hover:text-red-500'
                    }`}
                  />
                </motion.button>
                
                {/* Product Image */}
                <div className="h-48 bg-jet-800 flex items-center justify-center">
                  <div className="w-32 h-32 bg-mauve-gradient/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-mauve-gradient transform rotate-45"></div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4">
                  {/* Rating and Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                        ))}
                      </div>
                      <span className="text-white font-bold text-sm">{product.rating}</span>
                      <span className="text-gray-400 text-sm">({product.reviews})</span>
                    </div>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider">{product.name}</h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm font-light leading-relaxed">{product.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs bg-gold-500/10 text-gold-300 px-2 py-1 border border-gold-500/20 uppercase tracking-wider"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500 text-sm line-through">₹{product.originalPrice}</span>
                      <span className="text-2xl font-bold text-white-to-mauve">₹{product.price}</span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    disabled={addingStates[product.id]}
                    className="w-full bg-mauve-gradient hover:bg-mauve-shine text-white py-3 font-bold uppercase tracking-wider text-sm transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-mauve"
                  >
                    <ShoppingCart size={16} />
                    <span>{addingStates[product.id] ? 'Added!' : 'Add to Cart'}</span>
                  </button>
                </div>
              </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

        <Footer />
      </div>
    </main>
  );
}