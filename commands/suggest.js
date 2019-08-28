const Discord = require("discord.js")
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'bot',
    password: 'IgRHhGezoOiw8Wd5',
    database: 'huckinb'
});

module.exports.run = async (bot, message, args) => {

    message.delete()

    let suggestion = args.slice(0).join(" ")
    if(!suggestion) return message.channel.send(`You did not give a suggestion **${message.author}**`).then(m => m.delete(15000));

    let sChannel = message.guild.channels.find(x => x.name === "suggestions");
    if (!sChannel) return message.reply("Please ask a moderator to create a `suggestions` channel").then(m => m.delete(15000));

    connection.query('INSERT INTO suggestions (servername, channelname, suggester, suggestion) VALUES ('+`'${message.guild.name}','${message.channel.name}','${message.author}','${suggestion}'`+ ')', function (error, results, fields) {
        if(error) {
            throw error;
            message.reply("Error!");
            return;

        }
        });

        connection.query('SELECT id FROM `suggestions` ORDER BY `suggestions`.`ID` DESC', function (error, results, fields) {
            let data = JSON.stringify(results[0].id);
            message.channel.send(`Thank you for your suggestion!\n Your Suggestion ID is: ${data}`).then(m => m.delete(15000));

    let embed = new Discord.RichEmbed()
        .setTitle(`**New Suggestion!**`)
        .setColor("RANDOM")
        .addField("Suggestion ID:", data)
        .addField("Suggester:", message.author)
        .addField("Suggested in:", message.channel)
        .addField("Suggestion:", suggestion)

        sChannel.send(embed).then(async msg => {
          await msg.react("✅")
          await msg.react("❌")
        });

})}

module.exports.help = {
    name: "suggest",
    description: "Makes a suggestion",
    usage: "!suggest <suggestion>",
    accessableby: "Members",
    aliases: ["suggestion"]
}