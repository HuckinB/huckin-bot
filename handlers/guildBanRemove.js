const {bot} = require('../index');
const config = require("../config.json");
const mysql = require("mysql");

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