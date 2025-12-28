const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://developerduco:p2nDgP07paBQewdi@cluster0.sms0okt.mongodb.net/shilajit-store?retryWrites=true&w=majority&appName=Cluster0';

async function removeTruBlkReviews() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully!');

    const db = client.db('shilajit-store');

    // Find all reviews for TruBlk product using the product ID string
    const truBlkProductId = 'agnishila-trublk-gold-resin';
    const truBlkReviews = await db.collection('reviews').find({ productId: truBlkProductId }).toArray();
    console.log(`\nFound ${truBlkReviews.length} reviews for TruBlk product (${truBlkProductId})`);

    if (truBlkReviews.length > 0) {
      console.log('Reviews to remove:');
      truBlkReviews.forEach((review, index) => {
        console.log(`  ${index + 1}. "${review.title}" - ${review.rating}⭐ by ${review.userName}`);
      });

      // Delete all TruBlk reviews
      console.log(`\nRemoving ${truBlkReviews.length} reviews for TruBlk product...`);
      const deleteResult = await db.collection('reviews').deleteMany({ productId: truBlkProductId });
      
      console.log(`\n✅ Successfully removed ${deleteResult.deletedCount} reviews!`);
    } else {
      console.log('No reviews to remove');
    }

    console.log(`\n📊 Summary:`);
    console.log(`   - Reviews removed: ${truBlkReviews.length}`);
    console.log(`   - From product: ${truBlkProductId}`);

  } catch (error) {
    console.error('Error removing reviews:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\nDatabase connection closed.');
  }
}

// Run the removal
removeTruBlkReviews();
