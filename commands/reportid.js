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
    
    connection.query(`SELECT * FROM reports WHERE id = ${args[0]}`, function (error, results, fields) {
        // console.log(results)
        var rid = JSON.stringify(results[0].id);
        var guild = JSON.stringify(results[0].servername).replace(/"/g, '');
        var channel = JSON.stringify(results[0].channelname).replace(/"/g, '');
        var reporter = JSON.stringify(results[0].reporter).replace(/"/g, '');
        var reportee = JSON.stringify(results[0].reportee).replace(/"/g, '');
        var reason = JSON.stringify(results[0].reason).replace(/"/g, '');

        let embed = new Discord.RichEmbed()
            .setTitle(`Report Information`)
            .addField("Report ID:", rid)
            .addField("Guild:", guild)
            .addField("Channel:", channel)
            .addField("Reporter:", reporter)
            .addField("Reportee:", reportee)
            .addField("Reason", reason)
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
    name: "reportid",
    description: "Gets data on Report",
    usage: "!reportid [id]",
    accessableby: "Staff",
    aliases: ["rid"]
}