const Discord = require("discord.js")
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'bot',
    password: 'IgRHhGezoOiw8Wd5',
    database: 'huckinb'
});

module.exports.run = async (bot, message, args) => {
    connection.query('SELECT state FROM `settings`'), function (error, results, fields) {
        const ready = JSON.stringify(results[0].state).replace(/"/g, '');

        if(ready == 1){
            connection.query('UPDATE `settings` SET `state` = `0`')
        }else if(ready == 0){
            connection.query('UPDATE `settings` SET `state` = `1`')
        }





    }

}

module.exports.help = {
    name: "devmode",
    description: "Changes state of DevMode",
    usage: "!devmode",
    accessableby: "Staff",
    aliases: ["devmode"]
  }