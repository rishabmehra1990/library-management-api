const db = require('../config/db');

exports.getAllInventory = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM inventory', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.addInventory = (data) => {
    const { book_name, book_id, book_quantity, borrowing_date, return_date, status } = data;
    const sql = `INSERT INTO inventory (book_name, book_id, book_quantity, borrowing_date, return_date, status) VALUES (?, ?, ?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
        db.query(sql, [book_name, book_id, book_quantity, borrowing_date, return_date, status], (err, result) => {
            if (err) return reject(err);
            resolve({ id: result.insertId });
        });
    });
};

exports.deleteInventory = (id) => {
    const sql = 'DELETE FROM inventory WHERE book_id = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.searchInventory = (searchTerm) => {
  const sql = 'SELECT * FROM inventory WHERE book_name LIKE ?';
  return new Promise((resolve, reject) => {
    db.query(sql, [`%${searchTerm}%`], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.getDashboardStats = () => {
  const sql = `
       SELECT 
        SUM(book_quantity) AS totalQuantity,
        COUNT(*) AS totalBooks,
        SUM(CASE WHEN status = 'Inactive' THEN 1 ELSE 0 END) AS availableBooks
      FROM inventory
    `;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
};
