const bookModel = require('../models/bookModel');

exports.getBooks = async (req, res) => {
  try {
    const books = await bookModel.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getBook = async (req, res) => {
  try {
    const [book] = await bookModel.getBookById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.createBook = async (req, res) => {
  try {
    const newBook = await bookModel.createBook(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await bookModel.updateBook(req.params.id, req.body);
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const result = await bookModel.deleteBook(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
