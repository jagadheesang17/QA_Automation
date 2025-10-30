const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Arivazhagan/Downloads/EA-1.24.24.0.html', { waitUntil: 'networkidle' });
  await page.pdf({ path: 'report.pdf', format: 'A4' });
  await browser.close();
})();