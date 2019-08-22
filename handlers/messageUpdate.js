const {bot} = require('../index');
const config = require("../config.json");

bot.on("messageUpdate", (oldMessage, newMessage) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'bot',
        password: 'IgRHhGezoOiw8Wd5',
        database: 'huckinb'
    });
    
    connection.query('SELECT * FROM server_log_channels WHERE serverid=' + newMessage.channel.guild.id, function (error, results, fields) {
		if(error) {
			throw error;
			newMessage.reply("error nub jagman");
			return;
		};
		var serverLogChannel;
        if (results === undefined || results.length == 0) return;
            serverLogChannel = JSON.stringify(results[0]["channelid"]);
	    serverLogChannel = serverLogChannel.replace('"','');
	    serverLogChannel = serverLogChannel.replace('"', '');
	if(newMessage.channel.guild.channels.get(serverLogChannel) === undefined) return;
		var logchannel = newMessage.channel.guild.channels.get(serverLogChannel);


    if(newMessage.author.bot === true) return;
   console.log(newMessage)
    let embed = new Discord.RichEmbed()
    .setAuthor(newMessage.author.tag, newMessage.author.displayAvatarURL)
    .setDescription('**Message edited by** ' + newMessage.author + ' **in** ' + newMessage.channel)
    .addField("Before", oldMessage)
    .addField('After', newMessage)
    .setColor('#03a5fc')
    .setTimestamp()
    .setFooter('Author: ' + newMessage.author.id + ' | Message ID: ' + newMessage.id)

    logchannel.send(embed)
});
});