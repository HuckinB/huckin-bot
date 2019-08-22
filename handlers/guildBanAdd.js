const {bot} = require('../index');
const config = require("../config.json");

bot.on("guildBanAdd", (guild, user) => {
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
    .setColor('RED')
    .setTimestamp()
    .setThumbnail(user.displayAvatarURL)
    .setDescription(user + ' was banned')
    .setFooter("ID: " + user.id)
    .setTitle('**Member Banned**')

    logchannel.send(embed)
});
});