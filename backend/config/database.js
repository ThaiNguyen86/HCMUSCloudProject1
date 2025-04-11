const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'project1-taskmanager-db.cv86akkwwra1.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Thai668084',
    database: 'task_manager_db'
});
connection.connect();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;