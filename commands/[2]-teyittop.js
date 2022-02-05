const Discord = require("discord.js");
const vortex = require("../vortex.json");
const reg = require("../modules/register.js");
const moment = require("moment");
require("moment-duration-format"); moment.locale("tr");

module.exports = {
    name: "Tayittop",
    description: "",
    aliases: ["kayıttop", "ktop", "ttop"],
    usage: "kayıttop Kayıt Verilerine Bakarsın.",
    cooldown: 5,

    async execute (client, message, args, embeds, timeout) {

        if(!message.member.roles.cache.has(vortex.staffs.foundar) && !message.member.roles.cache.has(vortex.staffs.owner) && !message.member.roles.cache.has(vortex.staffs.register) && !message.member.permissions.has('ADMINISTRATOR') && message.author.id !== vortex.panels.botowner) return message.react(vortex.emojis.red);
        let regTop = await reg.find({ guildID: message.guild.id }).sort({ totalReg: -1}).exec();
        if(!regTop.length) return message.reply({ embeds: [embeds.setDescription("Kayıt verisi bulunamadı!")]}).catch(e => { });
        regTop = regTop.filter(x => message.guild.members.cache.has(x.userID)).splice(0, 10)
        embeds.setDescription(regTop.map((x, i) => `\`${i+1}.\` <@${x.userID}> Toplam **${x.totalReg}** (\`${x.manReg} Erkek, ${x.womanReg} Kız\`)`).join("\n"))

        message.reply({ embeds: [embeds]})
    },
    
}