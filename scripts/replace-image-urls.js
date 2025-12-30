const fs = require('fs');
const path = require('path');

// Read the mapping file
const mappingFile = path.join(__dirname, '../cloudinary-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));

// Create a simpler mapping with just the path patterns
const urlMap = {};
Object.entries(mapping).forEach(([oldPath, newUrl]) => {
  // Extract just the relative path without /public/
  const relativePath = oldPath.replace('/public/', '').replace(/\\/g, '/');
  urlMap[relativePath] = newUrl;
});

// Files to search and replace
const srcDir = path.join(__dirname, '../');
const fileExtensions = ['.tsx', '.ts', '.jsx', '.js', '.json'];

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

function replaceUrls(content) {
  let updated = content;
  
  Object.entries(urlMap).forEach(([oldPath, newUrl]) => {
    // Replace various path patterns
    const patterns = [
      new RegExp(`['"]/${oldPath}['"]`, 'g'),
      new RegExp(`['"]${oldPath}['"]`, 'g'),
      new RegExp(`['"]/public/${oldPath}['"]`, 'g'),
    ];
    
    patterns.forEach(pattern => {
      if (pattern.test(updated)) {
        updated = updated.replace(pattern, `'${newUrl}'`);
      }
    });
  });
  
  return updated;
}

async function replaceInFiles() {
  const files = getAllFiles(srcDir);
  let replacedCount = 0;
  let filesModified = 0;
  
  console.log(`Scanning ${files.length} files for image URLs...`);
  
  files.forEach(filePath => {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      content = replaceUrls(content);
      
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
