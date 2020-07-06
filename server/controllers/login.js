//express
const express = require('express')
const app = express()

//Bcrypt
const bcrypt = require('bcrypt');

//JSON Web Token
const jwt = require('jsonwebtoken');

//Google SingIN
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

//Import Model
const UsuarioDB = require('../models/userDB.js');

//Colors
const colors = require('colors');

//POST LOGIN
app.post('/login', (req, res) => {

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

// Configuraciones de Google
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const payload = ticket.getPayload();

    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}


app.post('/google', async(req, res) => {

    let token = req.body.token;

    // VERIFICACION DE TOKEN GOOGLE
    let googleUser = await verify(token)
        .catch(err => {
            console.log(err)
            return res.status(403).json({
                status: 'Error',
                err
            });
        });

    //BUSCAR USUARIO EN BD
    UsuarioDB.findOne({ email: googleUser.email }, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        };

        //SI EXISTE
        if (userDB) {
            let jwt_token = jwt.sign({ user: userDB }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN });


            return res.json({
                ok: true,
                user: userDB,
                token: jwt_token,
            });
            //SINO EXISTE CREAR USUARIO
        } else {
            let newUser = new UsuarioDB();

            newUser.name = googleUser.name;
            newUser.email = googleUser.email;
            newUser.img = googleUser.img;
            newUser.google = true;
            newUser.password = ':)';

            newUser.save((err, userSaved) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                };


                let token = jwt.sign({
                    usuario: userSaved
                }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN });

                return res.json({
                    ok: true,
                    usuario: userSaved,
                    token,
                });

            });

        }


    });


});


module.exports = app;