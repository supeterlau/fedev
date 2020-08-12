const puppeteer = require('puppeteer');
const fse = require('fs-extra');

// 必须有分号
let proxy = '127.0.0.1:8001';

(async () => {
  console.log(proxy)
  const browser = await puppeteer.launch({
    headless: false,
    // args: [ `--proxy-server=${proxy}` ]
  });
  // Create a new incognito browser context.
  // const context = await browser.createIncognitoBrowserContext();
  // Create a new page in a pristine context.
  // const page = await context.newPage();

  const page = await browser.newPage();
  // await page.goto('https://www.producthunt.com/');
  // await page.goto('https://onezero.medium.com/heres-how-microsoft-s-new-tiktok-app-would-probably-work-83f5018eb395')
  await page.goto('https://zhuanlan.zhihu.com/p/142641594')
  // page.on('response', async res => {
  //   console.log(res.url())
  //   await fse.outputFile('./tmp', await res.buffer())
  // })
  function logRequest(interceptedRequest) {
    console.log('A request was made:', interceptedRequest.url());
  }
  page.on('request', logRequest);

  // await page.screenshot({
  //   fullPage: true,
  //   path: 'example.png'
  // });

  // await browser.close();

})().catch(console.error);