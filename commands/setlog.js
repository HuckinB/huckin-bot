const Discord = require("discord.js");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'bot',
    password: 'IgRHhGezoOiw8Wd5',
    database: 'huckinb'
});

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR','MANAGE_GUILD')) return message.channel.send('Sorry, you cannot change server settings');
      connection.query('SELECT channelid FROM server_log_channels WHERE `serverid`=' + message.guild.id + ' LIMIT 1', function (error, results, fields) {
            if(error) {
                throw error;
                message.reply("Error!");
                return;
            };
          var serverPrefix;
        if (args[0] === undefined || message.mentions.channels.first() === undefined) {
              if (results === undefined || results.length == 0) {
                message.channel.send('Log channel is `#mod-log`.');
            } else if (results !== undefined || results.length !== 0) {
                var serverPrefix = JSON.stringify(results[0]["channelid"]);
                serverPrefix = serverPrefix.replace('"','');
                serverPrefix = serverPrefix.replace('"', '');
                message.channel.send('Log channel is <#' + serverPrefix + '>.');
            };
        } else if (results === undefined || results.length == 0 && args !== undefined) {
          connection.query('INSERT INTO server_log_channels (serverid, channelid) VALUES ('+`'${message.guild.id}','${message.mentions.channels.first().id}'`+ ')', function (error, results, fields) {
                if(error) {
                    throw error;
                    message.reply("Error!");
                    return;
                };
                  message.channel.send('Log channel has been changed to <#' + message.mentions.channels.first().id + '>.');
          
      });
            } else if (results.length !== 0 && args !== undefined) {
                connection.query('UPDATE server_log_channels SET channelid='+ `'${message.mentions.channels.first().id}'` +' WHERE serverid=' + message.guild.id, function (error, results, fields) {
                    if(error) {
                        throw error;
                        message.reply("Error!");
                        return;
                    };
                    message.channel.send('Log channel has been changed to <#' +  message.mentions.channels.first().id + '>.');
        });
        }
            });
        message.delete().catch();
    }

module.exports.help = {
    name: "setlog",
    description: "Sets log channel",
    usage: "!setlog #channel",
    accessableby: "Admins",
    aliases: []
}
  