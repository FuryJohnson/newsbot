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
const bot = new Telegraf ("token")

//slow access

//bot -----------------

function Url(ctx) {
  let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://meme-api.herokuapp.com/gimme");
  xhr.responseType = "json";

  xhr.send();
  xhr.onload = function() {
    ctx.reply(xhr.response.url);
  };
};

bot.start((ctx) => ctx.reply('Hello, My Friend'))
bot.hears('hi', (ctx) => ctx.reply('Hello, my friend, We are ESET!!!!!!!!👍'));
bot.hears('/memes', (ctx) => ctx.reply(Url(xrh.onload)));
bot.launch();
