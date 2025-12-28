const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://developerduco:p2nDgP07paBQewdi@cluster0.sms0okt.mongodb.net/shilajit-store?retryWrites=true&w=majority&appName=Cluster0';

async function checkAllReviews() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully!');

    const db = client.db('shilajit-store');

    // Get all reviews
    const allReviews = await db.collection('reviews').find({}).toArray();
    console.log(`\nTotal reviews in database: ${allReviews.length}`);

    if (allReviews.length > 0) {
      console.log('\nAll reviews:');
      allReviews.forEach((review, index) => {
        console.log(`\n${index + 1}. Review ID: ${review._id}`);
        console.log(`   Product ID: ${review.productId}`);
        console.log(`   Title: "${review.title}"`);
        console.log(`   Rating: ${review.rating}⭐`);
        console.log(`   By: ${review.userName}`);
      });
    }

    // Get all products
    const allProducts = await db.collection('products').find({}).toArray();
    console.log(`\n\nTotal products in database: ${allProducts.length}`);
    console.log('\nAll products:');
    allProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.id} (MongoDB ID: ${product._id})`);
    });

  } catch (error) {
    console.error('Error checking reviews:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\nDatabase connection closed.');
  }
}

// Run the check
checkAllReviews();
