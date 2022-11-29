const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

 
app.use(cors())
 app.listen(app.listen(process.env.PORT || 8080), function () {
  console.log('CORS-enabled web server listening')
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




