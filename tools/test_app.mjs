import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "msedge" });
const ctx = await browser.newContext({
  userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: "zh-CN"
});
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", e => errors.push("pageerror: " + e.message));
page.on("console", m => { if (m.type() === "error") errors.push("console: " + m.text()); });
await page.goto("file:///C:/Users/\u674e\u4e00\u6602/Documents/Copywriting creat/index.html");
await page.waitForTimeout(1200);
await page.screenshot({ path: "C:\\Users\\\u674e\u4e00\u6602\\Documents\\Copywriting creat\\tools\\test1.png" });
// click random 3 times
for (let i = 0; i < 3; i++) { await page.tap("#randomBtn"); await page.waitForTimeout(300); }
// switch to sweet tab
await page.tap('.tab[data-key="sweet"]');
await page.waitForTimeout(500);
await page.screenshot({ path: "C:\\Users\\\u674e\u4e00\u6602\\Documents\\Copywriting creat\\tools\\test2.png" });
// fav current
await page.tap("#favBtn");
await page.waitForTimeout(400);
// go to fav tab
await page.tap('.tab[data-key="fav"]');
await page.waitForTimeout(500);
await page.screenshot({ path: "C:\\Users\\\u674e\u4e00\u6602\\Documents\\Copywriting creat\\tools\\test3.png" });
const state = await page.evaluate(() => ({
  text: document.getElementById("text").textContent.slice(0, 40),
  favs: localStorage.getItem("bwc_favs"),
  badge: document.getElementById("badge").textContent
}));
console.log(JSON.stringify({ state, errors }));
await browser.close();