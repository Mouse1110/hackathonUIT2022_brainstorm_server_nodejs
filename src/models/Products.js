const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema({

    image: { type: String, minlength: 1},
    name: { type: String, minlength: 1},
    type: { type: String, minlength: 1},
    time_receive: { type: Number, minlength: 1},
    buyer: Array
    
});
module.exports = mongoose.model("Product", Product);