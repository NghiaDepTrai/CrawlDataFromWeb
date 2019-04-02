const puppeteer = require('puppeteer');
const fs = require('fs');
const downloader = require('image-downloader');

async function geturlImageFromPage(url) {
    const brower = await puppeteer.launch();
    const page = await brower.newPage();
    await page.goto(url);
    console.log('gone url');

    const articles =  await page.evaluate(() => {
        const imagess = Array.from(document.querySelectorAll('article img'));
        const articles = imagess.map(link => ({
            url : link.getAttribute('data-url'),
            image : link.getAttribute('src')
        }));
        return articles;
    });
    await brower.close();
}

async function main() {
    const urlFromThiendia = 'https://www.instagram.com/explore/tags/bikini/?hl=vi';
    const resultFolder = './resultFolder';
    if(!fs.existsSync(resultFolder)) {
        fs.mkdirSync(resultFolder);
    }

    const image_from_instagram = await geturlImageFromPage(urlFromThiendia);
    image_from_instagram.forEach((image,url) => {
        downloader({
            image :image,
            url : url,
            desk :resultFolder
        });
    });
}
main();