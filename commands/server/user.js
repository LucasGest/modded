const discord = require("discord.js");
const moment = require("moment");
const config = require('../../config.json')

module.exports.run = async (Client, message, args, prefix) => {
  if (!message.content.startsWith(config.prefix)) return;

  let mentionedMember = message.mentions.members.first() || message.member;
  var game = mentionedMember.presence.game;
  var status = mentionedMember.presence.status; 

  if (status == "dnd") status = "Ne pas déranger";
  if (status == "online") status = "En ligne";
  if (status == "offline") status = "Hors ligne";
  if (status === "idle") status = "Occupé";

  const roles = mentionedMember.roles.cache 
    .sort((a, b) => b.position - a.position)
    .map((role) => role.toString())
    .slice(0, -1);

  let displayRoles;
  if (roles.length < 20) {
    displayRoles = roles.join(" ");
    if (roles.length < 1) displayRoles = "None";
  } else {
    displayRoles = roles.slice(20).join(" ");
  }

  const userEmbed = new discord.MessageEmbed()
    .setAuthor(
      `Informations sur l'utilisateur ${mentionedMember.user.username}`,
      mentionedMember.user.displayAvatarURL({ dynamic: true, size: 2048 })
    ) 
    .addField(`**Tag: **`, `${mentionedMember.user.tag}`)
    .addField(`**Username: **`, mentionedMember.user.username || "None") 
    .addField(`**ID: **`, `${mentionedMember.id}`) 
    .addField(`**Status: **`, `${status}`) 
    .addField(`**Jeux: **`, `${game || "None"}`) 
    .addField(
      `**Compte créé le: **`,
      `${moment(mentionedMember.createdAt).format("DD-MM-YYYY [à] HH:mm")}`
    )
    .addField(
      `**A rejoint le server le: **`,
      `${moment(mentionedMember.joinedAt).format("DD-MM-YYYY [à] HH:mm")}`
    ) 
    .addField(`**Roles: [${roles.length}]**`, `${displayRoles}`); 
  message.channel.send(userEmbed); 
};

module.exports.help = {
  name: "user",
  aliases: ["who", "whois"],
};