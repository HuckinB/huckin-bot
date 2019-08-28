const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("You can not use this command!")
    
    message.delete().catch();
    
    




}
module.exports.help = {
    name: "createevent",
    description: "Creates an event",
    usage: "!createevent",
    accessableby: "Members",
    aliases: ["createevent", "eventcreate"]
}