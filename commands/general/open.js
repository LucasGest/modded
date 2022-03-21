const Discord = require("discord.js");

module.exports.run = async (Client, message, args, prefix) => {
    let EmbedOpen = new Discord.MessageEmbed()
    .setTitle("Vous voulez ouvrir les serveurs ?")
    .setDescription("Veuillez cliquer sur le lien, il vous enverra vers un google from !")
    .setURL("https://forms.gle/nnhop9N7MEwwFQ2b9")
      
    message.channel.send(EmbedOpen);
  };
  
  module.exports.help = {
    name: "open", // name of the cmd
    aliases: [], // another names for the cmd
  };