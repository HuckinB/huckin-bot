const Discord = require("discord.js")
const botconfig = require("../settings/config.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    
    let currentMode = botconfig.ready;

  







    // if(!args[0]){ 
    //     message.channel.send(`Devmode is currently ${currentMode}`)
    // } else if(args[0] = "0"){
    //     fs.writeFile(config.json, ready, 0)
    // } else if(args[0] = "1"){
    //     fs.writeFile(botconfig, ready, 1)
    // }

}

module.exports.help = {
    name: "devmode",
    description: "Changes state of DevMode",
    usage: "!devmode",
    accessableby: "Staff",
    aliases: ["devmode"]
  }