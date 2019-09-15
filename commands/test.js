const Discord = require("discord.js")
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'bot',
    password: 'IgRHhGezoOiw8Wd5',
    database: 'huckinb'
});

module.exports.run = async (bot, message, args) => {
    // console.log("Working!");
    message.reply(`${message.member.voiceChannel.id}`)

}
module.exports.help = {
    name: "test",
    aliases: []
}
    