const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    phone: String,
    address: String,
    pass: String,
    permission: String,
    products: Array,
    
});
module.exports = mongoose.model("User", User);