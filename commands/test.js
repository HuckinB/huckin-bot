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
    message.guild.createChannel("Test", {type: 'text'}).then(c => c.lockPermissions())
        
        
    }
    



module.exports.help = {
    name: "test",
    aliases: []
}
    