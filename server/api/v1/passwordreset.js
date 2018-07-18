import express from 'express';
import { DatabaseCore } from '../APIController';

// Instantiate express's router
const api = express.Router();

api.post('/', async (req, res) => {
    let results = await DatabaseCore.execute('SELECT * FROM users');
    return res.send({ results });
});

export default api;