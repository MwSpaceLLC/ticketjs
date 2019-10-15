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

// TODO must insert csrf protection
// https://github.com/expressjs/csurf

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
};

app.use(allowCrossDomain);

// TODO must refactoring

router.get('/status', (req, res) => {
    res.status(200).send('server up');
});
/** ===================================================================================== */

/**
 * @register
 * Register function for user
 */
router.post('/register', function (req, res) {

    console.log('User Registred:');
    console.log(req.body);

    if (req.body.passcode !== process.env.PASSCODE)
        return res.status(403).send('Passcode non corretta');

    db.firstIinsert([
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
/** ===================================================================================== */

/**
 * @login
 * Login function for user
 */
router.post('/login', (req, res) => {
    db.selectByEmail(req.body.email, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');

        if (!user) return res.status(403).send('Utente non trovato nei nostri sistemi');

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) return res.status(401).send({auth: false, token: null});

        let token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({auth: true, token: token, user: user});
    });
});
/** ===================================================================================== */

/**
 * @ticket
 * Search ticket by key
 */
router.post('/post/ticket', (req, res) => {

    /* @prepare OBJ as Array for Insert*/
    var t = req.body.ticket;

    // console.log(t)

    db.insertNewTicket([
        t.user_id,
        t.category_id.value,
        t.subject,
        new Date().toJSON().slice(0, 10),
        t.duelimit
    ], (err, ticket) => {
        if (err) return res.status(500).send('Error on the server.');

        console.log('New Ticket Registred:');
        console.log(ticket);

        res.status(200).send(ticket);
    });
});
router.get('/ticket/:status', (req, res) => {
    var query = req.params.status;

    db.selectTicketByStatus(query, (err, ticket) => {
        if (err) return res.status(500).send('Error on the server.');

        res.status(200).send(ticket);
    });
});
/** ===================================================================================== */

/**
 * @categories
 * Search default categories by key
 */
router.get('/categories/default', (req, res) => {
    db.searchCatByDefault((err, categories) => {
        if (err) return res.status(500).send('Error on the server.');

        res.status(200).send(categories);
    });
});

router.get('/categories/get', (req, res) => {
    db.getCategory((err, categories) => {
        if (err) return res.status(500).send('Error on the server.');

        res.status(200).send(categories);
    });
});
/** ===================================================================================== */

app.use(router);

let port = process.env.VUE_APP_SRVPORT || 3000;

let backend = app.listen(port, function () {
    console.log('Express server listening on port ' + port)
});