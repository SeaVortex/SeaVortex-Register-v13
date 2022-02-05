const Discord = require("discord.js");
const vortex = require("../vortex.json");
const reg = require("../modules/register.js");
const moment = require("moment");
require("moment-duration-format"); moment.locale("tr");

module.exports = {
    name: 'Man',
    description: "",
    aliases: ["erkek", "man", "e", "m"],
    usage: "erkek @user/ID İsim Yaş",
    cooldown: 5,

    async execute(client, message, args, embeds, timeout) {

        if(!message.member.roles.cache.has(vortex.staffs.foundar) && !message.member.roles.cache.has(vortex.staffs.owner) && !message.member.roles.cache.has(vortex.staffs.register) && !message.member.permissions.has('ADMINISTRATOR') && message.author.id !== vortex.panels.botowner) return message.react(vortex.emojis.red);
        let user = message.mentions.members.first() || message.guild.members.cache.get([args[0]])
        if(!user) return message.reply({embeds : [embeds.setDescription("Geçerli bir kişi belirlemelisin!")]}).then(timeout).catch(e => { });
        let tag = vortex.panels.tag;
        let nick = args[1];
        let age = args[2];
        if(!nick) return message.reply({embeds: [embeds.setDescription("Geçerli bir isim belirlemelisin!")]}).then(timeout).catch(e => { });
        if(isNaN(age)) return message.reply({embeds: [embeds.setDescription("Geçerli bir yaş belirlemelisin!")]}).then(timeout).catch(e => { });
        if(vortex.roles.man && vortex.roles.man.some(rol => user.roles.cache.has(rol))) return message.channel.send({ embeds: [embeds.setDescription("Bu kişi zaten kayıtlı.")]}).then(timeout).catch(e => { })
        await user.setNickname(`${tag} ${age} ${nick.charAt(0).toUpperCase() + nick.slice(1).toLowerCase()}${age ? ` ${vortex.panels.nametag} ${age}` : ``}`).catch(e => { });
        await user.roles.add(vortex.roles.man).catch(e => { });
        await user.roles.remove(vortex.roles.unreg).catch(e => { });
        await user.roles.remove(vortex.roles.woman).catch(e => { });

        let regData = await reg.findOne({ guildID: message.guild.id, userID: user.id});
        let staffData = await reg.findOne({ guildID: message.guild.id, userID: message.author.id});
        if(!staffData) {
            let newStaffData = new reg({
                guildID: message.guild.id,
                userID: message.author.id,
                totalReg: 1,
                womanReg: 0,
                manReg: 1,
                userNames: []
            }).save()
        } else {
            staffData.totalReg++
            staffData.womanReg++
        }
        if(!regData) {
            let newRegData = new reg({
                guildID: message.guild.id,
                userID: user.id,
                totalReg: 0,
                womanReg: 0,
                manReg: 0,
                userNames: [{ nick: `${tag} ${age} ${nick.charAt(0).toUpperCase() + nick.slice(1).toLowerCase()}${age ? ` ${vortex.panels.nametag} ${age}` : ``}`, tpye: `KIZ`}]
            }).save();
        } else {
            regData.userNames.push[{ nick: `${tag} ${age} ${nick.charAt(0).toUpperCase() + nick.slice(1).toLowerCase()}${age ? ` ${vortex.panels.nametag} ${age}` : ``}`, type: `KIZ`}]
            regData.save();
        }

        message.reply({ embeds: [embeds.setDescription(`${user}, adlı kişi \`ERKEK\` olarak aramıza katıldı.`)]}).catch(e => { });
        client.channels.cache.get(vortex.logs.man).send({ embeds: [embeds.setDescription(`Kayıt Eden: ${message.author} - (\`${message.author.id}\`) \nKayıt Olan: ${user} - (\`${user.id}\`) \nKayıt Olma Tarihi: \`${moment(Date.now()).format("LLL")}\` \nVerilen Roller: ${vortex.roles.man.map(x => `<@&${x}>`)} \nYeni İsmi: \`${tag} ${age} ${nick.charAt(0).toUpperCase() + nick.slice(1).toLowerCase()}${age ? ` ${vortex.panels.nametag} ${age}` : ``}\``)]}).catch(e => { });
        client.channels.cache.get(vortex.logs.chat).send(`${user} aramıza katıldı.`).catch(e => { });
    },
}
