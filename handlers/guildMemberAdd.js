const {bot} = require('../index');
const config = require("../config.json");

bot.on("guildMemberAdd", member => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'bot',
        password: 'IgRHhGezoOiw8Wd5',
        database: 'huckinb'
    });
    
    
    connection.query('INSERT INTO members (username, userid, joindate, jointime) VALUES ('+`'${member.user.username}','${member.id}','${date}','${timesql}'`+')');
    connection.query('SELECT * FROM server_log_channels WHERE serverid=' + member.guild.id, function (error, results, fields) {
        if(error) {
            throw error;
            console.log("Error!");
            return;            
        }
    var serverLogChannel;
    if (results === undefined || results.length == 0) return;
            serverLogChannel = JSON.stringify(results[0]["channelid"]);
	    serverLogChannel = serverLogChannel.replace('"','');
	    serverLogChannel = serverLogChannel.replace('"', '');
	if(member.guild.channels.get(serverLogChannel) === undefined) return;
        var logchannel = member.guild.channels.get(serverLogChannel);
        
    let embed = new Discord.RichEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL)
        .setDescription(member + ' has joined the server')
        .setColor("GREEN")
        .setThumbnail(member.user.displayAvatarURL)
        .setTitle('**Member Joined**')
        .setTimestamp()
        .setFooter('ID: ' + member.id)
    
    if(!embed) return;
    
    logchannel.send(embed)
    });
    
    });