import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "msedge" });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, locale: "zh-CN" });
const p = await ctx.newPage();
const errs = [];
p.on("pageerror", e => errs.push(e.message));
await p.goto("file:///C:/Users/\u674e\u4e00\u6602/Documents/Copywriting creat/index.html");
await p.waitForTimeout(700);
const info = await p.evaluate(() => ({
  title: document.querySelector("h1").textContent,
  tabsVisible: [...document.querySelectorAll(".tab")].every(t => t.offsetParent !== null),
  tabsScrollable: document.getElementById("tabs").scrollWidth > document.getElementById("tabs").clientWidth
}));
await p.screenshot({ path: "C:\\Users\\\u674e\u4e00\u6602\\Documents\\Copywriting creat\\tools\\v4_mobile.png" });
console.log(JSON.stringify({ ...info, errs }));
await browser.close();