const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    message.delete()

    // reasoning definition
    let reason = args.slice(1).join(" ")
    if(!reason) return message.channel.send(`Please provide a suggestion **${target.user.tag}**`).then(m => m.delete(15000))

    // grab reports channel
    let sChannel = message.guild.channels.find(x => x.name === "suggestions")
    if (!sChannel) return message.reply("Please ask a moderator to create a `suggestions` channel").then(m => m.delete(15000))
    

    // send to reports channel and add tick or cross

    message.channel.send("Your suggestion has sent the staff team. Thank you!").then(m => m.delete(15000))
    let sEmbed = new Discord.RichEmbed()
        .setTitle(`**New Suggestion**`)
        .setThumbnail(message.author.avatarURL)
        .setColor(colours.orange)
        .addField("Suggested By:", message.author.username)
        .addField("Suggestion:", reason)
        .setTimestamp()
        .setFooter(`ID: ${message.author.id}`)
        sChannel.send(sEmbed)

}

module.exports.help = {
    name: "suggest",
    description: "Makes a suggestion",
    usage: "!suggest <suggestion>",
    accessableby: "Members",
    aliases: []
}