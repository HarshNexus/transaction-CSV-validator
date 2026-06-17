const fs = require('fs');
const csv = require('csv-parser');

/**
 * Parses a CSV file from the given file path.
 * @param {string} filePath - The absolute path to the CSV file.
 * @returns {Promise<Array<object>>} A promise that resolves with an array of records from the CSV file.
 * @throws {Error} If the file is not found or if there is a parsing error.
 */
const parseCsv = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];

        if (!fs.existsSync(filePath)) {
            return reject(new Error('File not found at the specified path.'));
        }

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

module.exports = {
    parseCsv
};
