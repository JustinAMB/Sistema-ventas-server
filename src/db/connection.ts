import mysql, { Pool } from 'mysql2';




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
pool.getConnection((err, connection) =>{
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to database');
    }
});
export default pool;