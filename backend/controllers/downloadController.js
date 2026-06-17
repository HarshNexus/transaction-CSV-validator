const path = require('path');
const fs = require('fs');
const AppError = require('../utils/appError');
const appConfig = require('../config/appConfig');

const downloadFile = (req, res, next) => {
    const { session, filename } = req.params;

    if (!session || !filename) {
        return next(new AppError('Invalid download link. Session or filename is missing.', 400));
    }

    // Basic security check to prevent directory traversal attacks
    if (session.includes('..') || filename.includes('..')) {
        return next(new AppError('Invalid file path.', 400));
    }

    const filePath = path.join(appConfig.outputs.path, session, filename);

    if (fs.existsSync(filePath)) {
        res.download(filePath, (err) => {
            if (err) {
                // The error handler will catch this
                next(new AppError('Could not download the file.', 500));
            }
        });
    } else {
        return next(new AppError('File not found.', 404));
    }
};

const listFiles = async (req, res, next) => {
    const { session } = req.params;

    if (!session || session.includes('..')) {
        return next(new AppError('Invalid session identifier.', 400));
    }

    const sessionDir = path.join(appConfig.outputs.path, session);

    try {
        if (!fs.existsSync(sessionDir)) {
            return next(new AppError('No files found for this session.', 404));
        }
        
        const files = await fs.promises.readdir(sessionDir);
        res.status(200).json({
            status: 'success',
            data: {
                session,
                files
            }
        });
    } catch (error) {
        return next(new AppError('Could not retrieve file list.', 500));
    }
};

module.exports = {
    downloadFile,
    listFiles
};
