const {bot} = require('../index');
const config = require("../config.json");
const mysql = require("mysql");
const Discord = require("discord.js");

bot.on("roleCreate", (roleCreate) => {
    let logchannel = bot.channels.find(x => x.name === "logs")

    let embed = new Discord.RichEmbed()
        .setAuthor(roleCreate.guild.name, roleCreate.guild.iconURL)
        .setDescription('**New Role Created:**' + roleCreate)
        .setColor("GREEN")
        .setTimestamp()
        .setFooter("ID:" + roleCreate.id)

    logchannel.send(embed)
});
