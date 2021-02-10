const { MessageEmbed } = require('discord.js');
const Vortex = require('../Vortex.json');

exports.execute = async (client, message, args) => {

    let embed = new MessageEmbed().setColor("RANDOM").setTimestamp().setFooter(Vortex.Footer)
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))

    if(!message.member.roles.cache.has(Vortex.Vortex))
    if(!message.member.roles.cache.has(Vortex.Registery))
    return message.channel.send(embed.setDescription('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!')).then(x => x.delete({timeout: 5000}));

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let tag = Vortex.Tag
    let isim = args[1]
    let yas = args[2]

    if(!user) return message.channel.send(embed.setDescription('Geçerli bir üye belirlemelisin!')).then(x => x.delete({timeout: 5000}));
    if(!isim) return message.channel.send(embed.setDescription('Geçerli bir isim belirlemelisin!')).then(x => x.delete({timeout: 5000}));
    if(isNaN(yas)) return message.channel.send(embed.setDescription('Geçerli bir yaş belirlemelisin!')).then(x => x.delete({timeout: 5000}));
    
    user.setNickname(`${tag} ${isim} | ${yas}`)
    user.setNickname(`${tag} ${isim} | ${yas}`)

    let nick = new MessageEmbed().setColor("RED").setTimestamp().setFooter(Vortex.Footer)
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`\`>\` Yetkili: ${message.author} \n\`>\` Üye: ${user} \n\`>\` Yeni İsmi: \`${tag} ${isim} | ${yas}\` `)
    .setThumbnail(`https://media.giphy.com/media/ynx1sj5Wz2atO/giphy.gif`)
    message.channel.send(nick).then(x => x.delete({timeout: 7000}));

    let n = new MessageEmbed().setColor("RED").setTimestamp().setFooter(Vortex.Footer)
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`\`>\` Yetkili: ${message.author} \n\`>\` Üye: ${user} \n\`>\` Yeni İsmi: \`${tag} ${isim} | ${yas}\` `)
    client.channels.cache.get(Vortex.NickLog).send(n)
}
exports.conf = {
  command: "K-Nick",
  description: "BU KOD VORTEX TARAFINDAN KODLANDI",
  aliases: ["nick", "n", "isim", "i"]  
}