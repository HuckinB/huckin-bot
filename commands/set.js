const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    
    message.delete()
    if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")
        if(args[0] === "nick"){
        bot.user.setUsername(args[1])

        let nickembed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "Bot Nickname")
        .addField("Moderator:", message.author)
        .addField("New Name:", args[1])
        .addField("Date:", message.createdAt.toLocaleString())

        let sChannel = message.guild.channels.find(c => c.name === "modlogs")
        sChannel.send(nickembed)
} else if(args[0] === "activity"){
        bot.user.setActivity(args[1])
        let activityembed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "Bot Activity")
        .addField("Moderator:", message.author)
        .addField("New Name:", args[1])
        .addField("Date:", message.createdAt.toLocaleString())

        let sChannel = message.guild.channels.find(c => c.name === "modlogs")
        sChannel.send(activityembed)
} else if(args[0] === "state"){
    if(args[1] === "online"){
        bot.user.setStatus('online')
    }
    else if(args[1] === "idle"){
        bot.user.setStatus('idle')
    }
    else if(args[1] === "dnd"){
        bot.user.setStatus('dnd')
    }
    else if(args[1] === "offline"){
        bot.user.setStatus('offline')
    }
    let stateembed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "Bot State")
    .addField("Moderator:", message.author)
    .addField("New Name:", args[1])
    .addField("Date:", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.find(c => c.name === "modlogs")
    sChannel.send(stateembed)
}
}

module.exports.help = {
    name: "set",
    description: "Sets settings for Bot",
    usage: "!set <command>",
    accessableby: "Administration",
    aliases: ["set"]
  }