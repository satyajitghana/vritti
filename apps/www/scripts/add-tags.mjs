import fs from "fs";
import path from "path";

const REGISTRY_DIR = path.resolve("registry/components");

const NAME_RULES = [
  { pattern: /3d|three-d/, tag: "3d" },
  { pattern: /scroll/, tag: "scroll" },
  { pattern: /hover/, tag: "hover" },
  { pattern: /cursor|mouse/, tag: "cursor" },
  { pattern: /gradient/, tag: "gradient" },
  { pattern: /text/, tag: "text" },
  { pattern: /button/, tag: "button" },
  { pattern: /card/, tag: "card" },
  { pattern: /grid/, tag: "grid" },
  { pattern: /carousel|slider/, tag: "carousel" },
  { pattern: /nav|menu|tab/, tag: "navigation" },
  { pattern: /input|form/, tag: "form" },
  { pattern: /glass/, tag: "glass" },
  { pattern: /blur/, tag: "blur" },
  { pattern: /particle|confetti|spark/, tag: "particles" },
  { pattern: /svg|path/, tag: "svg" },
  { pattern: /image|pixel|photo/, tag: "image" },
  { pattern: /video/, tag: "video" },
  { pattern: /shimmer|shiny|glow|neon/, tag: "glow" },
  { pattern: /flip|swap|rotate/, tag: "transform" },
  { pattern: /reveal|fade|blur-fade/, tag: "reveal" },
  { pattern: /type|writer|typing/, tag: "typewriter" },
  { pattern: /marquee|velocity/, tag: "marquee" },
  { pattern: /orbit|circle|ring/, tag: "orbit" },
];

const CATEGORY_RULES = {
  backgrounds: "background",
  animations: "animation",
  cursors: "cursor",
  text: "text",
  buttons: "button",
  cards: "card",
  carousels: "carousel",
  navigation: "navigation",
  inputs: "form",
};

function getTagsForComponent(name, category) {
  const tags = new Set();

  for (const rule of NAME_RULES) {
    if (rule.pattern.test(name)) {
      tags.add(rule.tag);
    }
  }

  if (category && CATEGORY_RULES[category]) {
    tags.add(CATEGORY_RULES[category]);
  }

  return [...tags];
}

function walkDir(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(fullPath));
    } else if (entry.name === "component.json") {
      results.push(fullPath);
    }
  }
  return results;
}

const files = walkDir(REGISTRY_DIR);
let totalProcessed = 0;
let totalModified = 0;
let totalTagsAdded = 0;

for (const filePath of files) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);

  const name = data.name || "";
  const category = data.category || "";

  const newTags = getTagsForComponent(name, category);
  if (newTags.length === 0) {
    totalProcessed++;
    continue;
  }

  // Ensure meta.tags exists
  if (!data.meta) data.meta = {};
  if (!Array.isArray(data.meta.tags)) data.meta.tags = [];

  const existingTags = new Set(data.meta.tags);
  const beforeCount = existingTags.size;

  for (const tag of newTags) {
    existingTags.add(tag);
  }

  data.meta.tags = [...existingTags];
  const addedCount = existingTags.size - beforeCount;

  if (addedCount > 0) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
    totalModified++;
    totalTagsAdded += addedCount;
    console.log(
      `  ${path.relative(REGISTRY_DIR, filePath)}: +${addedCount} tags → [${data.meta.tags.join(", ")}]`
    );
  }

  totalProcessed++;
}

console.log(`\n--- Summary ---`);
console.log(`Total component.json files: ${files.length}`);
console.log(`Processed: ${totalProcessed}`);
console.log(`Modified: ${totalModified}`);
console.log(`New tags added: ${totalTagsAdded}`);
