const AppError = require('../utils/appError');

const handleMulterError = (err) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        return new AppError('File size is too large. Maximum size is 50MB.', 400);
    }
    return new AppError(err.message, 400);
};

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    let error = { ...err };
    error.message = err.message;

    if (err.name === 'MulterError') {
        error = handleMulterError(err);
    }

    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = globalErrorHandler;
