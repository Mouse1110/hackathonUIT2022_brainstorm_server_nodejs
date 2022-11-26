const express = require('express');
const app = express();
const path = require('path');

app.listen(5000, () =>{
    console.log('Server is running on port 5000.');
})
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




