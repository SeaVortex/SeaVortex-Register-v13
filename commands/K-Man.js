const { MessageEmbed } = require('discord.js');
const Vortex = require('../Vortex.json');
const db = require('quick.db');
const kb = new db.table('kullanıcı')
const kdb = new db.table("Kayıt");

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
    
    await user.setNickname(`${tag} ${isim} | ${yas}`)
    await user.setNickname(`${tag} ${isim} | ${yas}`)
    await user.roles.add(Vortex.Man1)
    await user.roles.add(Vortex.Man2)
    await user.roles.remove(Vortex.UnReg)
    await user.roles.remove(Vortex.Woman1)
    await user.roles.remove(Vortex.Woman2)

    kb.add(`teyit.${message.author.id}.erkek`, 1)
    var ToplamKayıt = kb.get(`teyit.${message.author.id}.kiz`) + kb.get(`teyit.${message.author.id}.erkek`);

    let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    let uye = message.guild.member(kullanici);
    db.set(`erol.${uye.id}`, Vortex.Man1);
    kdb.push(`kullanici.${user.id}.kayıt`, {
    isim: isim,
    yas: yas,
    });

    let man = new MessageEmbed().setColor("RED").setTimestamp().setFooter(`${Vortex.Footer} • (${ToplamKayıt} Toplam Kayıt)`)
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`\`>\` Yetkili: ${message.author} \n\`>\` Kayıt Olan: ${user} \n\`>\` Verilen Roller: <@&${Vortex.Man1}>,<@&${Vortex.Man2}> \n\`>\` Yeni İsmi: \`${tag} ${isim} | ${yas}\``)
    .setThumbnail(`https://media.giphy.com/media/ynx1sj5Wz2atO/giphy.gif`)
    message.channel.send(man)

    let m = new MessageEmbed().setColor("RED").setTimestamp().setFooter(Vortex.Footer)
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`\`>\` Yetkili: ${message.author} \n\`>\` Kayıt Olan: ${user} \n\`>\` Verilen Roller: <@&${Vortex.Man1}>,<@&${Vortex.Man2}> \n\`>\` Yeni İsmi: \`${tag} ${isim} | ${yas}\``)
    client.channels.cache.get(Vortex.ManLog).send(m)   
    
    client.channels.cache.get(Vortex.ChatLog).send(`${user}, Adlı arkadaş aramıza yeni katıldı **__HoşGeldin!__**`).then(x => x.delete({timeout: 15000}));

}
exports.conf = {
    command: "K-Man",
    description: "BU KOD VORTEX TARAFINDAN KODLANDI",
    aliases: ["m", "man", "e", "erkek"]
  }
