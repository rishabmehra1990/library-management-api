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
