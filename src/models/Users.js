const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    name: { type: String, required: true, minlength: 1 },
    avatar: { type: String },
    phone: { type: String, required: true, minlength: 10, unique: true },
    address: { type: String, required: true, minlength: 1 },
    pass: { type: String, required: true, minlength: 6 },
    permission: { type: String, required: true },
    admin: { type: Boolean, default: false },
    products: Array,

}, { timestamps: true });

module.exports = mongoose.model("User", User);