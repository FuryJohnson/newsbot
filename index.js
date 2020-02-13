const cloudscraper = require('cloudscraper');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

const $ = jQuery = require('jquery')(window);
const Telegraf = require('telegraf')
const fs = require('fs');
//---------------------------------------

//global vars
const token = fs.readFileSync('token', 'utf8').split("\n")[0];
const telegramId = fs.readFileSync('id', 'utf8');
//slow access
let newsStore =
{
    "https://www.esetnod32.ru/company/press/center/": "",
}

//bot -----------------
const bot = new Telegraf(token);

bot.start((ctx) => ctx.reply('Hello, My Friend We are ESET!!!!!!'))
bot.hears('hi', (ctx) => ctx.reply('Hello, my friend, We are ESET!!!!!!!!👍'))
bot.launch();

//main logic ----------------------
function extractNews(news, htmlPage) {
    const elements = $(htmlPage);
    const listOfNews = elements.find('tbody').html();
    if (listOfNews == undefined) {
        console.log("cant find news");
        return;
    }
    const lastNews = listOfNews.split('\n').filter(NewsStr => NewsStr.length > 5)[0];

    if (lastNews == undefined) {
        console.log("cant find last news");
        return;
    }
    const cleanText = lastNews.replace("</a>", " || ").replace(/<\/?[^>]+(>|$)/g, "");
    if (cleanText == undefined) {
        console.log("cant find cleanText");
        return;
    }
    const oldNews = newsStore[news];
    if (oldNews.length > 0 && oldNews != cleanText) {
        bot.telegram.sendMessage(telegramId, cleanText);
    }
    newsStore[news] = cleanText;
}


function poll() {
    for (let key in newsStore) {
        const extractNewsBinded = extractNews.bind(null, key);
        cloudscraper.get(key).then(extractNewsBinded, console.error);
    }
    setTimeout(poll, 15 * 60 * 1000);
}

poll();