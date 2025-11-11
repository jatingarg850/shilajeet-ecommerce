const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://developerduco:p2nDgP07paBQewdi@cluster0.sms0okt.mongodb.net/shilajit-store?retryWrites=true&w=majority&appName=Cluster0';

// Sample data
const products = [
  {
    name: 'Pure Himalayan Shilajit Resin',
    slug: 'pure-himalayan-shilajit-resin',
    description: 'Premium quality Shilajit resin sourced directly from the Himalayan mountains. Rich in fulvic acid and over 85 minerals.',
    price: 2499,
    originalPrice: 3499,
    category: 'Resin',
    inStock: true,
    featured: true,
    image: '/images/products/shilajit-resin.jpg',
    images: ['/images/products/shilajit-resin.jpg', '/images/products/shilajit-resin-2.jpg'],
    weight: '20g',
    benefits: [
      'Boosts energy and stamina',
      'Enhances cognitive function',
      'Supports immune system',
      'Improves physical performance',
      'Rich in fulvic acid and minerals'
    ],
    ingredients: ['100% Pure Himalayan Shilajit Resin'],
    usage: 'Dissolve a rice grain sized portion (300-500mg) in warm water or milk. Consume once or twice daily.',
    certifications: ['Lab Tested', 'Heavy Metal Free', 'Authentic Himalayan Source'],
    rating: 4.8,
    reviews: 156,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Shilajit Gold Capsules',
    slug: 'shilajit-gold-capsules',
    description: 'Convenient Shilajit capsules enriched with gold for enhanced benefits. Perfect for daily supplementation.',
    price: 1999,
    originalPrice: 2799,
    category: 'Capsules',
    inStock: true,
    featured: true,
    image: '/images/products/shilajit-capsules.jpg',
    images: ['/images/products/shilajit-capsules.jpg'],
    weight: '60 Capsules',
    benefits: [
      'Convenient daily dosage',
      'Enhanced with gold',
      'Supports vitality',
      'Improves strength',
      'Easy to consume'
    ],
    ingredients: ['Shilajit Extract', 'Gold Bhasma', 'Vegetarian Capsule'],
    usage: 'Take 1-2 capsules daily with warm water or milk, preferably after meals.',
    certifications: ['GMP Certified', 'Lab Tested', 'Vegetarian'],
    rating: 4.6,
    reviews: 89,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Premium Shilajit Powder',
    slug: 'premium-shilajit-powder',
    description: 'Finely processed Shilajit powder for easy mixing and consumption. Maintains all natural properties.',
    price: 1799,
    originalPrice: 2499,
    category: 'Powder',
    inStock: true,
    featured: false,
    image: '/images/products/shilajit-powder.jpg',
    images: ['/images/products/shilajit-powder.jpg'],
    weight: '50g',
    benefits: [
      'Easy to mix',
      'Versatile usage',
      'Pure and natural',
      'Quick absorption',
      'Cost effective'
    ],
    ingredients: ['100% Pure Shilajit Powder'],
    usage: 'Mix 300-500mg with warm water, milk, or smoothies. Consume once or twice daily.',
    certifications: ['Organic', 'Lab Tested', 'Pure'],
    rating: 4.5,
    reviews: 67,
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

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Products: ${productsResult.insertedCount}`);
    console.log(`   - Users: ${usersResult.insertedCount}`);
    console.log(`   - Orders: ${ordersResult.insertedCount}`);
    console.log(`   - Newsletter Subscribers: ${newsletterResult.insertedCount}`);
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
