const mongoose = require("mongoose");


const s = new mongoose.Schema({
    to:String,
    message:String
});

const schema = new mongoose.Schema({
    name:String,
    passwd:String,
    chats:[s]
});

const model = mongoose.model("user",schema);

module.exports.users = model;
