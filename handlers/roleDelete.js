const {bot} = require('../index');
const config = require("../config.json");

bot.on("roleDelete", (roleDelete) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'bot',
        password: 'IgRHhGezoOiw8Wd5',
        database: 'huckinb'
    });
    
    connection.query('SELECT * FROM server_log_channels WHERE serverid=' + roleDelete.guild.id, function (error, results, fields) {
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
	if(roleDelete.guild.channels.get(serverLogChannel) === undefined) return;
		var logchannel = roleDelete.guild.channels.get(serverLogChannel);

    let embed = new Discord.RichEmbed()
        .setAuthor(roleDelete.guild.name, roleDelete.guild.iconURL)
        .setDescription('**Role Deleted:**' + roleDelete)
        .setColor("RED")
        .setTimestamp()
        .setFooter("ID:" + roleDelete.id)

    logchannel.send(embed)
});
});