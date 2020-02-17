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
const bot = new Telegraf ("token")
//slow access
let xhr = new XMLHttpRequest();

xhr.open("GET", "https://meme-api.herokuapp.com/gimme");

xhr.responseType = "json";

xhr.send();

xhr.onload = function() {
  let responseObj = xhr.response;

//bot -----------------
const bot = new Telegraf(token);

bot.start((ctx) => ctx.reply('Hello, My Friend We are ESET!!!!!!'))
bot.hears('hi', (ctx) => ctx.reply('Hello, my friend, We are ESET!!!!!!!!👍')),
bot.hears('/memes', (ctx) => { ctx.reply(responseObj.url); })
bot.launch();
};