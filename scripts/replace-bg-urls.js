const fs = require('fs');
const path = require('path');

// Cloudinary background URL
const CLOUDINARY_BG_URL = 'https://res.cloudinary.com/dsejv31js/image/upload/v1767090389/agnishila/bg/vd.jpg';

// Files to search and replace
const srcDir = path.join(__dirname, '../');
const fileExtensions = ['.tsx', '.ts', '.jsx', '.js'];

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    // Skip node_modules, .next, .git, public
    if (['node_modules', '.next', '.git', 'public', '.vscode', 'dist'].includes(file)) {
      return;
    }
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (fileExtensions.includes(path.extname(file))) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function replaceBackgroundUrls(content) {
  let updated = content;
  
  // Replace all variations of /bg/vd.jpg
  const patterns = [
    /backgroundImage:\s*['"]url\(\/bg\/vd\.jpg\)['"]/g,
    /backgroundImage:\s*['"]\/bg\/vd\.jpg['"]/g,
    /['"]\/bg\/vd\.jpg['"]/g,
  ];
  
  patterns.forEach(pattern => {
    if (pattern.test(updated)) {
      updated = updated.replace(pattern, `backgroundImage: 'url(${CLOUDINARY_BG_URL})'`);
    }
  });
  
  return updated;
}

async function replaceInFiles() {
  const files = getAllFiles(srcDir);
  let filesModified = 0;
  
  console.log(`Scanning ${files.length} files for background URLs...`);
  
  files.forEach(filePath => {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      content = replaceBackgroundUrls(content);
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        filesModified++;
        console.log(`✓ Updated: ${path.relative(srcDir, filePath)}`);
      }
    } catch (error) {
      console.error(`✗ Error processing ${filePath}:`, error.message);
    }
  });
  
  console.log(`\nReplacement complete!`);
  console.log(`Files modified: ${filesModified}`);
}

replaceInFiles().catch(console.error);
