import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "msedge" });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, locale: "zh-CN" });
const p = await p0();
async function p0() { const pg = await ctx.newPage(); return pg; }
const errs = [];
p.on("pageerror", e => errs.push(e.message));
await p.goto("file:///C:/Users/\u674e\u4e00\u6602/Documents/Copywriting creat/index.html");
await p.waitForTimeout(700);
const t1 = await p.evaluate(() => document.getElementById("text").textContent);
// switch away and back -> same text
await p.tap('.tab[data-key="sweet"]'); await p.waitForTimeout(300);
await p.tap('.tab[data-key="all"]'); await p.waitForTimeout(300);
const t2 = await p.evaluate(() => document.getElementById("text").textContent);
// random -> different
await p.tap("#randomBtn"); await p.waitForTimeout(300);
const t3 = await p.evaluate(() => document.getElementById("text").textContent);
// fav two items
await p.tap("#favBtn"); await p.waitForTimeout(200);
await p.tap("#randomBtn"); await p.waitForTimeout(200);
await p.tap("#favBtn"); await p.waitForTimeout(200);
// history tab then back to all: list must hide
await p.tap('.tab[data-key="history"]'); await p.waitForTimeout(300);
const histRows = await p.evaluate(() => document.querySelectorAll(".list-item").length);
const footerHiddenInHist = await p.evaluate(() => document.getElementById("footerBar").hidden);
await p.tap('.tab[data-key="all"]'); await p.waitForTimeout(300);
const listHiddenInCard = await p.evaluate(() => document.getElementById("list").hidden);
// fav list
await p.tap('.tab[data-key="fav"]'); await p.waitForTimeout(300);
const favRows = await p.evaluate(() => document.querySelectorAll(".list-item").length);
await p.screenshot({ path: "C:\\Users\\\u674e\u4e00\u6602\\Documents\\Copywriting creat\\tools\\v3_fav.png" });
// unfavorite one
await p.tap(".list-item .hf"); await p.waitForTimeout(300);
const favRows2 = await p.evaluate(() => document.querySelectorAll(".list-item").length);
const overflow = await p.evaluate(() => getComputedStyle(document.getElementById("list")).overflowY);
console.log(JSON.stringify({ sameAfterSwitch: t1 === t2, changedAfterRandom: t2 !== t3, histRows, footerHiddenInHist, listHiddenInCard, favRows, favRows2, overflow, errs }));
await browser.close();