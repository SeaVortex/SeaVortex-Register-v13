const Discord = require('discord.js');
const vortex = require("../vortex.json");

/**@param {Discord.Client} client
 * @param {Discord.messageCreate} messageCreate
 */

module.exports = async (message, client) => {

let prefix = vortex.panels.prefix;
if (!message.content.startsWith(prefix) || message.author.bot) return;
const cooldowns = client.cooldowns
const args = message.content.slice(prefix.length).split(/ +/);
const commandName = args.shift().toLowerCase();
const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
if (!command) return;
if (command.guildOnly && message.channel.type !== 'GUILD_TEXT') {
    return message.reply({ content: "This command is not valid for private messages.!" });
}
if (command.args && !args.length) {
    let reply = `You offered no arguments, ${message.author}!`;
    if (command.usage) {
        reply += `\nConvenient use: \`${prefix}${command.name} ${command.usage}\``;
    }
    return message.channel.send({ content: reply });
}
if(!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
}
const now = Date.now();
const timestamps = cooldowns.get(command.name);
const cooldownAmount = (command.cooldown || 3) * 1000;
if(timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply({ content: `Please wait ${timeLeft.toFixed(1)} seconds for \`${command.name}\` command.`, allowedMentions: { repliedUser: false }});
    }
}
let timeout = (e) => setTimeout(() => { e.delete(); }, 5000);
let embeds = new Discord.MessageEmbed().setFooter({ text: client.users.cache.get(vortex.panels.botowner).tag, iconURL: client.users.cache.get(vortex.panels.botowner).avatarURL({dynamic: true})}).setAuthor({ name: message.member.displayName, iconURL: message.author.avatarURL({dynamic: true})}).setTimestamp()
timestamps.set(message.author.id, now);
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
try {
    command.execute(client, message, args, embeds, timeout);
} catch (error) {
    console.error(error);
    message.reply('An error occurred while trying to execute this command!');
}

}
