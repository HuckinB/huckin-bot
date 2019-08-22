const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();
const fs = require("fs");
const mysql = require("mysql");
const tokenfile = require("./token.json");

// SQL Connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'bot',
    password: 'IgRHhGezoOiw8Wd5',
    database: 'huckinb'
});
// End of SQL Connection

const prefix = ">";
// Directory Reading
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        client.commands.set(props.help.name, props);
    });
})
// End of Directory Reading

// Start of Code
var today = new Date();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var timesql = today.getHours()+(today.getMinutes())+today.getSeconds();

client.on("ready", async () => {
    const log_channel = client.guilds.get("516952979321126912").channels.get("613935640274272288");

    console.log(`<| Succesfully logged in as ${client.user.username}#${client.user.discriminator} at ${time} - ${date} |>`);
    client.user.setActivity('me get built!', { type: 'WATCHING'})
    log_channel.send(` <| Succesfully logged in as ${client.user.username}#${client.user.discriminator} at ${time} - ${date} |>`);

});

client.on("message", async message => {
    if(message.author.bot) return;
    // if(message.channel.type === "dm") {
    //     let embed = new Discord.RichEmbed()
    //         .setTitle("New Message")
    //         .setColor("RANDOM")
    //         .addField("Sent by:", message.author)
    //         .addField("Message:", message.content)
    //         .setTimestamp
            
    //         client.guilds.get(516952979321126912).channels.get(613935640274272288).send(embed);
            
    let prefix = ">";
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;
    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(client,message,args);
})

client.on("guildMemberAdd", member => {
    connection.query('INSERT INTO members (username, userid, joindate, jointime) VALUES ('+`'${member.user.username}','${member.id}','${date}','${timesql}'`+')')
});

client.login(tokenfile.token)