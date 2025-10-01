import { promises as fs } from "fs";
import path from "path";
import zlib from "zlib";

const root = ".next/static/chunks";

async function run() {
  const files = await fs.readdir(root);
  const js = files.filter(f => f.endsWith(".js"));
  if (!js.length) throw new Error("No chunks found; did you run `next build`?");
  let largest = { name: "", size: 0 };
  for (const f of js) {
    const s = await fs.stat(path.join(root, f));
    if (s.size > largest.size) largest = { name: f, size: s.size };
  }
  const buf = await fs.readFile(path.join(root, largest.name));
  const gz = zlib.gzipSync(buf);
  await fs.mkdir("public/.bundle", { recursive: true });
  await fs.writeFile("public/.bundle/home.js.gz", gz);
  console.log(`gz size: ${(gz.length/1024).toFixed(1)} KB (${largest.name})`);
}
run().catch((e) => { console.error(e); process.exit(1); });
