const path = require('path');

const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            status: 'error',
            message: 'No file uploaded. Please upload a CSV file.'
        });
    }

    // For now, we just confirm the upload.
    // In the next steps, we will trigger the validation process from here.
    res.status(201).json({
        status: 'success',
        message: 'File uploaded successfully.',
        data: {
            filename: req.file.filename,
            originalName: req.file.originalname,
            size: req.file.size,
            path: req.file.path
        }
    });
};

module.exports = {
    uploadFile
};
