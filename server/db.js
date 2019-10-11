"use strict";
const dotenv = require('dotenv').config();
const mysql = require('mysql');

class Db {
    constructor() {
        this.db = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT
        });

        /**
         * Try to connect DB
         */
        this.db.connect(function (err) {
            if (err) {
                return console.error('DATABASE NOT CONNECTED: ' + err.stack);
            }
        });
    }

    selectByEmail(email, callback) {
        return this.db.query('SELECT * FROM users WHERE email = ?', email, (error, results) => {

            if (error) console.log(error);

            return callback(error, results[0]);
        });
    }

    insert(user, callback) {
        return this.db.query('INSERT INTO users (email,password) VALUES (?,?)', user, (error, results) => {
            if (error) console.log(error);

            return callback(error, results);
        });
    }
}

module.exports = Db;