require('./config/config');

//express
const express = require('express');
const app = express();
const path = require('path')

//controllers
app.use(require('./controllers/index.js'))


//mongoose
const mongoose = require('mongoose');

//Colors
const colors = require('colors');

//Habilite Public
app.use(express.static(path.resolve(__dirname, '../public')))

//connect to DB
mongoose.connect(process.env.URL_DB, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
    })
    .then(res => console.log(`Connected to RaycrusCoffeDB ${process.env.NODE_ENV}`.green))
    .catch(err => console.log(colors.red("Couln't Connect to DB \n", err)))

//Listen Server
app.listen(process.env.PORT, () => {
    console.log(`Listenning Port: ${process.env.PORT} Timestamp:  ${ new Date()}`.green);
});