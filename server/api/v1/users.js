import express from 'express';
import { DatabaseCore } from '../APIController';
import { hash } from '../../encryption';
const api = express.Router();

// Get all users
api.get('/', async (req, res) => {
    let results = await DatabaseCore.execute(`SELECT * FROM users WHERE 1`);
    return res.send(results);
});

// Get a specific user by username
api.get('/user/:username', async (req, res) => {
    let results = await DatabaseCore.execute(`SELECT * FROM users WHERE username='${req.params.username}'`);
    return res.send(results);
});

api.post('/', async (req, res) => {
    if (!(req.query.username)) {
        return res.send({ err: "No username" });
    }
    if (!(req.query.email)) {
        return res.send({ err: "No email" });
    }
    if (!(req.query.password)) {
        return res.send({ err: "No password" });
    }
    if (!(req.query.passwordConfirmation)) {
        return res.send({ err: "No passwordConfirmation" });
    }
    /*pool.getConnection((err, conn) => {
        if (err) { return res.send({ err }); }
        let sql = `
            INSERT INTO users
            (username, email, password)
            VALUES
            ('${req.query.username}', '${req.query.email}', '${hash(req.query.password)}')
        `;
        query({
            connection: conn,
            sql: sql,
            success: (results) => {
                return res.send(results);
            },
            error: (err) => {
                return res.send(err);
            }
        });
    });*/
});

api.get('*', (req, res) => {
    res.send({ err: "That path is not specified" });
});

export default api;