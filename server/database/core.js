import * as mysql from 'mysql';
import Promise from 'bluebird';

Promise.promisifyAll(mysql.createConnection.prototype);
Promise.promisifyAll(mysql.createPool.prototype);

class Core {
    constructor(host, user, password, database, port) {
        this.pool = mysql.createPool({
            host: host,
            user: user,
            password: password,
            database: database,
            port: port,
            connectionLimit: 1000
        });
        this.pool.on('connection', function(connection) {
            connection.on('enqueue', function(sequence) {
                if (sequence.constructor.name === 'Query') {
                    // if logging, then log or console.log
                }
            });
        });
    }
    execute(sql) {
        return new Promise(async (resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                connection.query(sql, (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                    connection.release();
                });
            });
        }).catch((err) => {
            return err;
        });
    }
}

export { Core };