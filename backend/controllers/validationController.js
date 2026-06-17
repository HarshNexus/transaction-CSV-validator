const { parseCsv } = require('../services/csvParserService');
const { processTransactions } = require('../services/validationService');
const { generateCsv } = require('../services/csvGeneratorService');
const path = require('path');
const AppError = require('../utils/appError');
const appConfig = require('../config/appConfig');

const validateFile = async (req, res, next) => {
    try {
        if (!req.file) {
            return next(new AppError('No file found on the request. Please upload a file first.', 400));
        }

        const filePath = req.file.path;
        const records = await parseCsv(filePath);
        const filteredRecords = records.filter(record =>
            Object.values(record).some(value => value != null && String(value).trim() !== '')
        );

        if (!filteredRecords || filteredRecords.length === 0) {
            return res.status(200).json({
                status: 'success',
                message: 'The CSV file is empty or could not be parsed.',
                data: {
                    totalRecords: 0,
                    validRecords: 0,
                    invalidRecords: 0,
                    results: {}
                }
            });
        }

        const startTime = Date.now();
        const { validRecords, invalidRecords } = processTransactions(filteredRecords);
        const processingTime = (Date.now() - startTime) / 1000; // in seconds

        // --- Generate CSV files ---
        const sessionIdentifier = path.basename(req.file.filename, path.extname(req.file.filename));

        const cleanedFiles = await generateCsv(appConfig.outputs.cleaned, validRecords, sessionIdentifier);
        const invalidFiles = await generateCsv(appConfig.outputs.invalid, invalidRecords, sessionIdentifier);

        res.status(200).json({
            status: 'success',
            message: 'Validation completed.',
            data: {
                totalRecords: filteredRecords.length,
                validCount: validRecords.length,
                invalidCount: invalidRecords.length,
                processingTime: `${processingTime}s`,
                session: sessionIdentifier,
                files: {
                    cleaned: cleanedFiles, // This is now an array
                    invalid: invalidFiles[0] // Always a single file
                },
                chunksCreated: cleanedFiles.length > 1 ? cleanedFiles.length : 0
            }
        });

    } catch (error) {
        return next(new AppError(`Validation process failed: ${error.message}`, 500));
    }
};

module.exports = {
    validateFile
};
