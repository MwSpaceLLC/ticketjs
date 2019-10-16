"use strict";

const dotenv = require('dotenv').config(),
    express = require('express'),
    DB = require('./db'),
    config = require('./config'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    bodyParser = require('body-parser'),
    db = new DB("./server/sqlite/sqlitedb"),
    app = express(),
    router = express.Router(),
    crypto = require('crypto'),
    authSession = require('./authSessionToken');

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

router.get('/status', (req, res, next) => {
    res.status(200).send('server up');
});
/** ===================================================================================== */

/**
 * @register
 * Register function for user
 */
router.post('/register', (req, res, next) => {

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

                var authSessionToken = authSession.Token();

                db.setSession([
                    user.id,
                    authSessionToken,
                    req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                    req.headers['user-agent'] || null
                ], (err, ticket) => {
                    if (err) res.status(500).send('Error to store REGISTER session on the server');
                });

                res.status(200).send({auth: true, token: token, user: user, session: authSessionToken});
            });
        });
});
/** ===================================================================================== */

/**
 * @login
 * Login function for user
 */
router.post('/login', (req, res, next) => {
    db.selectByEmail(req.body.email, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');

        if (!user) return res.status(403).send('Utente non trovato nei nostri sistemi');

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) return res.status(401).send({auth: false, token: null});

        let token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        var authSessionToken = authSession.Token();

        db.setSession([
            user.id,
            authSessionToken,
            req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            req.headers['user-agent'] || null
        ], (err, ticket) => {
            if (err) res.status(500).send('Error to store LOGIN session on the server');
        });

        res.status(200).send({auth: true, token: token, user: user, session: authSessionToken});
    });
});
/** ===================================================================================== */

/**
 * @ticket
 * Search ticket by key
 */
router.post('/post/ticket', (req, res, next) => {

    /* @prepare OBJ as Array for Insert*/
    var t = req.body.ticket;

    console.log(t);

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

/** get ticket status */
router.get('/ticket/:status', (req, res, next) => {

    let query = req.params.status,
        token = req.headers.session,
        user;

    db.getUserBySess(token, (err, session) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!session.length) return res.status(403).send('token mismatch');

        // TODO Continue Query
        return console.log(session[0]);

        db.selectTicketByStatus(session, query, (err, ticket) => {
            if (err) return res.status(500).send('Error on the server.');

            res.status(200).send(ticket);
        });
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