// Rebuild from the private originals, never from an already marked image.
import fs from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = path.join(root, 'public/projects');
const backupRoot = path.join(root, 'backups/portfolio-originals');
const hash = b => crypto.createHash('sha256').update(b).digest('hex');

async function walk(dir) {
  const result = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await walk(full));
    else if (/\.(png|gif)$/i.test(entry.name) && entry.name !== 'thumbnail-clean.png') result.push(full);
  }
  return result;
}

async function main() {
  const report = [];
  for (const destination of await walk(publicRoot)) {
    const relative = path.relative(publicRoot, destination);
    const original = path.join(backupRoot, relative);
    await fs.mkdir(path.dirname(original), { recursive: true });
    try { await fs.copyFile(destination, original, constants.COPYFILE_EXCL); }
    catch (error) { if (error.code !== 'EEXIST') throw error; }
    const source = await fs.readFile(original);
    const animated = /\.gif$/i.test(destination);
    const before = await sharp(source, { animated }).metadata();
    const width = before.width;
    const height = before.pageHeight || before.height;
    const center = await sharp(source).extract({ left: Math.round(width * .2), top: Math.round(height * .3), width: Math.round(width * .6), height: Math.round(height * .4) }).stats();
    const brightness = center.channels[0].mean * .2126 + center.channels[1].mean * .7152 + center.channels[2].mean * .0722;
    const fill = brightness > 150 ? '#263238' : '#ffffff';
    const stroke = brightness > 150 ? '#ffffff' : '#000000';
    const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><g transform="rotate(-18 ${width / 2} ${height / 2})" opacity="0.22"><text x="50%" y="50%" dy=".35em" text-anchor="middle" font-family="Arial, sans-serif" font-size="${width * 0.05}" font-weight="500" fill="${fill}" stroke="${stroke}" stroke-opacity="0.35" stroke-width="1" paint-order="stroke">APLearning · Portafolio</text></g></svg>`);
    // A full-frame tile repeats once per frame in Sharp's vertical GIF strip.
    const overlay = await sharp(svg).png().toBuffer();
    let pipeline = sharp(source, { animated }).composite([{ input: overlay, tile: true, gravity: 'northwest' }]);
    pipeline = animated ? pipeline.gif({ loop: before.loop, delay: before.delay, effort: 7, keepDuplicateFrames: true }) : pipeline.png();
    const output = await pipeline.toBuffer();
    const after = await sharp(output, { animated }).metadata();
    if (before.width !== after.width || before.height !== after.height ||
        (before.pages || 1) !== (after.pages || 1) ||
        JSON.stringify(before.delay) !== JSON.stringify(after.delay) || before.loop !== after.loop) {
      throw new Error(`Animation or dimensions changed: ${relative}`);
    }
    await fs.writeFile(destination, output);
    report.push({ file: relative, originalSha256: hash(source), markedSha256: hash(output), frames: after.pages || 1, fill });
    console.log(`${relative}: ${after.pages || 1} frame(s)`);
  }
  const thumbnails = {
    'banrep-seguridad-vial': 'm1-cover-thumb.png',
    'diversidad-equidad-inclusion': 'cover.png',
    'mac-codigo-etica': '01-fundamentos.png',
    'mpf-cumplimiento-normativo': '00-cover.png',
    'sportline-efecto-wow': '01-cover.png',
    'stl-onboarding': 'cover-thumb.png',
  };
  for (const [folder, name] of Object.entries(thumbnails)) {
    await sharp(path.join(backupRoot, folder, name)).resize({ width: 960, withoutEnlargement: true }).png().toFile(path.join(publicRoot, folder, 'thumbnail-clean.png'));
  }
  await fs.writeFile(path.join(backupRoot, 'manifest.json'), JSON.stringify({ text: 'APLearning · Portafolio', opacity: 0.22, angle: -18, files: report }, null, 2));
  console.log(`Verified ${report.length} assets. Originals: ${backupRoot}`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
