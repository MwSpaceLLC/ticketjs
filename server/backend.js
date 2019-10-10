"use strict";
const dotenv = require('dotenv').config();
const express = require('express');
const DB = require('./db');
const config = require('./config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const db = new DB("./server/sqlite/sqlitedb");

const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// CORS middleware
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

app.use(allowCrossDomain);


router.get('/status', (req, res) => {
    res.status(200).send('server up');
});

/**
 * Generi routes
 */
router.post('/register', function (req, res) {

    console.log('User Registred:');
    console.log(req.body);

    if (req.body.passcode !== process.env.PASSCODE)
        return res.status(403).send('Passcode non corretta');

    db.insert([
            req.body.email,
            bcrypt.hashSync(req.body.password, 8)
        ],

        function (err) {
            if (err) return res.status(500).send("There was a problem registering the user.");

            db.selectByEmail(req.body.email, (err, user) => {
                if (err) return res.status(500).send("There was a problem getting user");

                let token = jwt.sign({id: user.id}, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });

                res.status(200).send({auth: true, token: token, user: user});
            });
        });
});

router.post('/login', (req, res) => {
    db.selectByEmail(req.body.email, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');

        if (user.length === 0) return res.status(403).send('Utente non trovato nei nostri sistemi');

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) return res.status(401).send({auth: false, token: null});

        let token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({auth: true, token: token, user: user});
    });
});

app.use(router);

let port = process.env.VUE_APP_SRVPORT || 3000;

let backend = app.listen(port, function () {
    console.log('Express server listening on port ' + port)
});