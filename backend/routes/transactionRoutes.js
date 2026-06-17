const express = require('express');
const transactionController = require('../controllers/transactionController');
const upload = require('../middlewares/fileUpload');
const validationController = require('../controllers/validationController');

const router = express.Router();

// POST /api/transactions/upload
router.post('/upload', upload.single('file'), transactionController.uploadFile);

// POST /api/transactions/validate
router.post('/validate', upload.single('file'), validationController.validateFile);

module.exports = router;
