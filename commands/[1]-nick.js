const Discord = require("discord.js");
const vortex = require("../vortex.json");
const reg = require("../modules/register.js");
const moment = require("moment");
require("moment-duration-format"); moment.locale("tr");

module.exports = {
    name: "Nick",
    description: "",
    aliases: ["i", "isim", "nick"],
    usage: "isim @user/ID İsim Yaş",
    cooldown: 5,

    async execute (client, message, args, embeds, timeout) {

        if(!message.member.roles.cache.has(vortex.staffs.foundar) && !message.member.roles.cache.has(vortex.staffs.owner) && !message.member.roles.cache.has(vortex.staffs.register) && !message.member.permissions.has('ADMINISTRATOR') && message.author.id !== vortex.panels.botowner) return message.react(vortex.emojis.red);
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.reply({ embeds: [embeds.setDescription("Geçerli bir kişi belirlemelisin!")]}).then(timeout).catch(e => { });
        let tag = vortex.panels.tag;
        let nick = args[1];
        let age = args[2];
        if(!nick) return message.reply({ embeds: [embeds.setDescription("Geçerli bir isim belirlemelisin!")]}).then(timeout).catch(e => { });
        if(isNaN(age)) return message.reply({ embeds: [embeds.setDescription("Geçerli bir yaş belirlemelisin!")]}).then(timeout).catch(e => { });
        await user.setNickname(`${tag} ${nick.charAt(0).toUpperCase() + nick.slice(1).toLowerCase()}${age ? ` | ${age}` : ``}`).catch(e => { });

        let regData = await reg.findOne({ guildID: message.guild.id, userID: user.id})
        if(!regData) {
            let newRegData = new reg({
                guildID: message.guild.id,
                userID: user.id,
                totalReg: 0,
                womanReg: 0,
                manReg: 0,
                userNames: [{ nick: `${tag} ${nick.charAt(0).toUpperCase() + nick.slice(1).toLowerCase()}${age ? ` | ${age}` : ``}`, type: `İsim Değiştirme`}]
            })
        } else {
            regData.userNames.push({ nick: `${tag} ${nick.charAt(0).toUpperCase() + nick.slice(1).toLowerCase()}${age ? ` | ${age}` : ``}`, type: `İsim Değiştirme`})
            regData.save();
        }

        message.react(vortex.emojis.onay).catch(e => { });
    },
    
}