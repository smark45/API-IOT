const mysql = require('mysql2');

function connectToDatabase() {
    const connection = mysql.createConnection({
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DB,
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err);
        } else {
            console.log('Conexión exitosa a la base de datos');
        }
    });

    return connection;
}

function executeQuery(query, params) {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

const connection = connectToDatabase();

module.exports = {
    connectToDatabase,
    executeQuery
};













