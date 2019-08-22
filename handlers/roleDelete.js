const {bot} = require('../index');
const config = require("../config.json");
const mysql = require("mysql");
const Discord = require("discord.js");

bot.on("roleDelete", (roleDelete) => {
    let logchannel = bot.channels.find(x => x.name === "logs")

    let embed = new Discord.RichEmbed()
        .setAuthor(roleDelete.guild.name, roleDelete.guild.iconURL)
        .setDescription('**Role Deleted:**' + roleDelete)
        .setColor("RED")
        .setTimestamp()
        .setFooter("ID:" + roleDelete.id)

    logchannel.send(embed)
});
