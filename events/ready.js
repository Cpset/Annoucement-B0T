const Discord = require("discord.js")
const { client, config } = require("../index.js")

client.on("ready", () => {

    console.log("|\n|    Advanced MassDM\n|   Made by Cp.set#9111\n|\n| Last Update: 23.02.2021\n|")

    client.user.setActivity(`Advanced Annoucement v${config.version}`, { type: "PLAYING" }).catch(console.error);

})
