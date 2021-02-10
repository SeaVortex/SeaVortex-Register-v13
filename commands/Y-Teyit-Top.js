const { MessageEmbed } = require("discord.js");
const Vortex = require("../Vortex.json");
const db = require("quick.db");
const moment = require("moment");
const ms = require("ms");
const kb = new db.table('kullanıcı')

exports.execute = async(client, message, args) => {
    
    let embed = new MessageEmbed().setAuthor(`En Çok Kayıt Yapan İlk 10`, message.guild.iconURL({dynamic: true})).setThumbnail(message.guild.iconURL({dynamic: true}))
    .setFooter(Vortex.Footer).setColor("BLACK").setTimestamp();

    let data = await kb.get("teyit") || {};
    let arr = Object.keys(data);
    let listedMembers = arr.filter(dat => message.guild.members.cache.has(dat)).sort((a,b) => Number((data[b].erkek || 0) + (data[b].kiz || 0)) - Number((data[a].erkek || 0) + (data[a].kiz || 0))).map((value, index) => `\`${index + 1}.\` **<@${client.users.cache.get(value).id}>** - ${client.sayilariCevir((data[value].erkek || 0) + (data[value].kiz || 0))} kayıt (**${client.sayilariCevir((data[value].erkek || 0))}** erkek, **${client.sayilariCevir((data[value].kiz || 0))}** kız)`).splice(0, 10);
    message.channel.send(embed.setDescription(`${listedMembers.join(`\n`) || "Teyit verisi bulunamadı!"} `)).catch();  
}
exports.conf = {
  command: "Y-Teyit-Top",
  description: "BU KOD VORTEX TARAFINDAN KODLANDI",
  aliases: ["teyittop", "teyit-top", "kayıttop", "kayıt-top"]
}