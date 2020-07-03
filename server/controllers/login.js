//express
const express = require('express')
const app = express()

//Bcrypt
const bcrypt = require('bcrypt');

//JSON Web Token
const jwt = require('jsonwebtoken');


//Import Model
const UsuarioDB = require('../models/userDB.js');

//Login
app.post('/login', function(req, res) {

    UsuarioDB.findOne({ email: req.body.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                status: 'Error',
                err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                status: 'Error',
                err: 'Email not registered'
            });
        }

        if (!bcrypt.compareSync(req.body.password, userDB.password)) {
            return res.status(400).json({
                status: 'Error',
                err: 'Invalid Password'
            });
        }

        let token = jwt.sign({ user: userDB }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN })

        res.json({
            status: 'Ok',
            user: userDB,
            token
        });

    })

});

module.exports = app;