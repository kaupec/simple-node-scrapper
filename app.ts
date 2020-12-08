const puppeteer = require('puppeteer');
const qoa = require('qoa');

qoa.config({
    prefix: '>',
    underlineQuery: false
})

const getUrl = async () => {
    const input = await qoa.input({
        query: 'Type an url:',
        handle: 'url'
    });

    return input['url'];
}

(async () => {
    const url = await getUrl()
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('article');
    const articles = await page.$$eval('article > .text > h2', titles => titles.map(title => title.innerText))
    console.log(await articles)
    await browser.close();
})();