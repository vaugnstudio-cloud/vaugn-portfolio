// Mekong only: step through the Order Type modal to the live menu for a
// stronger "ordering system" cover.
import { chromium } from "playwright";
import path from "node:path";

const out = path.resolve("public/images/mekong-cover.jpg");
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 800 },
  deviceScaleFactor: 2,
  ignoreHTTPSErrors: true,
});
const page = await ctx.newPage();

try {
  await page.goto("https://mekongmerchant.com.au/", {
    waitUntil: "load",
    timeout: 45000,
  });
} catch (e) {
  console.log("WARN goto", e.message);
}
await page.waitForTimeout(3500);

// Close the "Download the app" promo if present.
for (const t of ["Close", "No thanks", "Dismiss"]) {
  try {
    const el = page
      .getByRole("button", { name: new RegExp("^\\s*" + t + "\\s*$", "i") })
      .first();
    if (await el.isVisible({ timeout: 400 })) {
      await el.click({ timeout: 1000 });
      await page.waitForTimeout(600);
    }
  } catch {}
}

// Confirm the default order type (Pickup) to reveal the menu.
try {
  const confirm = page
    .getByRole("button", { name: /^\s*Confirm\s*$/i })
    .first();
  if (await confirm.isVisible({ timeout: 1500 })) {
    await confirm.click({ timeout: 2000 });
  }
} catch (e) {
  console.log("WARN confirm", e.message);
}
await page.waitForTimeout(4500);

// Close the promo again if it re-appears over the menu.
for (const t of ["Close", "No thanks", "Dismiss"]) {
  try {
    const el = page
      .getByRole("button", { name: new RegExp("^\\s*" + t + "\\s*$", "i") })
      .first();
    if (await el.isVisible({ timeout: 400 })) {
      await el.click({ timeout: 1000 });
      await page.waitForTimeout(600);
    }
  } catch {}
}
await page.waitForTimeout(800);

await page.screenshot({ path: out, type: "jpeg", quality: 88 });
console.log("OK mekong-cover.jpg");
await browser.close();
console.log("DONE");
