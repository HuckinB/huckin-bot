const {bot} = require('../index');
const config = require("../config.json");

bot.on("error", (error) => {
    
	console.error(error);
});