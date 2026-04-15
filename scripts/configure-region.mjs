#!/usr/bin/env node
import { copyFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const region = process.argv[2] || process.env.REGION || 'carolina';
const srcDir = join(root, 'regions', region, 'icons');
const destDir = join(root, 'static');

if (!existsSync(srcDir)) {
  console.error(`[configure-region] Unknown region "${region}" — no directory at ${srcDir}`);
  process.exit(1);
}

const files = readdirSync(srcDir);
for (const file of files) {
  copyFileSync(join(srcDir, file), join(destDir, file));
}
console.log(`[configure-region] Copied ${files.length} icon(s) from regions/${region}/icons → static/`);
