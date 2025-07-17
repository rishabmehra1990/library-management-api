const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/books', bookRoutes);
app.use('/testimonials', testimonialRoutes);

module.exports = app;
