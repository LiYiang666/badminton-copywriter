import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "msedge" });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, locale: "zh-CN" });
const page = await ctx.newPage();
await page.goto("file:///C:/Users/\u674e\u4e00\u6602/Documents/Copywriting creat/index.html");
await page.waitForTimeout(800);
await page.click('.tab[data-key="sweet"]');
await page.waitForTimeout(300);
const texts = [];
for (let i = 0; i < 32; i++) {
  await page.click("#randomBtn");
  texts.push(await page.evaluate(() => document.getElementById("text").textContent));
}
const uniq = new Set(texts);
console.log(JSON.stringify({ draws: texts.length, unique: uniq.size }));
// also test all category 60 draws
await page.click('.tab[data-key="all"]');
await page.waitForTimeout(300);
const all = [];
for (let i = 0; i < 154; i++) {
  await page.click("#randomBtn");
  all.push(await page.evaluate(() => document.getElementById("text").textContent));
}
console.log(JSON.stringify({ allDraws: all.length, allUnique: new Set(all).size }));
await browser.close();