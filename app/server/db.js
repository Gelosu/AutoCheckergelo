const mysql2 = require('mysql2/promise');
const host = "127.0.0.1"

const connection = mysql2.createConnection({
    host: host,
    user: 'root',
    password: 'Amine2019',
    database: 'account',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

});

connection.getConnection()
.then((connection) => {
  console.log('Connected to MySQL database.');
  connection.release(); // Release the connection to the pool after testing
})
.catch((err) => {
  console.error('Error connecting:', err);
});
  

module.exports = connection;
