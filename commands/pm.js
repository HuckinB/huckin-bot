const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("You can not use this command!")
    
    message.delete();

    let user = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if(!user) return message.channel.send("Please provide a user to send a message too.")

    let contents = args.join(" ");
    if(!contents) return message.channel.send("You did not provide a message to send.")

    user.send(contents);
    let logembed = new Discord.RichEmbed()
            .setColor(colours.greenlight)
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
            .addField("Moderation:", "Message Sent")
            .addField("User:", user.user)
            .addField("Moderator:", message.author)
            .addField("Reason:", contents)
            .addField("Date:", message.createdAt.toLocaleString())
    
            let sChannel = message.guild.channels.find(c => c.name === "modlogs")
            sChannel.send(logembed)

}


module.exports.help = {
    name: "pm",
    description: "Private message a user",
    usage: "!pm <user> <message>",
    accessableby: "Staff",
    aliases: ["pm"]
}