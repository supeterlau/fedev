const scrape = require('website-scraper');
const PuppeteerPlugin = require('website-scraper-puppeteer');

const target = () => {
  let d = new Date()
  return `${d.getFullYear()}${d.getMonth()+1}${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}`
};

// 必须有分号
let proxy = '127.0.0.1:8001';

(async () => {
  const options = {
    // urls: ['https://medium.com/@fs0c131y/tiktok-logs-logs-logs-e93e8162647a'],
    urls: ['https://www.producthunt.com/newest'],
    directory: `./tmp/${target()}`,
    plugins: [ 
      new PuppeteerPlugin({
        // launchOptions: { headless: false }, /* optional */
        launchOptions: {
          headless: false,
          args: [ `--proxy-server=${proxy}` ]
        },
        scrollToBottom: { timeout: 10000, viewportN: 10 }, /* optional */
        blockNavigation: true, /* optional */
      })
    ]
  };
   
  // with async/await
  const result = await scrape(options);
})();