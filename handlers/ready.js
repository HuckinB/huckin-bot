const {bot} = require('../index');
const config = require("../settings/config.json");

var today = new Date();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var timesql = today.getHours()+(today.getMinutes())+today.getSeconds();

bot.afk = new Map();
bot.on("ready", async () => {
    console.log(`<| Succesfully logged in as ${bot.user.username}#${bot.user.discriminator} at ${time} - ${date} |>`);
    bot.user.setActivity(`${bot.users.size} players!`, { type: 'WATCHING'})
    // ${bot.users.filter(member => !member.user.bot).size}
    


});