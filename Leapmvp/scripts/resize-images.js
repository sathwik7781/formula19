const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = {
  ios: [
    { size: 20, scales: [1, 2, 3] },
    { size: 29, scales: [1, 2, 3] },
    { size: 40, scales: [1, 2, 3] },
    { size: 60, scales: [2, 3] },
    { size: 76, scales: [1, 2] },
    { size: 83.5, scales: [2] },
    { size: 1024, scales: [1] }
  ],
  android: [
    { size: 48, density: 'mdpi' },
    { size: 72, density: 'hdpi' },
    { size: 96, density: 'xhdpi' },
    { size: 144, density: 'xxhdpi' },
    { size: 192, density: 'xxxhdpi' }
  ]
};

async function resizeImages() {
  const sourceIcon = path.join(__dirname, '../assets/images/icon.png');
  
  // iOS
  for (const config of sizes.ios) {
    for (const scale of config.scales) {
      const size = Math.round(config.size * scale);
      const filename = `icon-${config.size}@${scale}x.png`;
      await sharp(sourceIcon)
        .resize(size, size)
        .toFile(path.join(__dirname, '../assets/images/ios', filename));
    }
  }

  // Android
  for (const config of sizes.android) {
    const filename = `icon-${config.density}.png`;
    await sharp(sourceIcon)
      .resize(config.size, config.size)
      .toFile(path.join(__dirname, '../assets/images/android', filename));
  }
}

resizeImages().catch(console.error); 