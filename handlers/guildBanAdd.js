const {bot} = require('../index');
const config = require("../config.json");
const mysql = require("mysql");

bot.on("guildBanAdd", (guild, user) => {
    let logchannel = guild.channels.find(x => x.name === "logs")

    let embed = new Discord.RichEmbed()
    .setAuthor(user.tag, user.displayAvatarURL)
    .setColor('RED')
    .setTimestamp()
    .setThumbnail(user.displayAvatarURL)
    .setDescription(user + ' was banned')
    .setFooter("ID: " + user.id)
    .setTitle('**Member Banned**')

    logchannel.send(embed)
});