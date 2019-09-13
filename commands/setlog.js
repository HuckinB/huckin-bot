const Discord = require("discord.js");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'bot',
    password: 'IgRHhGezoOiw8Wd5',
    database: 'huckinb'
});

module.exports.run = async (bot, message, args) => {
    message.delete()
    if(!message.member.hasPermission('ADMINISTRATOR','MANAGE_GUILD')) return message.channel.send('Sorry, you cannot change server settings');

    connection.query('UPDATE `log_channel` SET `name` = ('+`'${message.mentions.channels.first().name}'`+ '), `id` = ('+`'${message.mentions.channels.first().id}'`+ ')', function (error, results, fields) {
        if(error) {
            throw error;
            message.reply("Error!");
            return;
    }
    message.channel.send(`Log Channel set to ${message.mentions.channels.first()}`).then(m => m.delete(5000));
})
}
module.exports.help = {
    name: "setlog",
    description: "Sets log channel",
    usage: "!setlog #channel",
    accessableby: "Admins",
    aliases: []
}
  