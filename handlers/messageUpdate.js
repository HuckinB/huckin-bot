const {bot} = require('../index');
const config = require("../config.json");
const mysql = require("mysql");

bot.on("messageUpdate", (oldMessage, newMessage) => {
    let logchannel = bot.channels.find(x => x.name === "logs")
    let embed = new Discord.RichEmbed()
    .setAuthor(newMessage.author.tag, newMessage.author.displayAvatarURL)
    .setDescription('**Message edited by** ' + newMessage.author + ' **in** ' + newMessage.channel)
    .addField("Before", oldMessage)
    .addField('After', newMessage)
    .setColor('#03a5fc')
    .setTimestamp()
    .setFooter('Author: ' + newMessage.author.id + ' | Message ID: ' + newMessage.id)

    logchannel.send(embed)
});