const fs = require('fs');
const path = require('path');

// Define the images that should exist
const requiredImages = [
  'public/images/image-removebg-preview.png',
  'public/images/image-removebg-preview (1).png',
  'public/images/image.png',
  'public/bg/vd.jpg',
  'public/bg/hero-background.jpg'
];

console.log('🔍 Checking image files...\n');

let allImagesExist = true;

requiredImages.forEach(imagePath => {
  if (fs.existsSync(imagePath)) {
    const stats = fs.statSync(imagePath);
    console.log(`✅ ${imagePath} - ${(stats.size / 1024).toFixed(2)} KB`);
  } else {
    console.log(`❌ ${imagePath} - NOT FOUND`);
    allImagesExist = false;
  }
});

console.log('\n📊 Summary:');
if (allImagesExist) {
  console.log('✅ All required images are present!');
} else {
  console.log('❌ Some images are missing. Please check the files above.');
}

// Check for any extra files that might be causing confusion
console.log('\n📁 All files in public/images:');
const imagesDir = 'public/images';
if (fs.existsSync(imagesDir)) {
  const files = fs.readdirSync(imagesDir);
  files.forEach(file => {
    const filePath = path.join(imagesDir, file);
    const stats = fs.statSync(filePath);
    console.log(`   ${file} - ${(stats.size / 1024).toFixed(2)} KB`);
  });
}

console.log('\n📁 All files in public/bg:');
const bgDir = 'public/bg';
if (fs.existsSync(bgDir)) {
  const files = fs.readdirSync(bgDir);
  files.forEach(file => {
    const filePath = path.join(bgDir, file);
    const stats = fs.statSync(filePath);
    console.log(`   ${file} - ${(stats.size / 1024).toFixed(2)} KB`);
  });
}