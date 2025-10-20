const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const QUALITY = 80;
const INPUT_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images-compressed');

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Get file size in KB
function getFileSizeInKB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

// Compress image
async function compressImage(inputPath, outputPath) {
  const originalSize = getFileSizeInKB(inputPath);

  await sharp(inputPath)
    .webp({ quality: QUALITY })
    .toFile(outputPath);

  const newSize = getFileSizeInKB(outputPath);
  const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);

  console.log(`✅ ${path.basename(inputPath)}: ${originalSize} KB → ${newSize} KB (${reduction}% reduction)`);

  return { originalSize, newSize, reduction };
}

// Process directory recursively
async function processDirectory(inputDir, outputDir) {
  const files = fs.readdirSync(inputDir);
  let stats = { totalOriginal: 0, totalNew: 0, count: 0 };

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const stat = fs.statSync(inputPath);

    if (stat.isDirectory()) {
      const newOutputDir = path.join(outputDir, file);
      if (!fs.existsSync(newOutputDir)) {
        fs.mkdirSync(newOutputDir, { recursive: true });
      }
      const subStats = await processDirectory(inputPath, newOutputDir);
      stats.totalOriginal += subStats.totalOriginal;
      stats.totalNew += subStats.totalNew;
      stats.count += subStats.count;
    } else if (file.endsWith('.webp')) {
      const outputPath = path.join(outputDir, file);
      const result = await compressImage(inputPath, outputPath);
      stats.totalOriginal += parseFloat(result.originalSize);
      stats.totalNew += parseFloat(result.newSize);
      stats.count++;
    }
  }

  return stats;
}

// Main
console.log('🚀 Starting image compression...\n');
console.log(`Quality: ${QUALITY}%`);
console.log(`Input: ${INPUT_DIR}`);
console.log(`Output: ${OUTPUT_DIR}\n`);

processDirectory(INPUT_DIR, OUTPUT_DIR)
  .then((stats) => {
    console.log('\n✨ Compression completed!');
    console.log(`📊 Total: ${stats.count} images`);
    console.log(`📦 Original size: ${stats.totalOriginal.toFixed(2)} KB (${(stats.totalOriginal / 1024).toFixed(2)} MB)`);
    console.log(`📦 Compressed size: ${stats.totalNew.toFixed(2)} KB (${(stats.totalNew / 1024).toFixed(2)} MB)`);
    console.log(`💾 Total saved: ${(stats.totalOriginal - stats.totalNew).toFixed(2)} KB (${((1 - stats.totalNew / stats.totalOriginal) * 100).toFixed(1)}%)`);
    console.log(`\n💡 Compressed images are in: public/images-compressed/`);
    console.log('💡 To use them: Stop your dev server, delete public/images/, rename public/images-compressed/ to public/images/, then restart');
  })
  .catch(error => {
    console.error('\n❌ Error:', error);
    process.exit(1);
  });
