const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'devugupta@123',
  database: 'books'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database!');
});

module.exports = db;
