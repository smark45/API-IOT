const express = require('express');
const http = require('https');

//Initializations
const app = express();

//Settings
app.set('port',process.env.PORT || 8080);

//Middlewares
app.use(express.json());


//Global Variables
app.get('/',(req,res)=>{
   res.send('Hello Word');
});

//Routes
app.use(require('./routes/weight.routes'));
app.use(require('./routes/tempHum.routes'));
app.use(require('./routes/open.routes'));
app.use(require('./routes/smoke.routes'));
app.use(require('./routes/sensor.routes'));

module.exports = app;
