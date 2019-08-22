const {bot} = require('../index');
const config = require("../config.json");
const mysql = require("mysql");

bot.on("guildBanRemove", (guild, user) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'bot',
        password: 'IgRHhGezoOiw8Wd5',
        database: 'huckinb'
    });
    
    
    connection.query('SELECT * FROM server_log_channels WHERE serverid=' + guild.id, function (error, results, fields) {
		if(error) {
			throw error;
			console.log("error nub jagman");
			return;
		};
		var serverLogChannel;
        if (results === undefined || results.length == 0) return;
            serverLogChannel = JSON.stringify(results[0]["channelid"]);
	    serverLogChannel = serverLogChannel.replace('"','');
	    serverLogChannel = serverLogChannel.replace('"', '');
	if(guild.channels.get(serverLogChannel) === undefined) return;
		var logchannel = guild.channels.get(serverLogChannel);

    let embed = new Discord.RichEmbed()
    .setAuthor(user.tag, user.displayAvatarURL)
    .setColor('GREEN')
    .setTimestamp()
    .setThumbnail(user.displayAvatarURL)
    .setDescription(user + ' was unbanned')
    .setFooter("ID: " + user.id)
    .setTitle('**Member Unbanned**')

    logchannel.send(embed)
});
});