const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    console.log("Working!");

    message.author.send("Hey!")
}
module.exports.help = {
    name: "test",
    aliases: []
}
    