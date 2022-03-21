const discord = require("discord.js");
const moment = require(`moment`);
const config = require('../../config.json')

// setting all the verifiaction levels so it looks nice
const verificationLevels = {
  NONE: "None",
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  VERY_HIGHT: "Very High",
};

// setting all the regions so it looks nice
const regions = {
  brazil: "Brésil",
  europe: "Europe",
  hongkong: "Hong Kong",
  india: "Inde",
  japan: "Japon",
  russia: "Russie",
  singapore: "Singapoure",
  southafrica: "Afrique du Sud",
  sydeny: "Sydney",
  'us-central': "US Central",
  'us-east': "US East",
 'us-west': "US West",
 'us-south': "US South",
};

module.exports.run = async (Client, message, args, prefix) => {
  // cmd handler
  if (!message.content.startsWith(config.prefix)) return; // it makes sure that the cmd starts with the config.prefix

  // getting all the roles of the server
  const roles = message.guild.roles.cache
    .sort((a, b) => b.position - a.position)
    .map((role) => role.toString())
    .slice(0, -1);

  const members = message.guild.members.cache;
  const channels = message.guild.channels.cache;
  const emojis = message.guild.emojis.cache;
  let rolesdisplay;

  if (roles.length < 20) {
    rolesdisplay = roles.join(" ");
  } else {
    rolesdisplay = roles.slice(20).join(" ");
  }

  const { guild } = message;
  const { name, region, memberCount, owner } = guild;
  const icon = guild.iconURL();

  var serverEmbed = new discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`Serverinfo de ${name}`)
    .setThumbnail(message.guild.iconURL())
    .addField(`General`, [
      `**Nom:** ${name}`, 
      `**ID:** ${message.guild.id}`, 
      `**Propriétaire:** ${message.guild.owner.user}`,
      `**Region:** ${regions[message.guild.region]}`, 
      `**Boost Tier:** ${
        message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : "None"
      }`, 
      `**Verification Level:** ${
        verificationLevels[message.guild.verificationLevel]
      }`, 
      `**Boost Level:** ${message.guild.premiumSubscriptionCount || "0"}`, 
      `**Créé le:** ${moment(message.guild.createdTimestamp).format(
        "DD/MM/YYYY"
      )} ${moment(message.guild.createdTimestamp).fromNow()}`, 
      "\u200b",
    ])

    .addField("Stats", [
      `**Nombre de rôle:** ${roles.length}`,
      `**Nombre d'émoji:** ${emojis.size}`, 
      `**Nombre d'émoji normal:** ${
        emojis.filter((emoji) => !emoji.animated).size
      }`, 
      `**Emoji animé:** ${emojis.filter((emoji) => emoji.animated).size}`, 
      `**Nombre de membre:** ${message.guild.memberCount}`, 
      `**Humains:** ${members.filter((member) => !member.user.bot).size}`, 
      `**Bots:** ${members.filter((member) => member.user.bot).size}`, 
      `**En ligne:** ${
        members.filter((member) => member.presence.status === "online").size
      }`, 
      `**Hors ligne:** ${
        members.filter((member) => member.presence.status === "offline").size
      }`, 
      `**Ne pas deranger:** ${
        members.filter((member) => member.presence.status === "dnd").size
      }`, 
      `**Occupé:** ${
        members.filter((member) => member.presence.status === "idle").size
      }`, 
      `**Channel textuels:** ${
        channels.filter((channel) => channel.type === "text").size
      }`, 
      `**Channel vocaux:** ${
        channels.filter((channel) => channel.type === "voice").size
      }`,
      "\u200b",
    ])

    .addField(`Roles [${roles.length - 1}]`, rolesdisplay);

  message.channel.send(serverEmbed);
};
module.exports.help = {
  name: "serverinfo",
  aliases: ["server-info", "server"],
};