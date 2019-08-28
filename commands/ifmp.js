const Discord = require("discord.js")
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

        

    if(isNaN(args[0])) {
        message.delete().catch();
        message.reply("You have not entered a number please try again. `!ifmp [NUMBER]`").then((message => {
            message.delete(5000)
        }))
    } else if (!args[0])
        {  
        message.delete().catch();
        message.reply("You have not entered a number please try again. `!ifmp [NUMBER]`").then((message => {
            message.delete(5000)
        }))} else {

        let {body} = await superagent
        .get(`https://infinitetruckers.com/api/player/${args[0]}`).catch(console.error);
    
            
    let ifmpEmbed = new Discord.RichEmbed()
      .setDescription(`[https://infinitetruckers.com](https://infinitetruckers.com)`)
      .setColor("0x1c4675")
      .setTitle(`Infinite Truckers Profile`)
      .setThumbnail(body.data.avatar)
      .addField("Name:", body.data.name, true)
      .addField("Description:", body.data.description, true)
      .addField("Position:", body.data.role, true)
      .addField("IFMPID:", `[${body.data.id}](https://infinitetruckers.com/user/${body.data.id})`, true)
      .addField("Created At:", body.data.created_at)
        .addField("Points on License:", body.data.points)
        .addBlankField()
        .addField("Discord Name:", body.data.discord_nickname, true)
        .addField("Discord ID:", body.data.discord_id, true)
        .addField("Discord Link:", `[Click Here](https://discordapp.com/users/${body.data.discord_id})`, true)
      .addField("Steam Link:", `[Click Here](https://steamcommunity.com/profile/${body.data.steamid})`, true)
      .addField("Forum Profile:", `[Click Here](${body.data.forum_url})`, true)
      .setTimestamp()
      .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, `https://infinitetruckers.com/images/Icon%20Logo.png`)

    message.delete().catch();
    message.channel.send(ifmpEmbed);
    

}
}
module.exports.help = {
    name: "ifmp",
    description: "Shows IFMP data",
    usage: "!ifmp",
    accessableby: "Members",
    aliases: ["ifmp"]
  }