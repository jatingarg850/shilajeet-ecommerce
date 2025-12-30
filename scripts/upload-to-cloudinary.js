const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dsejv31js',
  api_key: '135323965146833',
  api_secret: 'EGciyFFaJD3TqYdzOnCqxDVQi6c',
});

const publicDir = path.join(__dirname, '../public');
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

// Get all image files recursively
function getAllImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllImages(filePath, fileList);
    } else if (imageExtensions.includes(path.extname(file).toLowerCase())) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

async function uploadImages() {
  const images = getAllImages(publicDir);
  const urlMapping = {};
  
  console.log(`Found ${images.length} images to upload...`);
  
  for (const imagePath of images) {
    try {
      const relativePath = path.relative(publicDir, imagePath);
      const publicId = relativePath.replace(/\\/g, '/').replace(/\.[^/.]+$/, '');
      
      console.log(`Uploading: ${relativePath}...`);
      
      const result = await cloudinary.uploader.upload(imagePath, {
        public_id: publicId,
        folder: 'agnishila',
        quality: 'auto',
        fetch_format: 'auto',
        overwrite: true,
      });
      
      urlMapping[`/public/${relativePath}`] = result.secure_url;
      console.log(`✓ Uploaded: ${relativePath} -> ${result.secure_url}`);
    } catch (error) {
      console.error(`✗ Failed to upload ${imagePath}:`, error.message);
    }
  }
  
  // Save mapping to file
  const mappingFile = path.join(__dirname, '../cloudinary-mapping.json');
  fs.writeFileSync(mappingFile, JSON.stringify(urlMapping, null, 2));
  console.log(`\nMapping saved to: ${mappingFile}`);
  console.log(`Total images uploaded: ${Object.keys(urlMapping).length}`);
}

uploadImages().catch(console.error);
