const Discord = require("discord.js")
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'bot',
    password: 'IgRHhGezoOiw8Wd5',
    database: 'huckinb'
});

module.exports.run = async (bot, message, args) => {
    connection.query('INSERT INTO reports (reporter, reportee, reason) VALUES ('+`'${message.author}','${message.mentions.members.first()}','${args[1]}'`+ ')', function (error, results, fields) {
        if(error) {
            throw error;
            message.reply("Error!");
            return;

        }
        });

    connection.query('SELECT id FROM `reports` ORDER BY `reports`.`ID` DESC', function (error, results, fields) {
        var data = JSON.stringify(results[0].id);
        message.channel.send(`Your report has been filed to the staff team. Thank you!\n Your Report ID is: ${data}`).then(m => m.delete(15000));
        console.log(results);
        
        if(error) {
            throw error;
            message.reply("Error!");
            return;
        }});

    message.delete()
    // mentioned or grabbed user
    let target = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!target) return message.channel.send("Please provide a valid user").then(m => m.delete(15000))

    // reasoning definition
    let reason = args.slice(1).join(" ")
    if(!reason) return message.channel.send(`Please provide a reason for reporting **${target.user.tag}**`).then(m => m.delete(15000))

    // grab reports channel
    let rChannel = message.guild.channels.find(x => x.name === "reports")
    if (!rChannel) return message.reply("Please ask a moderator to create a `reports` channel").then(m => m.delete(15000))

    // send to reports channel and add tick or cross

    // message.channel.send(`Your report has been filed to the staff team. Thank you!\n Your Report ID is: ${rows}`).then(m => m.delete(15000))
    rChannel.send(`**${message.author.tag}** has reported **${target.user.tag}** for **${reason}**.`).then(async msg => {
        await msg.react("✅")
        await msg.react("❌")
    })

}

module.exports.help = {
    name: "report",
    description: "reports a user of the guild",
    usage: "!report <user> <reason>",
    accessableby: "Members",
    aliases: []
}