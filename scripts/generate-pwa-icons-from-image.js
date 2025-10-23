// Script para gerar ícones PWA a partir de uma imagem existente
// Para usar: node scripts/generate-pwa-icons-from-image.js

import { createCanvas, loadImage } from 'canvas';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateIcon(size, format = 'png') {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Carrega a imagem base
    const imagePath = join(__dirname, '../public/simbolo-secundario.png');
    const image = await loadImage(imagePath);

    // Fundo sólido (cor da marca)
    ctx.fillStyle = '#2E3192';
    ctx.fillRect(0, 0, size, size);

    // Calcula o tamanho da imagem mantendo proporção e centralização
    const padding = size * 0.15; // 15% de padding para melhor visualização
    const maxImageSize = size - (padding * 2);
    
    let drawWidth = maxImageSize;
    let drawHeight = maxImageSize;
    
    // Ajusta para manter proporção da imagem original
    const imageAspect = image.width / image.height;
    if (imageAspect > 1) {
        drawHeight = drawWidth / imageAspect;
    } else {
        drawWidth = drawHeight * imageAspect;
    }

    // Centraliza a imagem perfeitamente
    const x = Math.round((size - drawWidth) / 2);
    const y = Math.round((size - drawHeight) / 2);

    // Ativa suavização para melhor qualidade
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Desenha a imagem
    ctx.drawImage(image, x, y, drawWidth, drawHeight);

    // Salva o arquivo
    const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
    const buffer = format === 'jpg' 
        ? canvas.toBuffer('image/jpeg', { quality: 0.95 })
        : canvas.toBuffer('image/png');
    
    const outputPath = join(__dirname, `../public/pwa-${size}x${size}.${format}`);
    
    try {
        mkdirSync(dirname(outputPath), { recursive: true });
        writeFileSync(outputPath, buffer);
        console.log(`✅ Ícone ${size}x${size}.${format} gerado com sucesso!`);
    } catch (error) {
        console.error(`❌ Erro ao gerar ícone ${size}x${size}.${format}:`, error);
    }
}

// Gera os ícones
console.log('🎨 Gerando ícones PWA a partir do simbolo-secundario.png...\n');

const sizes = [192, 512];
const formats = ['png', 'jpg'];

(async () => {
    for (const size of sizes) {
        for (const format of formats) {
            await generateIcon(size, format);
        }
    }
    console.log('\n✨ Todos os ícones foram gerados com sucesso!');
})();

