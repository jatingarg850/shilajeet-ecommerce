const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://developerduco:p2nDgP07paBQewdi@cluster0.sms0okt.mongodb.net/shilajit-store?retryWrites=true&w=majority&appName=Cluster0';

// Sample data
const products = [
  {
    id: 'agnishila-gold-shilajit-resin',
    name: 'TruBlk Shilajit Gold Resin',
    description: 'A powerful blend crafted to elevate your strength, stamina, and overall vitality. Sourced from high-altitude Himalayan minerals, enriched with ancient Ayurvedic actives.',
    price: 2499,
    originalPrice: 3499,
    image: '/images/image-removebg-preview.png',
    rating: 4.9,
    reviews: 1247,
    category: 'Shilajit',
    type: 'Resin',
    badge: 'BESTSELLER',
    badgeColor: 'from-red-500 to-pink-500',
    features: ['Swarna Bhasma', 'KSM-66 Ashwagandha', 'Safed Musli', 'Lab Tested'],
    detailedDescription: 'TruBlk Shilajit Gold Resin is a powerful blend crafted to elevate your strength, stamina, and overall vitality. Sourced from high-altitude Himalayan minerals, this gold-grade resin is enriched with ancient Ayurvedic actives that work together for superior performance and daily wellness. This formulation combines pure TruBlk Shilajit Resin with Swarna Bhasma, KSM-66 Ashwagandha, Safed Musli, Kaunj (Mucuna), and Brahmi — creating a potent synergy for energy, focus, recovery, and hormonal balance. At Agnishila, after years of research we bring the purest form of Himalayan wellness straight to you — Shilajit enters a new era - one defined by proof, purity, and purpose. Introducing Agnishila TruBlk™ — the gold standard in clinically validated, globally compliant Shilajit. Born in India. Built for global trust.',
    ingredients: ['TruBlk Shilajit Resin (700mg per 1gm)', 'Swarna Bhasma (0.2mg)', 'KSM-66 Ashwagandha (150mg)', 'Safed Musli (49.9mg)', 'Kaunj/Mucuna (49.9mg)', 'Brahmi (50mg)'],
    benefits: ['Increases Strength & Stamina', 'Boosts Testosterone & Hormonal Balance', 'Reduces Stress & Supports Calm Mind', 'Enhances Energy & Metabolism', 'Improves Brain Function & Memory', 'Strengthens Immunity', 'Supports Male Reproductive Health', 'Boosts Recovery & Reduces Fatigue'],
    usage: 'Take 300–500 mg (pea-sized amount) once daily. Mix in warm water, milk, or herbal tea. Stir well until fully dissolved. Consume on an empty stomach in the morning for best results. For maximum benefits: Morning dose for energy & stamina, optional evening dose for stress relief & recovery. Athletes can take before workout for enhanced performance. Take daily for 6–8 weeks for best results. Safe for long-term daily use.',
    certifications: ['FSSAI Approved', '3rd Party Lab Verified', 'GMP Certified', 'HACCP Compliant', 'ISO Certified', 'FDA-Compliant Manufacturing', 'Heavy Metal Free'],
    inStock: true,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'agnishila-shilajit-gummies',
    name: 'Agnishila Shilajit Gummies',
    description: 'Delicious and convenient Shilajit gummies for daily wellness. Perfect for busy lifestyles.',
    price: 1299,
    originalPrice: 1799,
    image: '/images/image-removebg-preview (1).png',
    rating: 4.8,
    reviews: 892,
    category: 'Shilajit',
    type: 'Gummies',
    badge: 'POPULAR',
    badgeColor: 'from-blue-500 to-cyan-500',
    features: ['Natural Flavors', 'Easy Dosage', 'Travel Friendly', '60 Gummies'],
    detailedDescription: 'Our Shilajit Gummies make ancient wellness accessible and enjoyable. Each gummy contains standardized Shilajit extract equivalent to 500mg of pure resin, combined with natural fruit flavors for a delightful daily ritual.',
    ingredients: ['Shilajit Extract (500mg equivalent)', 'Natural Fruit Flavors', 'Organic Cane Sugar', 'Pectin', 'Natural Colors'],
    benefits: ['Sustained Energy Release', 'Improved Focus & Clarity', 'Enhanced Mood', 'Better Sleep Quality', 'Stress Management'],
    usage: 'Take 2 gummies daily, preferably with meals. Do not exceed recommended dosage.',
    certifications: ['Vegetarian', 'No Artificial Preservatives', 'Lab Tested', 'Ayush Approved'],
    inStock: true,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'agnishila-ashwagandha-gummies',
    name: 'Agnishila Ashwagandha Gummies',
    description: 'Premium Ashwagandha gummies for stress relief and adaptogenic support. Naturally delicious.',
    price: 999,
    originalPrice: 1399,
    image: '/images/image.png',
    rating: 4.7,
    reviews: 654,
    category: 'Ashwagandha',
    type: 'Gummies',
    badge: 'NEW',
    badgeColor: 'from-green-500 to-emerald-500',
    features: ['KSM-66 Ashwagandha', 'Stress Relief', 'Natural Taste', '60 Gummies'],
    detailedDescription: 'Formulated with clinically studied KSM-66 Ashwagandha root extract, these gummies provide powerful adaptogenic support to help your body manage stress naturally while promoting calm energy and mental clarity.',
    ingredients: ['KSM-66 Ashwagandha Extract (600mg)', 'Natural Berry Flavors', 'Organic Sweeteners', 'Pectin', 'Vitamin D3'],
    benefits: ['Reduces Stress & Anxiety', 'Improves Sleep Quality', 'Enhances Physical Performance', 'Supports Hormonal Balance', 'Boosts Immunity'],
    usage: 'Take 2 gummies daily, preferably in the evening. Can be taken with or without food.',
    certifications: ['Clinically Studied KSM-66', 'Vegan Friendly', 'Third Party Tested', 'FDA Registered Facility'],
    inStock: true,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const users = [
  {
    name: 'Admin User',
    email: 'admin@agnishila.com',
    password: 'admin123', // Will be hashed
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123', // Will be hashed
    role: 'user',
    phone: '+91 9876543210',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123', // Will be hashed
    role: 'user',
    phone: '+91 9876543211',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const orders = [
  {
    orderNumber: 'ORD-2024-001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+91 9876543210',
    items: [
      {
        productId: 'will-be-set',
        name: 'Pure Himalayan Shilajit Resin',
        price: 2499,
        quantity: 2
      }
    ],
    subtotal: 4998,
    shipping: 0,
    total: 4998,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'razorpay',
    shippingAddress: {
      fullName: 'John Doe',
      phone: '+91 9876543210',
      addressLine1: '123 Main Street',
      addressLine2: 'Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India'
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    updatedAt: new Date()
  },
  {
    orderNumber: 'ORD-2024-002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+91 9876543211',
    items: [
      {
        productId: 'will-be-set',
        name: 'Shilajit Gold Capsules',
        price: 1999,
        quantity: 1
      }
    ],
    subtotal: 1999,
    shipping: 0,
    total: 1999,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'razorpay',
    shippingAddress: {
      fullName: 'Jane Smith',
      phone: '+91 9876543211',
      addressLine1: '456 Park Avenue',
      addressLine2: '',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      country: 'India'
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date()
  },
  {
    orderNumber: 'ORD-2024-003',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+91 9876543210',
    items: [
      {
        productId: 'will-be-set',
        name: 'Premium Shilajit Powder',
        price: 1799,
        quantity: 3
      }
    ],
    subtotal: 5397,
    shipping: 0,
    total: 5397,
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'razorpay',
    shippingAddress: {
      fullName: 'John Doe',
      phone: '+91 9876543210',
      addressLine1: '123 Main Street',
      addressLine2: 'Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India'
    },
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date()
  }
];

const newsletter = [
  {
    email: 'subscriber1@example.com',
    status: 'active',
    subscribedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  },
  {
    email: 'subscriber2@example.com',
    status: 'active',
    subscribedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
  },
  {
    email: 'subscriber3@example.com',
    status: 'active',
    subscribedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
  },
  {
    email: 'subscriber4@example.com',
    status: 'active',
    subscribedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  }
];

const reviews = [
  {
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    rating: 5,
    comment: 'Excellent product! I can feel the difference in my energy levels. Highly recommended for anyone looking for authentic Shilajit.',
    status: 'approved',
    helpful: 12,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Priya Sharma',
    email: 'priya@example.com',
    rating: 4,
    comment: 'Good quality capsules. Easy to consume. Noticed improvement in stamina after 2 weeks of use.',
    status: 'approved',
    helpful: 8,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Amit Patel',
    email: 'amit@example.com',
    rating: 5,
    comment: 'Authentic and pure. The packaging is also very good. Will definitely order again.',
    status: 'pending',
    helpful: 3,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Sneha Reddy',
    email: 'sneha@example.com',
    rating: 3,
    comment: 'Product is okay but I expected better results. Maybe need to use it longer.',
    status: 'pending',
    helpful: 1,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
  },
  {
    name: 'Vikram Singh',
    email: 'vikram@example.com',
    rating: 5,
    comment: 'Best Shilajit I have tried. Genuine Himalayan product. Worth every penny!',
    status: 'approved',
    helpful: 15,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
  }
];

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully!');

    const db = client.db('shilajit-store');

    // Clear existing data
    console.log('\nClearing existing data...');
    await db.collection('products').deleteMany({});
    await db.collection('users').deleteMany({});
    await db.collection('orders').deleteMany({});
    await db.collection('newsletter').deleteMany({});
    await db.collection('reviews').deleteMany({});
    console.log('Existing data cleared!');

    // Insert products
    console.log('\nInserting products...');
    const productsResult = await db.collection('products').insertMany(products);
    console.log(`${productsResult.insertedCount} products inserted!`);

    // Hash passwords and insert users
    console.log('\nInserting users...');
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    );
    const usersResult = await db.collection('users').insertMany(usersWithHashedPasswords);
    console.log(`${usersResult.insertedCount} users inserted!`);

    // Update orders with actual product IDs
    const productIds = Object.values(productsResult.insertedIds);
    orders.forEach((order, index) => {
      order.items[0].productId = productIds[index % productIds.length].toString();
    });

    // Insert orders
    console.log('\nInserting orders...');
    const ordersResult = await db.collection('orders').insertMany(orders);
    console.log(`${ordersResult.insertedCount} orders inserted!`);

    // Insert newsletter subscribers
    console.log('\nInserting newsletter subscribers...');
    const newsletterResult = await db.collection('newsletter').insertMany(newsletter);
    console.log(`${newsletterResult.insertedCount} newsletter subscribers inserted!`);

    // Link reviews to products and insert
    console.log('\nInserting reviews...');
    const reviewsWithProducts = reviews.map((review, index) => ({
      ...review,
      productId: productIds[index % productIds.length]
    }));
    const reviewsResult = await db.collection('reviews').insertMany(reviewsWithProducts);
    console.log(`${reviewsResult.insertedCount} reviews inserted!`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Products: ${productsResult.insertedCount}`);
    console.log(`   - Users: ${usersResult.insertedCount}`);
    console.log(`   - Orders: ${ordersResult.insertedCount}`);
    console.log(`   - Newsletter Subscribers: ${newsletterResult.insertedCount}`);
    console.log(`   - Reviews: ${reviewsResult.insertedCount}`);
    console.log('\n🔐 Admin Credentials:');
    console.log('   Email: admin@agnishila.com');
    console.log('   Password: admin123');
    console.log('\n🔐 Test User Credentials:');
    console.log('   Email: john@example.com');
    console.log('   Password: password123');

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\nDatabase connection closed.');
  }
}

// Run the seed function
seedDatabase();
