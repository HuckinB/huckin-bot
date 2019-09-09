const Discord = require("discord.js")
const mysql = require("mysql");
const moment = require('moment');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'bot',
    password: 'IgRHhGezoOiw8Wd5',
    database: 'huckinb'
});

module.exports.run = async (bot, message, args) => {
    const server = message.guild;
    const category = server.channels.find(c => c.name == "Tickets" && c.type == "category");
    const archive = server.channels.find(c => c.name == "Archive" && c.type == "category");
    const user = message.author;
    const tChannel = `${user.username}${user.discriminator}`
    const reason = args.slice(1).join(' ');

    message.delete();

    if(!args[0]) {
        message.channel.send({embed: {
        color: 10181046,
        author: {
            name: bot.user.username,
            icon_url: bot.user.avatarURL
        },
        title: `**Ticket System**`,
        description: `Here are the following commands to use our Custom Ticket System`,
        fields: [{
            name: "To create a ticket",
            value: "`!ticket create`"
        }]
        }})
    } else if(args[0] == "create") {

        connection.query('INSERT INTO tickets (guild, user, timestamp, reason, state) VALUES ('+`'${message.guild.name}','${message.author}','${moment.utc(message.createdAt).format('DD/MM/YYYY, HH:mm')}','${reason}','TRUE'`+ ')', function (error, results, fields) {
            if(error) {
                throw error;
                message.reply("Error!");
                return;
            }
        });
        connection.query('SELECT ticketID FROM `tickets` ORDER BY `tickets`.`ticketID` DESC', function (error, results, fields) {
            let data = JSON.stringify(results[0].ticketID);

            console.log(data);
            
  

        message.guild.createChannel(`Ticket-${data}`, {type: 'text'}).then(channel => {
            channel.setParent(category).then(channel => {channel.lockPermissions()});
            channel.setTopic(`${message.author.id} - ${moment.utc(message.createdAt).format('DD/MM/YYYY, HH:mm')} - ${reason}`);
            channel.overwritePermissions(message.author,{'READ_MESSAGES':true, 'SEND_MESSAGES':true})

            
            connection.query('SELECT ticketID FROM `tickets` ORDER BY `tickets`.`ticketID` DESC', function (error, results, fields) {
                let data = JSON.stringify(results[0].ticketID);
            let embed = new Discord.RichEmbed()
                .setTitle("New Ticket")
                .setDescription("Your Ticket has been made a member of Staff will reply as soon as they are available :)")
                .addField("TicketID:", data)
                .addField("Reason:", reason)
            channel.send(embed)
        });
            
            let uChannel = bot.channels.find(x => x.name === `ticket-${data}`)
            message.channel.send(`Your ticket has been succesfully created, please go to ${uChannel}`)
            })
        });

        
        
    }//End of Create
    // else if(args[0] == "archive") {
    //     let tID = reason;
    //     connection.query('SELECT * FROM tickets WHERE ticketID = ' + mysql.escape(tID), function (error, results, fields) {
    //         if(error) {
    //             throw error;
    //             message.reply("Error!");
    //             return;
    //         }
            
    //         let owner = JSON.stringify(results[0].user).replace(/"/g, '');
    //         if(message.author == owner){
    //             message.reply("Archiving Ticket").then(m => m.delete(15000));
    //             let cChannel = bot.channels.find(x => x.name === `ticket-${reason}`)
    //             cChannel.setParent(archive);
    //         }
    //         else if(message.member.roles.find(r => r.name === "Support")){
    //             message.reply("Archiving Ticket").then(m => m.delete(15000));
    //             let cChannel = bot.channels.find(x => x.name === `ticket-${reason}`)
    //             cChannel.setParent(archive);
    //         }
    //         else 
    //         message.reply("You are not the owner!").then(m => m.delete(15000));

            
            
    //     });
    
    // }//End of Archive
    else if(args[0] == "close"){
        let tID = reason;
        connection.query('SELECT * FROM tickets WHERE ticketID = ' + mysql.escape(tID), function (error, results, fields) {
            if(error) {
                throw error;
                message.reply("Error!");
                return;
            }
            
            let owner = JSON.stringify(results[0].user).replace(/"/g, '');
            if(message.author == owner || message.member.roles.find(r => r.name === "Support")){
                message.reply("Closing Ticket").then(m => m.delete(15000));
                let cChannel = bot.channels.find(x => x.name === `ticket-${reason}`)
                cChannel.setParent(archive);
                cChannel.overwritePermissions(message.author,{'READ_MESSAGES':false, 'SEND_MESSAGES':false})
            }
            else 
            message.reply("You are not the owner!").then(m => m.delete(15000));
 
        });
        var sSql = "UPDATE tickets SET state = 'FALSE' WHERE ticketID = " + mysql.escape(tID);
        connection.query(sSql);
    }//End of Close
    else if(args[0] == "add"){
        let tID = reason;
        connection.query('SELECT * FROM tickets WHERE ticketID = ' + mysql.escape(tID), function (error, results, fields) {
            if(error) {
                throw error;
                message.reply("Error!");
                return;
            }
            
            let owner = JSON.stringify(results[0].user).replace(/"/g, '');
            if(message.author == owner || message.member.roles.find(r => r.name === "Support")){
                let cChannel = bot.channels.find(x => x.name === `ticket-${reason}`)
                let nUser = message.mentions.members.first();
                cChannel.overwritePermissions(message.mentions.members,{'READ_MESSAGES':true, 'SEND_MESSAGES':true})
                cChannel.send(`Succesfully added ${nUser} to the ticket!`)
                console.log(nUser.id);
                

                
            }}

    )}
}
module.exports.help = {
    name: "ticket",
    description: "Ticket System",
    usage: "!ticket create/close/add/remove",
    accessableby: "Member",
    aliases: ["support"]
}
    