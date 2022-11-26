const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://minigame:Tuananh123@cluster0.3eznl3s.mongodb.net/minigame?retryWrites=true&w=majority');

        console.log('Connect db successfully !!!');

    } catch (error) {

        console.log('Connect db fail !!!');

    }
};

module.exports = { connect };