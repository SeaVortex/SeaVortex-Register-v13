const Discord = require("discord.js");
const vortex = require("../vortex.json");
const reg = require("../modules/register.js");
const moment = require("moment");
require("moment-duration-format"); moment.locale("tr");

module.exports = {
    name: "Infos",
    description: "",
    aliases: ["info", "ifs", "bilgi"],
    usage: "info kişinin bilgilerine bakarsın.",
    cooldown: 5,

    async execute (client, message, args, embeds, timeout) {

        if(!message.member.roles.cache.has(vortex.staffs.foundar) && !message.member.roles.cache.has(vortex.staffs.owner) && !message.member.roles.cache.has(vortex.staffs.register) && !message.member.permissions.has('ADMINISTRATOR') && message.author.id !== vortex.panels.botowner) return message.react(vortex.emojis.red);
        let user = message.mentions.members.first() || message.guild.members.cache.get([args[0]]) || message.member;
        let regData = await reg.findOne({ guildID: message.guild.id, userID: user.id});
        if(!regData) {
            let reRegData = new reg({
                guildID: message.guild.id,
                userID: user.id,
                totalReg: 0,
                womanReg: 0,
                manReg: 0,
                userNames: []
            }).save().then(x => {
                return message.reply({ embeds: [embeds.addField(`➥ Kullanıcı Bilgi`, `\`•\` Sunucu İsmi: ${user.displayName} \n\`•\` Kullanıcı ID: \`${user.id}\``).addField(`➥ Kayıt Bilgisi`, `\`\`\`js\n Toplam: ${x.totalReg} Erkek: ${x.manReg} Kız: ${x.womanReg}\`\`\``)]}).catch(e => { });
            });
        } else {
            message.reply({ embeds: [embeds.addField(`➥ Kullanıcı Bilgi`, `\`•\` Sunucu İsmi: ${user.displayName} \n\`•\` Kullanıcı ID: \`${user.id}\``).addField(`➥ Kayıt Bilgisi`, `\`\`\`js\n Toplam ${regData.totalReg} Erkek: ${regData.manReg} Kız: ${regData.womanReg}\`\`\``)]}).catch(e => { })
        }

    },
    
}