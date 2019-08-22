const Discord = require("discord.js")
const botconfig = require("../settings/config.json");
const colours = require("../settings/colours.json")
const prefix = botconfig.prefix


module.exports.run = async (bot, message, args) => {

    if(args[0] == "help") return message.channel.send(`Just do ${prefix}help instead.`)

    if(args[0]) {
        let command = args[0];
        if(bot.commands.has(command)) {
            command = bot.commands.get(command);
            var SHembed = new Discord.RichEmbed()
            .setColor(colours.cyan)
            .setAuthor(`Huckin-Bot HELP`, message.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL)
            .setDescription(`The bot prefix is: ${prefix}\n\n**Command:** ${command.help.name}\n**Description:** ${command.help.description || "No Description"}\n**Usage:** ${command.help.usage || "No Usage"}\n**Accessable by:** ${command.help.accessableby || "Members"}\n**Aliases:** ${command.help.noalias || command.help.aliases}`)
            message.channel.send(SHembed);
        }}

    if(!args[0]) {
        message.delete();
        let embed = new Discord.RichEmbed()
        .setAuthor(`Help Command!`, message.guild.iconURL)
        .setColor(colours.redlight)
        .setDescription(`${message.author.username} check your dms!`)

        let Sembed = new Discord.RichEmbed()
        .setColor(colours.cyan)
        .setAuthor(`Huckin-Bot Help`, message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`These are the avaliable commands for the ${bot.user.username}!\nThe bot prefix is: ${prefix}`)
        .addField(`Commands:`, "``botinfo`` ``help`` ``report`` ``serverinfo`` ``steam`` ``suggest`` ``uptime`` ``userinfo``")
        .setFooter("Huckin-Bot", bot.user.displayAvatarURL)
        message.channel.send(embed).then(m => m.delete(10000));
        message.author.send(Sembed)
    }
    message.delete().catch();
}


module.exports.help = {
    name: "help",
    aliases: ["h", "halp", "commands"],
    usage: "!usage",
    description: "",
    accessableby: "Members"
}