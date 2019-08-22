const {bot} = require('../index');
const config = require("../config.json");

bot.on('guildMemberRemove', (member) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'bot',
        password: 'IgRHhGezoOiw8Wd5',
        database: 'huckinb'
    });
        
    connection.query('SELECT * FROM server_log_channels WHERE serverid=' + member.guild.id, function (error, results, fields) {
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
	if(member.guild.channels.get(serverLogChannel) === undefined) return;
		var logchannel = member.guild.channels.get(serverLogChannel);
    let embed = new Discord.RichEmbed()
        .setAuthor(member.user.tag, member.displayAvatarURL)
        .setDescription(member + ' has left the server')
        .setColor("RED")
        .setThumbnail(member.displayAvatarURL)
        .setTitle('**Member Left**')
        .setTimestamp()
        .setFooter('ID: ' + member.id)


    logchannel.send(embed)
});
});