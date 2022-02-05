const Discord = require("discord.js");
const vortex = require("./vortex.json");
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
    ],
    presence: {
        activities: [{
            name: vortex.panels.bio,
            type: "STREAMING",
            url: "https://twitch.tv/seavortex"
        }],
        status: vortex.panels.status,
    }
    
});
const fs = require("fs");
const mongoose = require("mongoose");

const moment = require("moment");
require("moment-duration-format");
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
const commander = fs.readdirSync('./commands').filter(files => files.endsWith('.js'));
for (const files of commander) {
    const command = require(`./commands/${files}`);
    client.commands.set(command.name, command);
    const date = new Date()
    console.log("[" + moment(date).format("DD/MM/YYYY HH:mm") + "]: Command named " + command.name + " is loaded")
}
const requestEvent = (event) => require(`./events/${event}`)
client.on('messageCreate', (messageCreate) => requestEvent('message')(messageCreate, client));
client.on('guildMemberAdd', (guildMemberAdd) => requestEvent('guildMemberAdd')(guildMemberAdd, client));
client.on("ready", async () => {
    client.user.setPresence({ activities: [{ name: vortex.panels.bio, status: vortex.panels.status}] });

})
mongoose.connect(vortex.panels.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log(`MongoDB connected!`))
  .catch((err) => console.error(`Failed to connect to MongoDB! \nError: ${err}`));
  client.login(vortex.panels.token).then(c => console.log(`Logged in as ${client.user.tag}!`)).catch(err => console.error(`Failed to login to the bot!`));
 