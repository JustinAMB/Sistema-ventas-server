import mysql, { Pool } from 'mysql2';




const pool:Pool=mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'jamb116',
    database: 'localizacioncr',
    insecureAuth: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});