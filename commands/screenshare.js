module.exports.run = async (bot, message, args) => {
    
        message.delete();
        message.channel.send(`Here is your link to ScreenShare\nhttps://discordapp.com/channels/${message.guild.id}/${message.member.voiceChannel.id}`)
}

module.exports.help = {
    name: "screenshare",
    description: "Screenshare Link for VC",
    usage: "!screenshare",
    accessableby: "Members",
    aliases: ["ss"]
  }