/**
 * Generates the app icons as real PNGs.
 *
 * iOS 17 will not accept SVG for apple-touch-icon, and without a PNG the Home
 * Screen falls back to a screenshot of the page — which looks like a mistake.
 * No image libraries are installed and none are wanted (D: no build step), so
 * this rasterises by hand and encodes PNG with the built-in zlib.
 *
 * The mark: five dots in a ring — the five learning areas — around one warm
 * centre, the child. Colours here are the app's area palette and are the same
 * values used in styles/app.css. Keep them in sync.
 *
 * Run: node tools/make-icons.mjs
 */

import zlib from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';

const GROUND = [0x14, 0x49, 0x5e];        // deep lake blue
const CENTRE = [0xf2, 0xf5, 0xf6];        // birch white
const AREAS = [
  [0xe8, 0xb0, 0x3a],  // L1 languages   — amber
  [0xc8, 0x55, 0x3d],  // L2 expression  — rowan
  [0x8e, 0x6f, 0xa8],  // L3 community   — heather
  [0x4f, 0xa0, 0x7a],  // L4 exploring   — pine
  [0x4a, 0x9b, 0xc4]   // L5 grow/move   — sky
];

/* ---- PNG encoding ---- */

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32 (buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk (type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePng (width, height, rgb) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;   // 8 bits per channel
  ihdr[9] = 2;   // truecolour RGB
  // 10,11,12 = deflate / adaptive filtering / no interlace, all zero

  // Each scanline is prefixed with filter byte 0 (None).
  const raw = Buffer.alloc(height * (1 + width * 3));
  for (let y = 0; y < height; y++) {
    const row = y * (1 + width * 3);
    raw[row] = 0;
    rgb.copy(raw, row + 1, y * width * 3, (y + 1) * width * 3);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

/* ---- drawing ---- */

function draw (size) {
  const px = Buffer.alloc(size * size * 3);
  const ss = 3;                       // supersample factor, for smooth edges
  const c = size / 2;
  const ringR = size * 0.29;          // radius of the ring the five dots sit on
  const dotR = size * 0.098;
  const midR = size * 0.088;

  // Pre-compute the five dot centres. Start at the top (-90°) so the mark has
  // an obvious "up" — a rotated pentagon reads as an accident.
  const dots = AREAS.map((rgb, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return { x: c + Math.cos(a) * ringR, y: c + Math.sin(a) * ringR, rgb };
  });

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0;

      for (let sy = 0; sy < ss; sy++) {
        for (let sx = 0; sx < ss; sx++) {
          const px0 = x + (sx + 0.5) / ss;
          const py0 = y + (sy + 0.5) / ss;

          let col = GROUND;
          // Centre dot first, then the ring — nothing overlaps at these radii,
          // so order only matters if the geometry is later changed.
          if ((px0 - c) ** 2 + (py0 - c) ** 2 <= midR * midR) {
            col = CENTRE;
          } else {
            for (const d of dots) {
              if ((px0 - d.x) ** 2 + (py0 - d.y) ** 2 <= dotR * dotR) { col = d.rgb; break; }
            }
          }
          r += col[0]; g += col[1]; b += col[2];
        }
      }

      const n = ss * ss;
      const o = (y * size + x) * 3;
      px[o] = Math.round(r / n);
      px[o + 1] = Math.round(g / n);
      px[o + 2] = Math.round(b / n);
    }
  }

  return encodePng(size, size, px);
}

/* ---- emit ---- */

mkdirSync(new URL('../icons/', import.meta.url), { recursive: true });

// 180 = apple-touch-icon (iOS). 192 + 512 = web app manifest.
for (const size of [180, 192, 512]) {
  const buf = draw(size);
  const path = new URL(`../icons/icon-${size}.png`, import.meta.url);
  writeFileSync(path, buf);
  console.log(`icon-${size}.png  ${size}x${size}  ${(buf.length / 1024).toFixed(1)} KB`);
}
