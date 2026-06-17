const express = require('express');
const cors = require('cors');
const path = require('path');
const mainRouter = require('./routes');
const globalErrorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'outputs' directory
app.use('/downloads', express.static(path.join(__dirname, 'outputs')));

// API Routes
app.use('/api', mainRouter);

// Global Error Handling Middleware
app.use(globalErrorHandler);

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is up and running!'
    });
});

module.exports = app;