const Discord = require("discord.js");
const config = require('./config.json')
const fs = require('fs')

const Client = new Discord.Client({
  disableEveryone: true,
  partials: ["MESSAGE", "REACTION"],
});
Client.commands = new Discord.Collection();
Client.aliases = new Discord.Collection();


// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Commands Handler

fs.readdirSync("./commands/").forEach((dir) => {
  fs.readdir(`./commands/${dir}`, (err, files) => {
    if (err) throw err;

    var jsFiles = files.filter((f) => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
      console.log("Can't find any commands!");
      return;
    }

    jsFiles.forEach((file) => {
      var fileGet = require(`./commands/${dir}/${file}`);
      console.log(`[HANDLER] : Le fichier ${file} a été chargé.`);
      try {
        Client.commands.set(fileGet.help.name, fileGet);

        fileGet.help.aliases.forEach((alias) => {
          Client.aliases.set(alias, fileGet.help.name);
        });
      } catch (err) {
        return console.log(err);
      }
    });
  });
});

Client.on("ready", async () => {
  console.log(`${Client.user.username} est prêt à claquer des mères !`);

  Client.user.setActivity("-help", { type: "WATCHING" });
});

Client.on("message", async (message, guild) => {
  if (message.author.Client || message.channel.type === "dm") return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commands =
    Client.commands.get(cmd.slice(config.prefix.length)) ||
    Client.commands.get(
      Client.aliases.get(cmd.slice(config.prefix.length))
    );

  if (commands) commands.run(Client, message, args, config.prefix);

  
});

Client.login(config.token);