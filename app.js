require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}));

app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/testimonials', testimonialRoutes);

module.exports = app;
