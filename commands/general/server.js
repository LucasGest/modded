const Discord = require("discord.js");

var nameServer = ["All Of Fabrics 3", "SevTechs"]
var ipServer = ["Eterium.aternos.me", "SevTech_ADT.aternos.me"]
var versionServer = ["1.16.5", "1.12.2"]
var thumbnailServer = ["https://tlauncher.org/images/637415544223570844.png", "http://minecraft8.net/wp-content/uploads/2018/08/sevtech-01.jpg"]

module.exports.run = async (Client, message, args, prefix) => {
    let EmbedServer = new Discord.MessageEmbed()
      .setTitle("Liste des servers Minecraft")
      .setColor('GREEN')

      for(i=0; i<nameServer.length, i<ipServer.length, i<versionServer.length; i++){
          EmbedServer.addField(nameServer[i], `Ip du serveur : **${ipServer[i]}** \n Version du server : **${versionServer[i]}**`, false)
      }
  
    message.channel.send(EmbedServer);
  };
  
  module.exports.help = {
    name: "servers", // name of the cmd
    aliases: [], // another names for the cmd
  };