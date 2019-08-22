const {bot} = require('../index');
const config = require("../config.json");
const mysql = require("mysql");

bot.on('guildMemberRemove', (member) => {
    let logchannel = guild.channels.find(x => x.name === "logs")
    let embed = new Discord.RichEmbed()
        .setAuthor(member.user.tag, member.displayAvatarURL)
        .setDescription(member + ' has left the server')
        .setColor("RED")
        .setThumbnail(member.displayAvatarURL)
        .setTitle('**Member Left**')
        .setTimestamp()
        .setFooter('ID: ' + member.id)


    logchannel.send(embed)
});