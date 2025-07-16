const db = require('../config/db');

exports.getAllBooks = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM booksdata', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.getBookById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM booksdata WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.createBook = (book) => {
  const { title, description, originalPrice, price, image } = book;
  const sql = `INSERT INTO booksdata (title, description, originalPrice, price, image) VALUES (?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.query(sql, [title, description, originalPrice, price, image], (err, result) => {
      if (err) return reject(err);
      resolve({ id: result.insertId, ...book });
    });
  });
};

exports.updateBook = (id, book) => {
  const { title, description, originalPrice, price, image } = book;
  const sql = `UPDATE booksdata SET title = ?, description = ?, originalPrice = ?, price = ?, image = ? WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.query(sql, [title, description, originalPrice, price, image, id], (err) => {
      if (err) return reject(err);
      resolve({ id, ...book });
    });
  });
};

exports.deleteBook = (id) => {
  const sql = 'DELETE FROM booksdata WHERE id = ?';
  return new Promise((resolve, reject) => {
    db.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
