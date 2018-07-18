import { createHash } from 'crypto';

const JWT_SETTINGS = {
    key: 'plaintext',
    expiresIn: '30m'
}

let hash = (plaintext) => {
    return createHash('sha512').update(plaintext).digest('hex');    
}

export { JWT_SETTINGS, hash };