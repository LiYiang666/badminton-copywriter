// scrape badminton blogger profiles for captions
import { chromium } from "playwright";
import fs from "node:fs";

const PROFILES = [
  { name: "xiaoai", uid: "MS4wLjABAAAA848h01hlp01FYL9rJoXaHNJGKc8adf2upuIzOHFVCGg" },
  { name: "yeye", uid: "MS4wLjABAAAAGPYgnkeQTyJOux0N3Yon06NLhfFEsb7tXwiahKlRxWw" },
  { name: "baqianmeimei", uid: "MS4wLjABAAAA8aIKiDiX-UP8Q4VyKAxPPCUYGAprQtQQh_FQsKTs-Io" },
  { name: "shiyifei", uid: "MS4wLjABAAAAquDHahjPeFUUj9UO5tpt07yLbXb0LgHlvJajelBGB8E" },
  { name: "yuqiuxiaolaodao", uid: "MS4wLjABAAAAmwQKggng_DBHmGIflsnuWQo4Q_DKwI2mq1YV3gsQKHc" },
  { name: "zhoumei", uid: "MS4wLjABAAAAot2l3mdsHQkESDjONbd3h-jpAEbgvDJ3mZzu6KPToYt4OGInHrl6isjAoUuH9aya" },
  { name: "taiguomeiru", uid: "MS4wLjABAAAA6rUySsacGKTIp9T0FcQU6N2koIykbOEQMbdZYGRwyLxlu75X-EnKeq2XF9f6UnDL" },
  { name: "jinxiaopang", uid: "MS4wLjABAAAAG5WIBWnPeIieMRzk9R99_xGttJbrLtbS0Mq264nba5A" },
  { name: "wangxiaoyu", uid: "MS4wLjABAAAAS4n5ttUHnq98c45AQFTuQtxckO1JSgaYhYdd8qfphdE" }
];

const KEY = /羽毛球|打球|球服|球馆|球拍|球搭|后场|杀球|摇|变装|甜/;

const browser = await chromium.launch({ headless: true, channel: "msedge", args: ["--disable-blink-features=AutomationControlled"] });
const ctx = await browser.newContext({
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  viewport: { width: 1280, height: 900 },
  locale: "zh-CN"
});

const result = {};
for (const p of PROFILES) {
  const page = await ctx.newPage();
  const seen = new Map();
  try {
    await page.goto("https://www.douyin.com/user/" + p.uid, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(5000);
    await page.keyboard.press("Escape");
    const collect = async () => {
      const items = await page.evaluate(() => {
        const out = [];
        document.querySelectorAll('a[href*="/video/"]').forEach(a => {
          const txt = (a.innerText || "").replace(/\s+/g, " ").trim();
          if (txt) out.push({ href: a.href.split("?")[0], txt });
        });
        return out;
      });
      for (const it of items) {
        if (KEY.test(it.txt) && !seen.has(it.href)) seen.set(it.href, it.txt);
      }
    };
    await collect();
    for (let i = 0; i < 30; i++) {
      await page.mouse.wheel(0, 2200);
      await page.waitForTimeout(1100);
      await collect();
    }
  } catch (e) {
    console.log("ERR", p.name, e.message);
  }
  result[p.name] = [...seen.entries()].map(([href, txt]) => ({ href, txt }));
  console.log(p.name, "=>", result[p.name].length);
  await page.close();
}
await browser.close();
fs.writeFileSync(process.argv[2], JSON.stringify(result, null, 1), "utf8");
console.log("saved", process.argv[2]);
