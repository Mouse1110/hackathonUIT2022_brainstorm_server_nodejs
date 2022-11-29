const express = require('express');
const app = express();
const path = require('path');


app.listen(process.env.PORT || 8080)
const route = require('./routes');
const db = require('./config/db');

db.connect();

app.use(express.static(path.join(__dirname, 'public')))
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());


route(app);




