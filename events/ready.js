const Discord = require("discord.js");
const client = global.client;

exports.execute = async () => {
    client.user.setPresence({ activity: { name: "VORTEX V12 REİGSTER ALT YAPISI"}, status: "dnd" });
};

exports.conf = {
  event: "ready"
};