"use strict";

var dotenv = require('dotenv').config(),
    mysql = require('mysql'), sql;

class Db {
    constructor() {
        this.db = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
            charset: 'utf8mb4'
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

    getUserBySess(token, callback) {
        return this.db.query('SELECT * FROM users JOIN user_session ON users.id = user_session.user_id WHERE token = ?', token, (error, results) => {
            if (error) console.log(error);
            return callback(error, results);
        });
    }

    setSession(session, callback) {
        return this.db.query('INSERT INTO user_session (user_id,token,ip_address, user_agent) VALUES (?,?,?,?)', session, (error, results) => {
            if (error) console.log(error);
            return callback(error, results);
        });
    }

    selectByEmail(email, callback) {
        return this.db.query('SELECT * FROM users WHERE email = ?', email, (error, results) => {
            if (error) console.log(error);
            return callback(error, results[0]);
        });
    }

    firstIinsert(user, callback) {
        return this.db.query('INSERT INTO users (root,email,password) VALUES (0,?,?)', user, (error, results) => {
            if (error) console.log(error);
            return callback(error, results);
        });
    }

    /**
     * Database with Ticket
     * @status: received / expired / opened / closed / collect
     * @limit: 50
     */
    selectTicketByStatus(user, query, callback) {

        switch (query) {
            case 'opened':
                sql = 'SELECT * FROM tickets WHERE status = ? LIMIT 50';
                break;
            default:
                sql = 'SELECT * FROM tickets WHERE 1 LIMIT 50';
                break;
        }

        this.db.query(sql, query, (error, results) => {
            if (error) console.log(error);
            return callback(error, results);
        });
    }

    insertNewTicket(ticket, callback) {
        return this.db.query('INSERT INTO tickets (user_id,category_id,subject, created, duelimit) VALUES (?,?,?,?,?)', ticket, (error, results) => {
            if (error) console.log(error);
            return callback(error, results);
        });
    }

    /** ===================================================================================== */


    searchCatByDefault(callback) {
        return this.db.query('SELECT * FROM categories WHERE isdefault = 1', null, (error, results) => {
            if (error) console.log(error);
            return callback(error, results[0]);
        });
    }

    getCategory(callback) {
        return this.db.query('SELECT * FROM categories WHERE 1 LIMIT 50', null, (error, results) => {
            if (error) console.log(error);
            return callback(error, results);
        });
    }
}

module.exports = Db;