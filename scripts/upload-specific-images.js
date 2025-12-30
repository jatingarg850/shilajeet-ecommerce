const cloudinary = require('cloudinary').v2;
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dsejv31js',
  api_key: '135323965146833',
  api_secret: 'EGciyFFaJD3TqYdzOnCqxDVQi6c',
});

const imagesToUpload = [
  {
    path: path.join(__dirname, '../public/IMG_0523.PNG'),
    publicId: 'agnishila/IMG_0523',
    name: 'IMG_0523.PNG'
  },
  {
    path: path.join(__dirname, '../public/purpose.jpeg'),
    publicId: 'agnishila/purpose',
    name: 'purpose.jpeg'
  }
];

async function uploadImages() {
  console.log(`Uploading ${imagesToUpload.length} images to Cloudinary...\n`);
  
  const results = {};
  
  for (const image of imagesToUpload) {
    try {
      console.log(`Uploading: ${image.name}...`);
      
      const result = await cloudinary.uploader.upload(image.path, {
        public_id: image.publicId,
        folder: 'agnishila',
        quality: 'auto',
        fetch_format: 'auto',
        overwrite: true,
      });
      
      results[image.name] = result.secure_url;
      console.log(`✓ Uploaded: ${image.name}`);
      console.log(`  URL: ${result.secure_url}\n`);
    } catch (error) {
      console.error(`✗ Failed to upload ${image.name}:`, error.message);
    }
  }
  
  console.log('\n📊 Upload Summary:');
  console.log('=====================================');
  Object.entries(results).forEach(([name, url]) => {
    console.log(`\n${name}:`);
    console.log(`${url}`);
  });
  
  console.log('\n✅ Upload complete!');
}

uploadImages().catch(console.error);
