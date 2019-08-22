const {bot} = require('../index');
const config = require("../config.json");
const mysql = require("mysql");

bot.on("roleCreate", (roleCreate) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'bot',
        password: 'IgRHhGezoOiw8Wd5',
        database: 'huckinb'
    });

    
    connection.query('SELECT * FROM server_log_channels WHERE serverid=' + roleCreate.guild.id, function (error, results, fields) {
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
	if(roleCreate.guild.channels.get(serverLogChannel) === undefined) return;
		var logchannel = roleCreate.guild.channels.get(serverLogChannel);

    let embed = new Discord.RichEmbed()
        .setAuthor(roleCreate.guild.name, roleCreate.guild.iconURL)
        .setDescription('**New Role Created:**' + roleCreate)
        .setColor("GREEN")
        .setTimestamp()
        .setFooter("ID:" + roleCreate.id)

    logchannel.send(embed)
});
});