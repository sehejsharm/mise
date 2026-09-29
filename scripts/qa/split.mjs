// node scripts/qa/split.mjs <in.png> <outPrefix> [chunkHeight] [outWidth]
import sharp from "sharp";
const [input, prefix, chunk = "2400", outW = "720"] = process.argv.slice(2);
const meta = await sharp(input).metadata();
const ch = Number(chunk);
const n = Math.ceil(meta.height / ch);
for (let i = 0; i < n; i++) {
  const top = i * ch;
  const height = Math.min(ch, meta.height - top);
  await sharp(input).extract({ left: 0, top, width: meta.width, height }).resize({ width: Number(outW) }).toFile(`${prefix}${i}.png`);
}
console.log(meta.width, meta.height, n);
