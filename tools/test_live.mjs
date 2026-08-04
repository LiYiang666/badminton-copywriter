import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "msedge" });
const ctx = await browser.newContext({
  userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: "zh-CN"
});
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", e => errors.push(e.message));
await page.goto("https://liyiang666.github.io/badminton-copywriter/", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(1000);
await page.tap("#randomBtn");
await page.waitForTimeout(400);
await page.screenshot({ path: "C:\\Users\\\u674e\u4e00\u6602\\Documents\\Copywriting creat\\tools\\live.png" });
console.log(JSON.stringify({ errors, text: await page.evaluate(() => document.getElementById("text").textContent.slice(0, 30)) }));
await browser.close();