// Script para gerar favicon.png a partir do SVG
// Requer sharp: npm install --save-dev sharp

const fs = require('fs');
const path = require('path');

// SVG do favicon como string
const svgContent = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="4" fill="#1f2937"/>
  <text x="16" y="22" font-family="Montserrat, -apple-system, sans-serif" font-size="20" font-weight="700" fill="#d4af37" text-anchor="middle" dominant-baseline="middle">E</text>
</svg>`;

// Tentar usar sharp se disponível
try {
  const sharp = require('sharp');
  const outputPath = path.join(__dirname, '../public/favicon.png');
  
  sharp(Buffer.from(svgContent))
    .png()
    .resize(32, 32)
    .toFile(outputPath)
    .then(() => {
      console.log('✅ Favicon PNG gerado com sucesso em public/favicon.png');
      // Gerar também tamanhos maiores para icon.png
      return sharp(Buffer.from(svgContent))
        .png()
        .resize(512, 512)
        .toFile(path.join(__dirname, '../src/app/icon.png'));
    })
    .then(() => {
      console.log('✅ Icon PNG gerado com sucesso em src/app/icon.png');
    })
    .catch((err) => {
      console.error('Erro ao gerar PNG:', err);
      process.exit(1);
    });
} catch (err) {
  console.log('Sharp não encontrado. Instale com: npm install --save-dev sharp');
  console.log('Ou use uma ferramenta online para converter o SVG em PNG.');
  process.exit(1);
}

