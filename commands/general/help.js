const Discord = require("discord.js");

module.exports.run = async (Client, message, args, prefix) => {
  let EmbedHelp = new Discord.MessageEmbed()
    .setAuthor("Modded Server")

    .setTitle("Le help")

  message.channel.send(EmbedHelp);
};

module.exports.help = {
  name: "help", // name of the cmd
  aliases: [], // another names for the cmd
};