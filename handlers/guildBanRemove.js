const {bot} = require('../index');
const mysql = require("mysql");
const Discord = require("discord.js");

bot.on("guildBanRemove", (guild, user) => {
    let logchannel = guild.channels.find(x => x.name === "logs")

    let embed = new Discord.RichEmbed()
    .setAuthor(user.tag, user.displayAvatarURL)
    .setColor('GREEN')
    .setTimestamp()
    .setThumbnail(user.displayAvatarURL)
    .setDescription(user + ' was unbanned')
    .setFooter("ID: " + user.id)
    .setTitle('**Member Unbanned**')

    logchannel.send(embed)
});