const puppeteer = require('puppeteer');
const qoa = require('qoa');
qoa.config({
    prefix: '>',
    underlineQuery: false // Do not underline queries
});
const getUrl = async () => {
    const input = await qoa.input({
        query: 'Type an url:',
        handle: 'url'
    });
    return input['url'];
};
(async () => {
    const url = await getUrl();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const aHandle = await page.evaluateHandle(() => document.getElementsByTagName('H2'));
    console.log(await aHandle);
    await browser.close();
})();
