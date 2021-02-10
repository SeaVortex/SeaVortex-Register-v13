const { MessageEmbed } = require('discord.js')
const Vortex = require("../Vortex.json");
const moment = require('moment')
require("moment-duration-format");

exports.execute = async (client, message, args) => {
 
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;

    let kontrol;   
    let kurulus = new Date().getTime() - user.createdAt.getTime();  

    if (kurulus < 1296000000) kontrol = 'Güvenilir Değil'
    else kontrol = 'Güvenilir'

    let userinfo = {};
     
    userinfo.avatar = user.avatarURL({dynamic: true, size: 2048});  
    userinfo.id = user.id;
    userinfo.status = user.presence.status.toString().replace("dnd", ` Rahatsız Etmeyin`).replace("online", ` Çevrimiçi`).replace("idle", ` Boşta`).replace("offline", ` Çevrimdışı`)  
    userinfo.dctarih = moment.utc(user.createdAt).format('DD/MM/YYYY HH:mm')
    userinfo.dctarihkatilma = moment.utc(message.guild.members.cache.get(user.id).joinedAt).format('DD/MM/YYYY HH:mm')

    const uembed = new MessageEmbed()
    .setAuthor(user.tag, userinfo.avatar)
    .setThumbnail(userinfo.avatar)
    .setColor('RED')
    .setDescription(`
    **Discord Adı :** <@${userinfo.id}>

    **ID :** __${userinfo.id}__

    **Durum :** __${userinfo.status}__

    **Güvenilir mi :** __${kontrol}__
 
    **Katılım Tarihi :** __${userinfo.dctarihkatilma}__

    **Hesap Oluşturma Tarihi :** __${userinfo.dctarih}__`)
    .addField(`Roller:`, `${message.guild.members.cache.get(user.id).roles.cache.filter(r => r.name !== "@everyone").map(r => r).join(' , ') || "``Bu kullanıcıda hiçbir rol bulunmuyor.``"}`, false)
    .setFooter(Vortex.Footer).setTimestamp()  

    message.channel.send(uembed) 
}
exports.conf = {
  command: "Y-Üye-İnfo",
  description: "BU KOD VORTEX TARAFINDAN KODLANDI",
  aliases: ['üyebilgi', 'üyeinfo' , 'üye-info' , 'üye-bilgi']
}