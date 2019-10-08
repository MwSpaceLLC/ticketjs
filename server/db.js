"use strict";
const sqlite3 = require('sqlite3').verbose();

class Db {
    constructor(file) {
        this.db = new sqlite3.Database(file);
        this.dropTable()
        this.createTable()
    }

    createTable() {
        var sql = `
            CREATE TABLE IF NOT EXISTS user (
                id integer PRIMARY KEY, 
                email text UNIQUE, 
                password text)`
        return this.db.run(sql);
    }

    dropTable() {
        var sql = "DROP TABLE IF EXISTS user";
        return this.db.run(sql);
    }

    selectByEmail(email, callback) {
        return this.db.get(
            `SELECT * FROM user WHERE email = ?`,
            [email],function(err,row){
                callback(err,row)
            })
    }

    insertAdmin(user, callback) {
        return this.db.run(
            'INSERT INTO user (name,email,user_pass,is_admin) VALUES (?,?,?,?)',
            user, (err) => {
                callback(err)
            })
    }

    selectAll(callback) {
        return this.db.all(`SELECT * FROM user`, function(err,rows){
            callback(err,rows)
        })
    }

    insert(user, callback) {
        return this.db.run(
            'INSERT INTO user (name,email,user_pass) VALUES (?,?,?)',
            user, (err) => {
                callback(err)
            })
    }
}

module.exports = Db;