const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const QUALITY = 80; // Quality for WebP compression (80 is optimal)
const INPUT_DIR = path.join(__dirname, '../public/images');
const BACKUP_DIR = path.join(__dirname, '../public/images/backup');

// Create backup directory if it doesn't exist
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Function to get file size in KB
function getFileSizeInKB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

// Function to compress a single WebP image
async function compressImage(inputPath, outputPath) {
  const originalSize = getFileSizeInKB(inputPath);

  try {
    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const newSize = getFileSizeInKB(outputPath);
    const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);

    console.log(`✅ ${path.basename(inputPath)}: ${originalSize} KB → ${newSize} KB (${reduction}% reduction)`);
  } catch (error) {
    console.error(`❌ Error compressing ${path.basename(inputPath)}:`, error.message);
  }
}

// Function to find and compress all WebP images
async function compressAllImages(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip backup directory
      if (file !== 'backup') {
        await compressAllImages(filePath);
      }
    } else if (file.endsWith('.webp')) {
      // Create backup
      const backupPath = path.join(BACKUP_DIR, file);
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(filePath, backupPath);
        console.log(`📦 Backup created: ${file}`);
      }

      // Compress (overwrite original)
      const tempPath = filePath + '.tmp';
      await compressImage(filePath, tempPath);

      // Replace original with compressed version (Windows-compatible)
      try {
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
      } catch (error) {
        // If rename fails, try copy + delete
        fs.copyFileSync(tempPath, filePath);
        fs.unlinkSync(tempPath);
      }
    }
  }
}

// Main execution
console.log('🚀 Starting image compression...\n');
console.log(`Quality: ${QUALITY}%`);
console.log(`Input directory: ${INPUT_DIR}`);
console.log(`Backup directory: ${BACKUP_DIR}\n`);

compressAllImages(INPUT_DIR)
  .then(() => {
    console.log('\n✨ Image compression completed!');
    console.log('💡 Original images have been backed up to public/images/backup/');
  })
  .catch(error => {
    console.error('\n❌ Compression failed:', error);
    process.exit(1);
  });
