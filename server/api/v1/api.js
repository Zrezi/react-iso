import express           from 'express';
import { JWT_SETTINGS }  from '../../encryption';
import * as JWT          from 'jsonwebtoken';

// Import API endpoint handlers
import users             from './users';
import passwordreset     from './passwordreset';
import { TokenAPI }      from './token';

// Instantiate express's router
const api = express.Router();

// Assign API endpoint handlers
api.use('/users', users);
api.use('/passwordreset', passwordreset);
api.use('/token', TokenAPI);

// Middleware to automatically set the content type header
api.use((req, res, next) => {
    res.header('Content-Type', 'application/json');
    next();
});

// Middleware to parse the JWT from the authorization header
api.use((req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) return next();
    token = token.replace('Bearer ', '');
    JWT.verify(token, JWT_SETTINGS.key, (error, user) => {
        if (error) {
            return res.status(401).json({ error });
        } else {
            req.user = user;
            next();
        }
    });
});

api.get('/protected', (req, res) => {
    if (!req.user) return res.status(401).json({
        error: {
            name: "missing_token",
            message: "This endpoint requires authentication"
        }
    });
    return res.send({message: "Success!!!!"});
});

// Catch all for any endpoints that aren't already caught
api.get('*', (req, res) => {
    res.status(400).json({
        error: {
            name: 'invalid_request',
            message: `Endpoint '${req.baseUrl}${req.path}' is invalid`
        }
    });
});

export default api;