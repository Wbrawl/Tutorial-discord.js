const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "/";

client.on("ready", () => {
  console.log("====Angemeldet====");
  client.user.setActivity("W.brawl", {
    type: "LISTENING"
  });
});

client.on("message", async message => {
  if (message.content.indexOf(prefix) !== 0) return;
  if (message.author.bot) return;
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  let command = args.shift().toLowerCase();

  if (command === "say") {
    if (!args[0]) return message.reply("Gebe einen Text an!");
    message.channel.send(args.join(" "));
  }
  if (command === "ban") {
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.reply("Berechtigung: Bannen");
    const member = message.mentions.members.first();
    if(!member) return message.reply("Gebe einen Nutzer an!")
    if(!member.bannable) return message.reply("Ich kann diesen user nicht bannen, da er entweder eine höhere rolle hat oder ich keine Berechtigung dazu habe! :(")
    member.ban.then(() => {
      message.channel.send("Gebannt!");
      member.send("Du bist von "+message.guild+" Gebannt!")
    });
  }
});

client.login(process.env.TOKEN);
require("http")
  .createServer(function(request, response) {
    response.end("Hallo!");
  })
  .listen(process.env.PORT);
