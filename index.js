const $ = jQuery = require('jquery')(window);
const Telegraf = require('telegraf')
const fs = require('fs');
//---------------------------------------

//global vars
const bot = new Telegraf ("token")

//slow access

//bot -----------------

bot.start((ctx) => ctx.reply('Hello, My Friend'))
bot.hears('hi', (ctx) => ctx.reply('Hello, my friend, We are ESET!!!!!!!!👍'));
bot.hears('/memes', function(ctx) {
let xhr = new XMLHttpRequest();

xhr.open("GET", "https://meme-api.herokuapp.com/gimme");

xhr.responseType = "json";

xhr.send();

xhr.onload = function() {
  let responseObj = xhr.response;
  let myUrl = responseObj.url;
  ctx.reply(myUrl);
};
});
bot.launch();
