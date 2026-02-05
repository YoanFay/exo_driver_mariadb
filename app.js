import mariadb from "mariadb";
import {loadEnvFile} from 'node:process'

loadEnvFile('./.env');

const connectionPool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.CONNECTION_LIMIT_AMOUNT
});

let connection;

try{
    connection = await connectionPool.getConnection();
    const rows = await connection.query("SELECT * FROM etudiant")
    console.log(rows)
}
catch(error){
    console.log(error)
}

connectionPool.end();