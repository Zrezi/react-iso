import express from 'express';
import pool from '../APIController';
const api = express.Router();

function _isDefined(o) { return (typeof o !== 'undefined') }

api.get('/users', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return;
        }
        let sql = 'SELECT * FROM users WHERE 1';
        conn.query(sql, [], (err, results) => {
            conn.release();
            if (err) {
                console.log(err);
                return;
            }
            res.send(results);
        })
    })
});

api.get('/user/:id', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return;
        }
        let sql = `SELECT * FROM users WHERE id=${req.params.id}`;
        conn.query(sql, (err, results) => {
            conn.release();
            if (err) {
                console.log(err);
                return;
            }
            res.send(results);
        });
    });
});

api.post('/user', (req, res) => {
    let query = req.query;
    if (!_isDefined(query.username)) {
        return res.send({ error: "No username" });
    }
    if (!_isDefined(query.email)) {
        return res.send({ error: "No email" });
    }
    if (!_isDefined(query.password)) {
        return res.send({ error: "No password" });
    }
    if (!_isDefined(query.passwordConfirmation)) {
        return res.send({ error: "No passwordConfirmation" });
    }
    pool.getConnection((err, conn) => {
        if (err) {
            return;
        }
        //let sql = `INSERT INTO users (username, email, password) VALUES (${query.username}, ${query.email}, ${query.password})`;
        let sql = `INSERT INTO users (name) VALUES ('${query.username}')`;
        conn.query(sql, (err, results) => {
            conn.release();
            if (err) {
                console.log(err);
                return res.send({ error: "Invalid..." });
            }
            return res.send(results);
        });
    });
});

export default api;