const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("You can not use this command!")
    
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 1 || deleteCount > 100)
      return message.reply("Please provide a number between 1 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    message.channel.send(`> Succesfully deleted ${deleteCount} messages!`).then(m => m.delete(5000));
}


module.exports.help = {
    name: "purge",
    description: "Deletes `x` messages",
    usage: "!purge",
    accessableby: "Staff",
    aliases: ["purge"]
}