const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(app.listen(process.env.PORT || 8080), function () {
    console.log('CORS-enabled web server is running')
})

const route = require('./routes/index');
const db = require('./config/db');

db.connect();

app.use(express.static(path.join(__dirname, 'public')))
app.use(
    express.urlencoded({
        extended: false,
    }),
);


route(app);




