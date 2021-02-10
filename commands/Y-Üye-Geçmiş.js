const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
require("moment-duration-format");
const kdb = new db.table("Kayıt");
const Vortex = require("../Vortex.json");

exports.execute = async(client, message, args) => {

    let embed = new MessageEmbed().setColor("BLACK").setTimestamp().setFooter(Vortex.Footer)
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))

    if(!message.member.roles.cache.has(Vortex.Vortex))
    if(!message.member.roles.cache.has(Vortex.Registery))
    return message.channel.send(embed.setDescription(`Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin`)).then(x => x.delete({timeout: 5000}));

    let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    let uye = message.guild.member(kullanici);
    let kayıt = kdb.get(`kullanici.${uye.id}.kayıt`) || [];
    let kayıtrol = db.fetch(`erol.${uye.id}`)
    kayıt = kayıt.reverse();
  
    let isimler = kayıt.length > 0 ? kayıt.map((value, index) => `**${index + 1}** - **${value.isim}** **|** **${value.yas}**`).join("\n") : "Daha Önce Böyle Bir Üye Kayıt Olmamıştır!";
 
    message.channel.send(embed.setDescription(`\`>\` Kullanıcı: ${uye} \n\`>\` Geçmiş Rol: <@&${kayıtrol}> \n\`>\` Geçmiş İsmi: \n ${isimler}`))
}
exports.conf = {
  command: "Y-Üye-Geçmiş",
  description: "BU KOD VORTEX TARAFINDAN KODLANDI",
  aliases: ["üyegeçmiş", "üye-geçmiş", "uyegecmis", "uye-gecmis"]  
}