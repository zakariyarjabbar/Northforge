import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const source = process.argv[2];
if (!source) throw new Error('Pass the asset source directory.');
await fs.mkdir('public/images', { recursive: true });
await fs.mkdir('public/og', { recursive: true });
const files = (await fs.readdir(source)).filter(f => /^.+-\d\.png$/.test(f));
for (const file of files) {
  const name = file.replace('.png', '');
  const original = path.join(source, file);
  for (const [width, suffix, quality] of [[1920, '', 86], [720, '-small', 80]]) {
    const dest = `public/images/${name}${suffix}.webp`;
    try { await fs.access(dest); } catch { await sharp(original).resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(dest); }
  }
}
try { await fs.copyFile(path.join(source, 'provenance.json'), 'docs/IMAGE-PROMPTS.json'); } catch { /* The asset producer may still be running. */ }
console.log(`Imported ${files.length} photographs with responsive sizes.`);
