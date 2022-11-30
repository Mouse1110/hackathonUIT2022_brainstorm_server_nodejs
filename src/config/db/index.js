const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);

        console.log('Connect db successfully !!!');

    } catch (error) {

        console.log('Connect db fail !!!');

    }
};

module.exports = { connect };