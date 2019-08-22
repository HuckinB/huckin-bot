const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor('RANDOM')
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)
    .addField("Created By", `<@228575716214702080>`);

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
