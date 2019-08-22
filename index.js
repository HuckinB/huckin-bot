const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const mysql = require("mysql");
const tokenfile = require("./settings/token.json");
require("./functions")(bot);

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.afk = new Map();

// SQL Connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'bot',
    password: 'IgRHhGezoOiw8Wd5',
    database: 'huckinb'
});
// End of SQL Connection


module.exports = {
    bot: bot
};

bot.login(tokenfile.token)