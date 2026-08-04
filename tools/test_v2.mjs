import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "msedge" });
// mobile test
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, locale: "zh-CN" });
const m = await mctx.newPage();
const errs = [];
m.on("pageerror", e => errs.push(e.message));
await m.goto("file:///C:/Users/\u674e\u4e00\u6602/Documents/Copywriting creat/index.html");
await m.waitForTimeout(800);
for (let i = 0; i < 3; i++) { await m.tap("#randomBtn"); await m.waitForTimeout(200); }
await m.tap('.tab[data-key="history"]');
await m.waitForTimeout(400);
const histCount = await m.evaluate(() => document.querySelectorAll(".hist-item").length);
await m.screenshot({ path: "C:\\Users\\\u674e\u4e00\u6602\\Documents\\Copywriting creat\\tools\\v2_hist.png" });
// fav cycle toast test
await m.tap('.tab[data-key="all"]');
await m.waitForTimeout(300);
await m.tap("#favBtn"); // fav current
await m.waitForTimeout(200);
await m.tap("#randomBtn");
await m.waitForTimeout(200);
await m.tap("#favBtn"); // fav second
await m.waitForTimeout(200);
await m.tap('.tab[data-key="fav"]');
await m.waitForTimeout(300);
await m.tap("#randomBtn");
await m.waitForTimeout(400);
const toastTxt = await m.evaluate(() => document.getElementById("toast").textContent);
console.log(JSON.stringify({ histCount, toastTxt, errs }));
await mctx.close();
// desktop test
const dctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, locale: "zh-CN" });
const d = await dctx.newPage();
await d.goto("file:///C:/Users/\u674e\u4e00\u6602/Documents/Copywriting creat/index.html");
await d.waitForTimeout(800);
const tabsVisible = await d.evaluate(() => [...document.querySelectorAll(".tab")].every(t => t.offsetParent !== null));
await d.screenshot({ path: "C:\\Users\\\u674e\u4e00\u6602\\Documents\\Copywriting creat\\tools\\v2_desktop.png" });
console.log(JSON.stringify({ tabsVisible }));
await browser.close();