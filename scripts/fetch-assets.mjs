import fs from "node:fs/promises";
import path from "node:path";

const FILE_KEY = "pwCu6ZedksePduXD086i3w";
const OUT_DIR = path.join(process.cwd(), "public", "images");
const TOKEN = process.env.FIGMA_API_KEY ?? process.env.FIGMA_ACCESS_TOKEN ?? "";

const unsplash = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const assets = [
  { name: "hero.jpg", node: "117:357", url: unsplash("photo-1616486338812-3dadae4b4ace", 1920) },
  { name: "banner.jpg", node: "71:20", url: unsplash("photo-1618221195710-dd6b41faaea6", 1920) },
  { name: "category-dining.jpg", node: "117:374", url: unsplash("photo-1617806118233-18e1de247200", 900) },
  { name: "category-living.jpg", node: "117:379", url: unsplash("photo-1586023492125-27b2c045efd7", 900) },
  { name: "category-bedroom.jpg", node: "117:384", url: unsplash("photo-1616594039964-ae9021a400a0", 900) },

  { name: "product-syltherine.jpg", node: "117:409", url: unsplash("photo-1567538096630-e0c55bd6374c", 900) },
  { name: "leviosa.jpg", node: "I117:449;117:409", url: unsplash("photo-1503602642458-232111445657", 900) },
  { name: "product-lolito.jpg", node: "I117:450;117:409", url: unsplash("photo-1555041469-a586c61ea9bc", 900) },
  { name: "product-respira.jpg", node: "I117:451;117:409", url: unsplash("photo-1592078615290-033ee584e267", 900) },
  { name: "product-grifo.jpg", node: "I117:453;117:409", url: unsplash("photo-1507473885765-e6ed057f782c", 900) },
  { name: "product-muggo.jpg", node: "I117:454;117:409", url: unsplash("photo-1514228742587-6b1558fcca3d", 900) },
  { name: "product-pingky.jpg", node: "I117:455;117:409", url: unsplash("photo-1505693416388-ac5ce068fe85", 900) },
  { name: "product-potty.jpg", node: "I117:456;117:409", url: unsplash("photo-1485955900006-10f4d324d411", 900) },
  { name: "product-asgaard-1.jpg", node: "117:495", url: unsplash("photo-1555041469-a586c61ea9bc", 1200) },
  { name: "product-asgaard-2.jpg", node: "117:497", url: unsplash("photo-1550581190-9c1c48d21d6c", 1200) },
  { name: "product-asgaard-3.jpg", node: "117:501", url: unsplash("photo-1540574163026-643ea20ade25", 1200) },
  { name: "product-asgaard-4.jpg", node: "117:502", url: unsplash("photo-1493809842364-78817add7ffb", 1200) },

  { name: "inspiration-1.jpg", node: "117:462", url: unsplash("photo-1616594039964-ae9021a400a0", 1200) },
  { name: "inspiration-2.jpg", node: "117:474", url: unsplash("photo-1586023492125-27b2c045efd7", 1200) },
  { name: "inspiration-3.jpg", node: "117:475", url: unsplash("photo-1617806118233-18e1de247200", 1200) },

  { name: "gallery-1.jpg", node: "117:495", url: unsplash("photo-1524758631624-e2822e304c36", 800) },
  { name: "gallery-2.jpg", node: "117:496", url: unsplash("photo-1505693416388-ac5ce068fe85", 800) },
  { name: "gallery-3.jpg", node: "117:497", url: unsplash("photo-1493809842364-78817add7ffb", 800) },
  { name: "gallery-4.jpg", node: "117:498", url: unsplash("photo-1618221195710-dd6b41faaea6", 800) },
  { name: "gallery-5.jpg", node: "117:499", url: unsplash("photo-1550581190-9c1c48d21d6c", 800) },
  { name: "gallery-6.jpg", node: "117:500", url: unsplash("photo-1540574163026-643ea20ade25", 800) },
  { name: "gallery-7.jpg", node: "117:501", url: unsplash("photo-1616486338812-3dadae4b4ace", 800) },
  { name: "gallery-8.jpg", node: "117:502", url: unsplash("photo-1567016432779-094069958ea5", 800) },
  { name: "gallery-9.jpg", node: "117:503", url: unsplash("photo-1519710164239-da123dc03ef4", 800) },

  { name: "about-studio.jpg", node: "117:496", url: unsplash("photo-1524758631624-e2822e304c36", 1200) },
  { name: "blog-1.jpg", node: "117:462", url: unsplash("photo-1555041469-a586c61ea9bc", 1200) },
  { name: "blog-2.jpg", node: "117:474", url: unsplash("photo-1505693416388-ac5ce068fe85", 1200) },
  { name: "blog-3.jpg", node: "117:475", url: unsplash("photo-1617806118233-18e1de247200", 1200) },
  { name: "blog-4.jpg", node: "117:499", url: unsplash("photo-1616486338812-3dadae4b4ace", 1200) },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function tryFigmaExport(asset) {
  if (!TOKEN || !asset.node) return false;
  const url = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(
    asset.node,
  )}&format=jpg&scale=2`;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = await fetch(url, { headers: { "X-Figma-Token": TOKEN } });
    if (response.ok) {
      const payload = await response.json();
      const imageUrl = payload.images?.[asset.node];
      if (!imageUrl) return false;
      const image = await fetch(imageUrl);
      if (!image.ok) return false;
      await fs.writeFile(path.join(OUT_DIR, asset.name), Buffer.from(await image.arrayBuffer()));
      console.log(`figma   ${asset.name}`);
      return true;
    }
    if (response.status === 429) {
      const retryAfter = Number(response.headers.get("retry-after") ?? 2);
      if (retryAfter > 15) {
        console.warn(`figma   429 (retry-after ${retryAfter}s) -> falling back for ${asset.name}`);
        return false;
      }
      await sleep(Math.max(1, retryAfter) * 1000);
      continue;
    }
    return false;
  }
  return false;
}

async function download(url, destination, attempt = 1) {
  const response = await fetch(url);
  if (!response.ok) {
    if (attempt < 3) {
      await sleep(attempt * 1500);
      return download(url, destination, attempt + 1);
    }
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  const type = response.headers.get("content-type") ?? "";
  if (!type.startsWith("image/")) {
    throw new Error(`Unexpected content-type ${type} for ${url}`);
  }
  await fs.writeFile(destination, Buffer.from(await response.arrayBuffer()));
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  let downloaded = 0;
  let skipped = 0;

  for (const asset of assets) {
    const destination = path.join(OUT_DIR, asset.name);
    try {
      await fs.access(destination);
      skipped += 1;
      continue;
    } catch {
      // missing, continue
    }

    let done = false;
    try {
      done = await tryFigmaExport(asset);
    } catch (error) {
      console.warn(`figma   export failed for ${asset.name}: ${error.message}`);
    }

    if (!done) {
      try {
        await download(asset.url, destination);
        console.log(`fallback ${asset.name}`);
      } catch (error) {
        console.error(`failed   ${asset.name}: ${error.message}`);
        continue;
      }
    }
    downloaded += 1;
  }

  console.log(`\nassets: ${downloaded} downloaded, ${skipped} already present`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});


