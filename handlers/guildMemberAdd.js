const {bot} = require('../index');
const moment = require("moment");
const mysql = require("mysql");
const Discord = require("discord.js");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'bot',
    password: 'IgRHhGezoOiw8Wd5',
    database: 'huckinb'
});

bot.on("guildMemberAdd", member => {
    connection.query('INSERT INTO memberlog (Username, Discriminator, UserID, timestamp) VALUES ('+`'${member.user.username}','${member.user.discriminator}','${member.user.id}','${moment.utc(member.joinedAt).format('DD/MM/YYYY, HH:mm')}'`+ ')', function (error, results, fields) {
        if(error) {
            throw error;
            message.reply("Error!");
            return;
    
        }})
    

    let logchannel = bot.channels.find(x => x.name === "logs")
    let welcomechannel = bot.channels.find(x => x.name === "welcome-log")
        
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
    welcomechannel.send(embed)
    });

