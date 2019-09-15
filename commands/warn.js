const Discord = require('discord.js');
const mysql = require("mysql");
const colours = require("../settings/colours.json")

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'bot',
    password: 'IgRHhGezoOiw8Wd5',
    database: 'huckinb'
});

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")
    else{
        message.delete();
        let target = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!target) return message.channel.send("Please provide a valid user").then(m => m.delete(15000));
        
        let reason = args.slice(1).join(" ").replace(/'/g, '');
        if(!reason) return message.channel.send(`Please provide a reason for warning **${target.user.tag}**`).then(m => m.delete(15000));

        connection.query('INSERT INTO warnings (user, admin, reason) VALUES ('+`'${target}','${message.author.username}','${reason}'`+ ')', function (error, results, fields) {
            if(error) {
                message.reply("Error!");
                throw error;
            }})

        connection.query('SELECT WarnID FROM `warnings` ORDER BY `warnings`.`WarnID` DESC', function (error, results, fields) {
            let data = JSON.stringify(results[0].WarnID).replace(/"/g, '');
            console.log(data);

            connection.query('SELECT COUNT(*) FROM `warnings` WHERE user = ' + mysql.escape(target), function (error, results, fields) {
                let results2 = JSON.stringify(results);
                console.log(results2);
            
            target.send({embed:{
                title: 'Warning Recieved',
                author: {
                    name: `${bot.user.username}`,
                },
                description: `You have been Warned for not following the server rules.\nTo contest your warning please speak to a member of Staff.`,
                fields: [
                    {
                        name: 'Warn ID:',
                        value: `${data}`
                    },
                    {
                        name: 'User:',
                        value: `${target.user}`
                    },
                    {
                        name: 'Warned By:',
                        value: `${message.author}`
                    },
                    {
                        name: 'Reason:',
                        value: `${reason}`
                    }
                ]
                }
            })
          })
    });
        let embed = new Discord.RichEmbed()
            .setColor(colours.redlight)
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
            .addField("Moderation:", "Warn")
            .addField("User:", target.user)
            .addField("Moderator:", message.author)
            .addField("Reason:", reason)
            .addField("Date:", message.createdAt.toLocaleString())
    
            let sChannel = message.guild.channels.find(c => c.name === "modlogs")
            sChannel.send(embed)
    }
}
module.exports.help = {
  name: "warn",
  description: "Warns a user",
  usage: "!warn <user> <reason>",
  accessableby: "Administration",
  aliases: ["warn"]
}
