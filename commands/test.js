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


    connection.query('SELECT state FROM `settings`', function (error, results, fields) {
        let data = JSON.stringify(results[0].state);

        if(data == 1){
            connection.query('UPDATE `settings` SET `state` = 0')
        }else if(data == 0){
            connection.query('UPDATE `settings` SET `state` = 1')
        }



    }
    )}

module.exports.help = {
    name: "test",
    aliases: []
}
    