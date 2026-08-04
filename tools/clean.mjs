// clean raw captions: strip markers/hashtags/mentions, dedupe, exclude jinjin
import fs from "node:fs";
const base = "C:\\Users\\\u674e\u4e00\u6602\\Documents\\Copywriting creat\\data\\";
const d1 = JSON.parse(fs.readFileSync(base + "raw_captions.json", "utf8"));
const d2 = JSON.parse(fs.readFileSync(base + "raw_captions2.json", "utf8"));

function cleanBody(raw) {
  let t = raw;
  t = t.replace(/#[^#\s]+/g, " ");
  t = t.replace(/@[^@\s]+/g, " ");
  t = t.replace(/(\u7f6e\u9876|\u5171\u521b|\s)*\d+(\.\d+)?\u4e07?\s*/g, " ");
  return t.replace(/\s+/g, " ").trim();
}
function extractTags(raw) {
  const tags = [];
  const re = /#([^\s#]+)/g;
  let m;
  while ((m = re.exec(raw))) tags.push("#" + m[1]);
  return tags;
}

const exclude = new Set();
for (const it of d1["EXCLUDE_jinjin"] || []) exclude.add(cleanBody(it.txt));

const seen = new Set();
const cleaned = [];
for (const [author, items] of Object.entries({ ...d1, ...d2 })) {
  if (author === "EXCLUDE_jinjin") continue;
  for (const it of items) {
    const body = cleanBody(it.txt);
    if (body.length < 6) continue;
    if (exclude.has(body)) continue;
    if (seen.has(body)) continue;
    seen.add(body);
    cleaned.push({ author, body, tags: extractTags(it.txt), href: it.href });
  }
}
fs.writeFileSync(base + "cleaned.json", JSON.stringify(cleaned, null, 1), "utf8");
console.log("cleaned count:", cleaned.length);
for (const c of cleaned) console.log("[" + c.author + "] " + c.body.slice(0, 55));