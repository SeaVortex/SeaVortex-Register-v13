const { Schema, model } = require("mongoose");

const regSchema = Schema({
    guildID: String,
    userID: String,
    totalReg: String,
    womanReg: String,
    manReg: String,
    userNames: { type: Array, default: []}
});

module.exports = model("register", regSchema);