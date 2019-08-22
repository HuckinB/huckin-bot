const {bot} = require('../index');
const config = require("../config.json");

bot.on("messageDelete", (messageDelete) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'bot',
        password: 'IgRHhGezoOiw8Wd5',
        database: 'huckinb'
    });
    
    connection.query('SELECT * FROM server_log_channels WHERE serverid=' + messageDelete.channel.guild.id, function (error, results, fields) {
		if(error) {
			throw error;
			message.reply("error nub jagman");
			return;
		};
		var serverLogChannel;
        if (results === undefined || results.length == 0) return;
            serverLogChannel = JSON.stringify(results[0]["channelid"]);
	    serverLogChannel = serverLogChannel.replace('"','');
	    serverLogChannel = serverLogChannel.replace('"', '');
	if(messageDelete.channel.guild.channels.get(serverLogChannel) === undefined) return;
		var logchannel = messageDelete.channel.guild.channels.get(serverLogChannel);
    let embed = new Discord.RichEmbed()
        .setAuthor(messageDelete.author.tag, messageDelete.author.displayAvatarURL)
        .setDescription('Message sent by ' + messageDelete.author + ' deleted in ' + messageDelete.channel)
        .addField('Message Deleted:', messageDelete)
        .setColor("RED")
        .setTimestamp()
        .setFooter('Author: ' + messageDelete.author.id + ' | Message ID: ' + messageDelete.id)
    logchannel.send(embed)
});
});