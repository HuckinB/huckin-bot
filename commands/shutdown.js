const Discord = require("discord.js")
const botconfig = require("../settings/config.json");


module.exports.run = async (bot, message, args) => {

    if(message.author.id != "228575716214702080") return message.channel.send("You're the bot the owner!")

    try {
        await message.channel.send("Bot is shutting down...")
        process.exit()
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)
    }
    message.delete().catch();
    
}

module.exports.help = {
    name: "shutdown",
    description: "Shutsdown bot",
    usage: "!shutdown",
    accessableby: "Owner",
    aliases: []
}