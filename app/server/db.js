const mysql2 = require('mysql2');
const host = "127.0.0.1"

const connection = mysql2.createConnection({
    host: host,
    user: 'root',
    password: 'Amine2019',
    database: 'account'

});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting:', err);
      return;
    }
    console.log('Connected to MySQL database.');
  });
  

module.exports = connection;
