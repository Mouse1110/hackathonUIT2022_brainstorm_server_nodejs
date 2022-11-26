const express = require('express');
const app = express();

app.listen(5000, () =>{
    console.log('Server is running on port 5000.');
})
const route = require('./routes');
const db = require('./config/db');

db.connect();

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());


route(app);




