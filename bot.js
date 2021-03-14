const Discord = require("discord.js");
const _client = new Discord.Client({ fetchAllMembers: true });
const client = global.client = _client
const config = require("./config.json");
const db = require('quick.db');
const fs = require("fs");
const monent = reqiure('monent');
require('monent-duration-format');
const prefix = config.Prefix;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdirSync("./commands").filter(file => file.endsWith(".js")).forEach(file => {
    let command = require(`./commands/${file}`);
    client.commands.set(command.conf.command, command);
    console.log(`[Command] ${file.replace(".js", "")} command loaded.`);
    command.conf.aliases.forEach(aliases => {
    client.aliases.set(aliases, command)  
  })
});

fs.readdirSync("./events").filter(file => file.endsWith(".js")).forEach(file => {
    let event = require(`./events/${file}`);
    client.on(event.conf.event, event.execute);
    console.log(`[Event] ${file.replace(".js", "")} event loaded.`);
});
  
client.sayilariCevir = function(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

client.login(config.Token).then(c => console.log(`Logged in as ${client.user.tag}!`)).catch(err => console.error(`Failed to login to the bot!`));

// HOŞGELDİN MESAJI VE TAG ALANA ROLVERME SİZE AHİTDİR İYİ KODLAR DİLERİM //
