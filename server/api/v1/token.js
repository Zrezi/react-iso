import express                 from 'express';
import { DatabaseCore }        from '../APIController';
import { JWT_SETTINGS, hash }  from '../../encryption';
import * as JWT                from 'jsonwebtoken';

// Instantiate express's router
const TokenAPI = express.Router();

// POST ~/api/v1/token
TokenAPI.post('/', async (req, res) => {

    // Make sure that there was a username and password passed in
    if (!(req.query.username)) {
        return res.send({ err: "No username" });
    }
    if (!(req.query.password)) {
        return res.send({ err: "No password" });
    }

    let sql = `
        SELECT id,username,password FROM users
        WHERE (username = '${req.query.username}')
    `;
    let results = await DatabaseCore.execute(sql);

    // Ensure that there was a valid user
    if (results.length != 1) {
        return res.send({
            error: "Invalid credentials"
        });
    }

    // Convert the result object into a basic JavaScript object
    let user = JSON.parse(JSON.stringify(results[0]));

    // Hash the givne password an compare it with the stored password
    if (user.password != hash(req.query.password)) {
        return res.send({
            error: "Invalid password"
        });
    }

    // Delete the password from the object so that it doesn't get tokenized
    delete user.password;

    // Create the JWT
    let token = JWT.sign(user, JWT_SETTINGS.key, {
        expiresIn: JWT_SETTINGS.expiresIn
    });

    // Return the token
    return res.send({ token });
});

export { TokenAPI };