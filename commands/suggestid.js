const Discord = require("discord.js")
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'bot',
    password: 'IgRHhGezoOiw8Wd5',
    database: 'huckinb'
});

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("You can not use this command!")
    
    connection.query(`SELECT * FROM suggestions WHERE id = ${args[0]}`, function (error, results, fields) {

        var rid = JSON.stringify(results[0].id);
        //  console.log(rid)
        var guild = JSON.stringify(results[0].servername).replace(/"/g, '');
        var channel = JSON.stringify(results[0].channelname).replace(/"/g, '');
        var suggester = JSON.stringify(results[0].suggester).replace(/"/g, '');
        var suggestion = JSON.stringify(results[0].suggestion).replace(/"/g, '');

        let embed = new Discord.RichEmbed()
            .setTitle(`Suggestion Information`)
            .setColor("RANDOM")
            .addField("Suggestion ID:", rid)
            .addField("Guild:", guild)
            .addField("Channel:", channel)
            .addField("Suggester:", suggester)
            .addField("Suggestion", suggestion)
            .setTimestamp()

        message.channel.send(embed);
        message.delete().catch();
        // console.log(rid);
        if(error) {
            throw error;
            message.reply("Error!");
            return;
            

        }
        });


}
module.exports.help = {
    name: "suggestid",
    description: "Gets data of a Suggestion",
    usage: "!suggest [id]",
    accessableby: "Staff",
    aliases: ["sid"]
}