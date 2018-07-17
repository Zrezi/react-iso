import mysql from 'mysql'

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node',
    port: '3307'
})

export default pool