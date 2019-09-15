const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor('RANDOM')
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)
    .addField("Created By", `<@228575716214702080>`)
    .addField("Total Guilds", bot.guilds.size)
    .addField("Total Members", bot.users.size)
    .addField("GitHub Repository", "https://github.com/huckinb/huckin-bot")

    message.channel.send(botembed);
    message.delete().catch();
}

module.exports.help = {
  name: "botinfo",
  description: "Shows information about the bot!",
  usage: "!botinfo",
  accessableby: "Members",
  aliases: ["bi", "botinfo"]
}
