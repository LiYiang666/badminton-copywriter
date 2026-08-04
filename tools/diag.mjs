import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "msedge" });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, locale: "zh-CN" });
const p = await ctx.newPage();
await p.goto("file:///C:/Users/\u674e\u4e00\u6602/Documents/Copywriting creat/index.html");
await p.waitForTimeout(600);
await p.click('.tab[data-key="history"]');
await p.waitForTimeout(400);
const state = await p.evaluate(() => ({
  footerDisplay: getComputedStyle(document.getElementById("footerBar")).display,
  cardHidden: document.getElementById("card").hidden,
  histDisplay: getComputedStyle(document.getElementById("histList")).display,
  histOverflow: getComputedStyle(document.getElementById("histList")).overflowY
}));
console.log(JSON.stringify(state));
await browser.close();