const {bot} = require('../index');
const mysql = require("mysql");
const Discord = require("discord.js");
const guild = bot.guilds.get('516952979321126912');

bot.on("messageDelete", (messageDelete) => {
    let logchannel = bot.channels.find(x => x.name === "logs");

    let embed = new Discord.RichEmbed()
        .setAuthor(messageDelete.author.tag, messageDelete.author.displayAvatarURL)
        .setDescription('Message sent by ' + messageDelete.author + ' deleted in ' + messageDelete.channel)
        .addField('Message Deleted:', messageDelete)
        .setColor("RED")
        .setTimestamp()
        .setFooter('Author: ' + messageDelete.author.id + ' | Message ID: ' + messageDelete.id)
    logchannel.send(embed)

});
