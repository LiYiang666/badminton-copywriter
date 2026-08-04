import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "msedge" });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, locale: "zh-CN" });
const p = await ctx.newPage();
const errs = [];
p.on("pageerror", e => errs.push(e.message));
await p.goto("file:///C:/Users/\u674e\u4e00\u6602/Documents/Copywriting creat/index.html");
await p.waitForTimeout(700);
// build up history: draw 15 times
for (let i = 0; i < 15; i++) { await p.tap("#randomBtn"); await p.waitForTimeout(120); }
await p.tap('.tab[data-key="history"]');
await p.waitForTimeout(400);
const m = await p.evaluate(() => {
  const l = document.getElementById("list");
  return {
    overflowY: getComputedStyle(l).overflowY,
    scrollable: l.scrollHeight > l.clientHeight,
    bodyScrollable: document.documentElement.scrollHeight > window.innerHeight,
    rows: l.querySelectorAll(".list-item").length
  };
});
await p.screenshot({ path: "C:\\Users\\\u674e\u4e00\u6602\\Documents\\Copywriting creat\\tools\\v31_hist.png" });
console.log(JSON.stringify({ ...m, errs }));
await browser.close();