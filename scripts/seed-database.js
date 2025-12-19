const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://developerduco:p2nDgP07paBQewdi@cluster0.sms0okt.mongodb.net/shilajit-store?retryWrites=true&w=majority&appName=Cluster0';

// Sample data
const products = [
  {
    id: 'agnishila-trublk-gold-resin',
    name: 'TruBlk Shilajit Gold Resin',
    description: 'TruBlk Shilajit Gold Resin delivers a complete vitality boost by combining Himalayan Shilajit with powerful Ayurvedic herbs and minerals. Together, they enhance your body\'s natural energy, strength, and mental focus.',
    price: 1320,
    originalPrice: 1649,
    image: '/images/image-removebg-preview (1).png',
    rating: 4.9,
    reviews: 1247,
    category: 'Shilajit',
    type: 'Resin',
    badge: 'BESTSELLER',
    badgeColor: 'from-red-500 to-pink-500',
    features: ['TruBlk Shilajit Resin (Asphaltum Punjabiaum)', 'Swarna Bhasma', 'KSM-66 Ashwagandha', 'Safed Musli', 'Kaunj', 'Brahmi', 'Lab Tested'],
    detailedDescription: 'TruBlk Shilajit Gold Resin is a powerful blend crafted to elevate your strength, stamina, and overall vitality. Sourced from high-altitude Himalayan minerals, this gold-grade resin is enriched with ancient Ayurvedic actives that work together for superior performance and daily wellness.\n\nWhat makes it special?\n\nThis formulation combines pure TruBlk Shilajit Resin with Swarna Bhasma, KSM-66 Ashwagandha, Safed Musli, Kaunj (Mucuna), and Brahmi — creating a potent synergy for energy, focus, recovery, and hormonal balance.',
    ingredients: ['TruBlk Shilajit Resin (700mg)', 'Swarna Bhasma (0.2mg)', 'KSM-66 Ashwagandha (150mg)', 'Safed Musli (49.9mg)', 'Kaunj/Mucuna (49.9mg)', 'Brahmi (50mg)'],
    benefits: [
      'Increases Strength & Stamina – Shilajit, Safed Musli, and Kaunj together improve physical endurance and muscle power.',
      'Boosts Testosterone & Hormonal Balance – KSM-66 Ashwagandha and Kaunj support natural testosterone production for better performance.',
      'Reduces Stress & Supports a Calm Mind – Ashwagandha and Brahmi reduce cortisol, improve mood, and enhance focus.',
      'Enhances Energy & Metabolism – Shilajit\'s fulvic acid increases ATP production for daily energy.',
      'Improves Brain Function & Memory – Brahmi supports cognitive health, focus, and mental clarity.',
      'Strengthens Immunity – Swarna Bhasma and Shilajit support cellular repair and immunity.',
      'Supports Male Reproductive Health – Kaunj, Safed Musli, and Ashwagandha naturally enhance vitality, drive, and reproductive wellness.',
      'Boosts Recovery & Reduces Fatigue – Shilajit and Ashwagandha help the body recover faster from physical and mental fatigue.'
    ],
    usage: 'Take 300–500 mg (pea-sized amount) once daily. Mix in warm water, milk, or herbal tea. Stir well until fully dissolved. Consume on an empty stomach in the morning for best results. For maximum benefits: Morning dose for energy & stamina, optional evening dose for stress relief & recovery. Athletes can take before workout for enhanced performance. Take daily for 6–8 weeks for best results. Safe for long-term daily use.',
    certifications: ['FSSAI Approved', '3rd Party Lab Verified', 'GMP Certified', 'HACCP Compliant', 'ISO Certified', 'FDA-Compliant Manufacturing', 'Heavy Metal Free'],
    inStock: true,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'agnishila-shilajit-gummies',
    name: 'Shilajit ShilaBoost Gummies',
    description: 'Delicious and convenient Shilajit gummies for daily wellness. Perfect for busy lifestyles.',
    price: 1035,
    originalPrice: 1150,
    image: '/selling/shilaboostimgae.jpg',
    rating: 4.8,
    reviews: 892,
    category: 'Shilajit',
    type: 'Gummies',
    badge: 'POPULAR',
    badgeColor: 'from-blue-500 to-cyan-500',
    features: ['Shilajit Resin (Asphaltum punjabianum)', 'Gokhru Extract (Tribulus terrestris) Fr', 'Ginger Extract (Zingiber officinale) Rh', 'Black Musli Extract (Curculigo orchioides) Rt', 'Lab Tested'],
    detailedDescription: 'Agnishila ShilaBoost Gummies are a modern and delicious way to experience the ancient power of Shilajit. Each gummy is infused with pure Shilajit Resin, blended with Gokhru, Ginger Extract, and Black Musli — four potent Ayurvedic ingredients known for enhancing energy, stamina, performance, and daily vitality.\n\nDesigned for those who want natural strength without bitterness, ShilaBoost Gummies deliver the benefits of premium Shilajit in a convenient, tasty, and easily absorbable form.',
    ingredients: ['Shilajit Resin (Asphaltum punjabianum) (400mg)', 'Gokhru Extract (Tribulus terrestris) Fr (30mg)', 'Ginger Extract (Zingiber officinale) Rh (50mg)', 'Black Musli Extract (Curculigo orchioides) Rt (20mg)'],
    benefits: [
      'Boosts Energy & Reduces Fatigue',
      'Enhances Strength & Stamina',
      'Supports Hormonal Balance & Male Wellness',
      'Improves Digestion & Nutrient Absorption',
      'Enhances Recovery & Reduces Stress',
      'Supports Immunity & Overall Wellness',
      'Daily Boost for Active Lifestyles'
    ],
    usage: 'Take 2 gummies daily, preferably with meals. Do not exceed recommended dosage.',
    certifications: ['Vegetarian', 'No Artificial Preservatives', 'Lab Tested', 'Ayush Approved'],
    inStock: true,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'ashwa-glo-gummies',
    name: 'KSM-66 AshwaGlow Gummies',
    description: 'KSM-66 AshwaGlow Gummies are a delicious, modern wellness solution designed to promote stress relief, calmness, and deep restful sleep. Powered by clinically studied KSM-66 Ashwagandha, these gummies help relax the mind, balance stress hormones, and support a healthier sleep cycle — without drowsiness or dependency.',
    tagline: 'KSM-66 AshwaGlow Gummies – Stress Relief & Deep Sleep, The Natural Way',
    subtitle: 'Experience calmness like never before.',
    price: 999,
    originalPrice: 1399,
    image: '/selling/aswaglo iamge.jpg',
    rating: 4.9,
    reviews: 1156,
    category: 'Ashwagandha',
    type: 'Gummies',
    badge: 'NEW',
    badgeColor: 'from-purple-500 to-pink-500',
    features: ['KSM-66 Ashwagandha', 'Non-Habit Forming', 'Delicious Taste', 'Deep Sleep Support'],
    detailedDescription: 'KSM-66 AshwaGlow Gummies are a delicious, modern wellness solution designed to promote stress relief, calmness, and deep restful sleep. Powered by clinically studied KSM-66 Ashwagandha, these gummies help relax the mind, balance stress hormones, and support a healthier sleep cycle — without drowsiness or dependency.\n\nEach gummy delivers natural calm in a tasty format, helping your mind unwind and your body restore — the perfect way to "glow from within."\n\nKSM-66 AshwaGlow Gummies combine clinically proven KSM-66 Ashwagandha with a delicious gummy format to help your mind relax, your stress melt away, and your nights become peaceful.',
    ingredients: ['KSM-66 Ashwagandha', 'Natural Fruit Flavors', 'Organic Sweeteners', 'Pectin'],
    keyHealthBenefits: [
      {
        emoji: '🌙',
        title: 'Reduces Stress & Anxiety',
        description: 'KSM-66 Ashwagandha helps balance cortisol, relaxes the mind, and promotes emotional wellness.'
      },
      {
        emoji: '😌',
        title: 'Deep Calm & Relaxation',
        description: 'Supports overall mood, reduces irritability, and helps your mind stay centered.'
      },
      {
        emoji: '😴',
        title: 'Improves Sleep Quality',
        description: 'Helps you fall asleep naturally, stay asleep longer, and wake up refreshed.'
      },
      {
        emoji: '🔄',
        title: 'Supports Hormonal Balance',
        description: 'Helps regulate stress hormones for improved mood and emotional stability.'
      },
      {
        emoji: '⚡',
        title: 'Boosts Daily Energy by Improving Sleep',
        description: 'Better sleep = better mornings, fresher mind, sharper focus.'
      },
      {
        emoji: '🧠',
        title: 'Enhances Focus, Memory & Mental Wellness',
        description: 'Supports cognitive function and mental clarity by reducing mental fatigue.'
      },
      {
        emoji: '🌿',
        title: 'Helps with Mood Fluctuations',
        description: 'Perfect for calming the mind after a long or stressful day.'
      }
    ],
    benefits: [
      'Reduces Stress & Anxiety - KSM-66 Ashwagandha helps balance cortisol, relaxes the mind, and promotes emotional wellness',
      'Deep Calm & Relaxation - Supports overall mood, reduces irritability, and helps your mind stay centered',
      'Improves Sleep Quality - Helps you fall asleep naturally, stay asleep longer, and wake up refreshed',
      'Supports Hormonal Balance - Helps regulate stress hormones for improved mood and emotional stability',
      'Boosts Daily Energy by Improving Sleep - Better sleep = better mornings, fresher mind, sharper focus',
      'Enhances Focus, Memory & Mental Wellness - Supports cognitive function and mental clarity by reducing mental fatigue',
      'Helps with Mood Fluctuations - Perfect for calming the mind after a long or stressful day'
    ],
    dailyDosage: 'Take 2 gummies daily, preferably in the evening or before bedtime.',
    forBestResults: [
      'Take consistently for 4–6 weeks.',
      'Pair with a nighttime routine (dim lights, warm drink, calm environment).',
      'Do not exceed 2 gummies per day unless advised.'
    ],
    usage: 'Take 2 gummies daily, preferably in the evening or before bedtime. For Best Results: Take consistently for 4–6 weeks. Pair with a nighttime routine (dim lights, warm drink, calm environment). Do not exceed 2 gummies per day unless advised.',
    suitableFor: 'Men & women seeking natural stress relief, calmness, and improved sleep',
    whatItDoes: [
      'Reduces stress & anxiety',
      'Helps you sleep deeper & feel refreshed',
      'Balances mood & emotional wellness',
      'Supports calmness throughout the day',
      'Non-habit forming & safe for daily use'
    ],
    perfectFor: [
      'Busy professionals',
      'Students',
      'Moms',
      'People with stress',
      'Light sleepers',
      'Anyone seeking natural calm'
    ],
    whyChoose: [
      {
        emoji: '✨',
        title: 'Powered by KSM-66 Ashwagandha',
        description: 'The world\'s most clinically researched Ashwagandha extract for stress & sleep.'
      },
      {
        emoji: '✨',
        title: 'Delicious Gummies, No Bitter Taste',
        description: 'All the benefits of Ashwagandha in a tasty, easy-to-eat gummy.'
      },
      {
        emoji: '✨',
        title: 'Natural Stress Relief + Deep Sleep Support',
        description: 'Calms your mind, relaxes your body, and improves sleep quality.'
      },
      {
        emoji: '✨',
        title: 'Non-Habit Forming',
        description: 'Safe for daily long-term use — no drowsiness or dependency.'
      },
      {
        emoji: '✨',
        title: 'Clean, Pure & Safe',
        description: 'Made in GMP, HACCP & FDA-compliant facilities. Lab-tested for purity, safety & quality.'
      },
      {
        emoji: '✨',
        title: 'Perfect for Modern, Busy Lifestyles',
        description: 'Helps manage work stress, anxiety, mood swings, and poor sleep naturally.'
      }
    ],
    faqs: [
      {
        question: 'What are Ashwa Glo Gummies?',
        answer: 'Ashwa Glo Gummies are calming wellness gummies powered by KSM-66 Ashwagandha, designed to reduce stress, improve sleep quality, balance mood, and support daily mental wellness.'
      },
      {
        question: 'How do these gummies help with stress?',
        answer: 'KSM-66 Ashwagandha is clinically studied to lower cortisol, promote relaxation, reduce anxiety, and support emotional balance.'
      },
      {
        question: 'Can Ashwa Glo Gummies improve sleep?',
        answer: 'Yes. They help you fall asleep faster, stay asleep longer, and wake up feeling refreshed—without causing drowsiness or dependency.'
      },
      {
        question: 'How many gummies should I take daily?',
        answer: 'Take 1–2 gummies daily, preferably in the evening or before bedtime.'
      },
      {
        question: 'Are these gummies habit-forming?',
        answer: 'No. Ashwa Glo Gummies are non-habit forming, safe for daily long-term use, and do not cause withdrawal or dependency.'
      },
      {
        question: 'When will I start noticing results?',
        answer: 'Many people feel calmer within 7–10 days. Full sleep and stress-relief benefits appear in 3–4 weeks of consistent use.'
      },
      {
        question: 'Can I take them during the day?',
        answer: 'Yes. You can take 1 gummy during the day for stress relief, and 1 gummy at night for sleep support.'
      },
      {
        question: 'Are Ashwa Glo Gummies safe?',
        answer: 'Yes. They are made with KSM-66 Ashwagandha, are lab-tested, and manufactured in GMP & HACCP-compliant facilities.'
      },
      {
        question: 'Can women use them?',
        answer: 'Yes. They are safe for both men and women looking for calmness, mood balance, and better sleep. Not recommended for pregnant or breastfeeding women.'
      },
      {
        question: 'Do they cause morning drowsiness?',
        answer: 'No. Unlike synthetic sleep aids, Ashwa Glo Gummies help you sleep naturally and wake up fresh—without grogginess.'
      },
      {
        question: 'Can I take them with other supplements?',
        answer: 'Yes, they can be taken with most vitamins, minerals, and daily supplements. Avoid combining with strong sedatives unless advised by a doctor.'
      },
      {
        question: 'Are they suitable for daily use?',
        answer: 'Absolutely. They are designed for safe, everyday stress and sleep support.'
      },
      {
        question: 'What do the gummies taste like?',
        answer: 'Ashwa Glo Gummies have a delicious fruity flavor, making it easy and enjoyable to take daily without bitterness.'
      },
      {
        question: 'How long does one bottle last?',
        answer: 'Depending on usage, one bottle lasts 30 days.'
      },
      {
        question: 'How should I store the gummies?',
        answer: 'Store in a cool, dry place, away from direct sunlight. Close the jar/tub tightly after every use.'
      }
    ],
    certifications: ['GMP Certified', 'HACCP Compliant', 'FDA-Compliant Manufacturing', 'Lab Tested for Purity', 'Clinically Studied KSM-66'],
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
