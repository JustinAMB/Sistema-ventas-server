import mysql, { Pool } from 'mysql2/promise';




const pool:Pool=mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'jamb116',
    database: 'puntoventa',
    insecureAuth: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;