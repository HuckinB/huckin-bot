const Discord = require('discord.js');
const moment = require('moment');
const mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'bot',
    password: 'IgRHhGezoOiw8Wd5',
    database: 'huckinb'
});

module.exports.run = async (bot, message, args) => {

      let user;

      if (message.mentions.users.first()) {
           user = message.mentions.users.first();
      } else {
           user = message.author;
       }

       const member = message.guild.member(user);
       connection.query(`SELECT JoinID FROM memberlog WHERE UserID = '${member.user.id}' ORDER BY JoinID DESC`, function (error, results, fields) {
        let data = JSON.stringify(results[0].JoinID);

       const embed = new Discord.RichEmbed()
          .setColor('RANDOM')
          .setThumbnail(user.avatarURL)
          .setTitle(`${user.username}#${user.discriminator}`)
          .addField('ID:', `${user.id}`, true)
          .addField('Nickname:', `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
          .addField('Created at:', `${moment.utc(user.createdAt).format('dddd, Do MMMM YYYY, HH:mm:ss')}`, true)
          .addField('Joined server:', `${moment.utc(member.joinedAt).format('dddd, Do MMMM YYYY, HH:mm:ss')}`, true)
          .addField('Join Position', `${data}`, true)
          .addField('Status:', `${user.presence.status}`, true)
          .addField('Game:', `${user.presence.game ? user.presence.game.name : 'None'}`, true)
          .addField('Roles:', member.roles.map(roles => `${roles.name}`).join(', '), true)
  message.channel.send({embed});
  message.delete().catch();
})}
module.exports.help = {
  name: "userinfo",
  description: "Displays info of a user",
  usage: "!userinfo <user>",
  accessableby: "Members",
  aliases: ["ui"]
}
