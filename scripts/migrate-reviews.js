const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://developerduco:p2nDgP07paBQewdi@cluster0.sms0okt.mongodb.net/shilajit-store?retryWrites=true&w=majority&appName=Cluster0';

async function migrateReviews() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully!');

    const db = client.db('shilajit-store');

    // Get the TruBlk product ID
    const truBlkProduct = await db.collection('products').findOne({ id: 'agnishila-trublk-gold-resin' });
    if (!truBlkProduct) {
      console.log('TruBlk product not found');
      return;
    }

    console.log(`\nFound TruBlk product with ID: ${truBlkProduct._id}`);

    // Find all reviews for TruBlk product
    const truBlkReviews = await db.collection('reviews').find({ productId: truBlkProduct._id }).toArray();
    console.log(`Found ${truBlkReviews.length} reviews for TruBlk product`);

    if (truBlkReviews.length === 0) {
      console.log('No reviews to migrate');
      return;
    }

    // Get available product IDs (Shilajit Gummies and AshwaGlow Gummies)
    const availableProducts = await db.collection('products').find({
      id: { $in: ['agnishila-shilajit-gummies', 'ashwa-glo-gummies'] }
    }).toArray();

    console.log(`\nFound ${availableProducts.length} available products`);
    availableProducts.forEach(p => console.log(`  - ${p.id}`));

    if (availableProducts.length === 0) {
      console.log('No available products found');
      return;
    }

    // Reassign reviews to available products
    console.log(`\nReassigning ${truBlkReviews.length} reviews to available products...`);
    
    for (let i = 0; i < truBlkReviews.length; i++) {
      const review = truBlkReviews[i];
      const newProductId = availableProducts[i % availableProducts.length]._id;
      
      await db.collection('reviews').updateOne(
        { _id: review._id },
        { $set: { productId: newProductId } }
      );
      
      console.log(`  ✓ Review ${i + 1}/${truBlkReviews.length} reassigned to ${availableProducts[i % availableProducts.length].id}`);
    }

    console.log('\n✅ Reviews migrated successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   - Reviews reassigned: ${truBlkReviews.length}`);
    console.log(`   - From product: agnishila-trublk-gold-resin`);
    console.log(`   - To products: agnishila-shilajit-gummies, ashwa-glo-gummies`);

  } catch (error) {
    console.error('Error migrating reviews:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\nDatabase connection closed.');
  }
}

// Run the migration
migrateReviews();
