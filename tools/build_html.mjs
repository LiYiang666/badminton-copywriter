// rebuild index.html from template + corpus
import fs from "node:fs";
const base = "C:\\Users\\\u674e\u4e00\u6602\\Documents\\Copywriting creat\\";
const tpl = fs.readFileSync(base + "tools\\template.html", "utf8");
const corpus = fs.readFileSync(base + "data\\corpus.json", "utf8").trim();
fs.writeFileSync(base + "index.html", tpl.replace("__CORPUS__", corpus), "utf8");
console.log("index.html rebuilt:", fs.statSync(base + "index.html").size, "bytes");