const {bot} = require('../index');
const config = require("../config.json");
const mysql = require("mysql");

bot.on("guildMemberAdd", member => {
    let logchannel = bot.channels.find(x => x.name === "logs")
        
    let embed = new Discord.RichEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL)
        .setDescription(member + ' has joined the server')
        .setColor("GREEN")
        .setThumbnail(member.user.displayAvatarURL)
        .setTitle('**Member Joined**')
        .setTimestamp()
        .setFooter('ID: ' + member.id)
    
    if(!embed) return;
    
    logchannel.send(embed)
    });
    