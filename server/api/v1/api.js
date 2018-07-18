import express        from 'express';
import { isDefined }  from '../APIController';
import * as JWT       from 'jsonwebtoken';

// Import API endpoint handlers
import users          from './users';
import passwordreset  from './passwordreset';
import token          from './token';

// Instantiate express's router
const api = express.Router();

// Middleware to automatically set the content type header
api.use((req, res, next) => {
    res.header('Content-Type', 'application/json');
    next();
});

// Assign API endpoint handlers
api.use('/users', users);
api.use('/passwordreset', passwordreset);
api.use('/token', token);

api.get('/protected', (req, res) => {
    if (!isDefined(req.query.jwt)) {
        return res.send({ err: "No JWT" });
    }
    JWT.verify(req.query.jwt, 'secret_key', (err, decoded) => {
        if (err) { return res.send({ err }); }
        return res.send({ token: decoded });
    });
});

// Catch all for any endpoints that aren't already caught
api.get('*', (req, res) => {
    res.send({
        err: "Invalid endpoint"
    });
});

export default api;