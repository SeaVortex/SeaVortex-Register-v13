const Discord = require("discord.js");
const vortex = require("../vortex.json");
const reg = require("../modules/register.js");
const moment = require("moment");
require("moment-duration-format"); moment.locale("tr");

module.exports = {
    name: "Nicks",
    description: "",
    aliases: ["isimler", "nicks", "iler", "ns"],
    usage: "İsim geçmişlerine bakarsınız.",
    cooldown: 5,

    async execute(client, message, args, embeds, timeout) {
        if (!message.member.roles.cache.has(vortex.staffs.foundar) && !message.member.roles.cache.has(vortex.staffs.owner) && !message.member.roles.cache.has(vortex.staffs.register) && !message.member.permissions.has('ADMINISTRATOR') && message.author.id !== vortex.panels.botowner) return message.react(vortex.emojis.red);
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let data = await reg.findOne({ guildID: message.guild.id, userID: user.id })
        if (!data || data && !data.userNames.length) return message.reply({ embeds: [embeds.setDescription(`${user} Kişinin geçmişe kayıtlı herhangi gibi bir isim bulunmuyor.`)] });

        embeds.setDescription(`${user} adlı kişinin  \`${data.userNames ? data.userNames.length : 0}\` geçmiş ismi bulundu. \n\n${data.userNames.map((a, i) => `\`${i + 1}.\` \`${a.nick}\` [**${a.type.replace(`Erkek`, `<@&${vortex.roles.man[0]}>`).replace(`Kız`, `<@&${vortex.roles.woman}>`)}**]`).join("\n")}`);
        message.reply({ embeds: [embeds] });
    },
}