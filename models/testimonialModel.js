const db = require('../config/testimonialsDb');

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM testimonialdata', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.getById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM testimonialdata WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

exports.create = ({ name, description, image, rating }) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO testimonialdata (name, description, image, rating) VALUES (?, ?, ?, ?)`;
    db.query(sql, [name, description, image, rating], (err, result) => {
      if (err) return reject(err);
      resolve({ id: result.insertId, name, description, image, rating });
    });
  });
};

exports.update = (id, { name, description, image, rating }) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE testimonialdata SET name = ?, description = ?, image = ?, rating = ? WHERE id = ?`;
    db.query(sql, [name, description, image, rating, id], (err) => {
      if (err) return reject(err);
      resolve({ id, name, description, image, rating });
    });
  });
};

exports.remove = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM testimonialdata WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
