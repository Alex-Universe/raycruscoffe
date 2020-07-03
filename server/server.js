require('./config/config');

//express
const express = require('express');
const app = express();
app.use(require('./controllers/user.js'))

//mongoose
const mongoose = require('mongoose');

//Colors
const colors = require('colors');

mongoose.connect(process.env.URL_DB, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
    })
    .then(res => console.log('Connected to RaycrusCoffeDB'.green))
    .catch(err => {
        console.log(colors.red("Couln't Connect to DB \n", err))

        console.log(`=====================TRYING CONNECT TO DB =======================\N
                    ======================${process.env.URL_DB}\n
                    ==================================================================
                    ==================================================================
                    ==================================================================`.bgWhite.black)
    });

app.listen(process.env.PORT, () => {
    console.log(`Listenning Port: ${process.env.PORT} Timestamp:  ${ new Date()}`.green);
});