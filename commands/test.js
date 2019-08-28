const Discord = require("discord.js")
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'bot',
    password: 'IgRHhGezoOiw8Wd5',
    database: 'huckinb'
});

module.exports.run = async (bot, message, args) => {
    console.log("Working!");

    connection.query('INSERT INTO `config`(serverid) VALUES ('+`'${message.guild.id}'`+ ')', function (error, results, fields) {
})

    
}
module.exports.help = {
    name: "test",
    aliases: []
}
    