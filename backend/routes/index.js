const express = require('express');
const transactionRoutes = require('./transactionRoutes');
const downloadController = require('../controllers/downloadController');

const router = express.Router();

router.use('/transactions', transactionRoutes);

// GET /api/download/:session - List all files for a session
router.get('/download/:session', downloadController.listFiles);

// GET /api/download/:session/:filename - Download a specific file
router.get('/download/:session/:filename', downloadController.downloadFile);

module.exports = router;
