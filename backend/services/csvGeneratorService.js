const { Parser } = require('json2csv');
const fs = require('fs').promises;
const path = require('path');
const appConfig = require('../config/appConfig');

/**
 * Generates one or more CSV files from an array of data, splitting into chunks if necessary.
 * @param {string} baseFilename - The base name for the output file (e.g., 'cleaned.csv').
 * @param {Array<object>} data - The array of objects to convert to CSV.
 * @param {string} sessionIdentifier - A unique identifier for the session.
 * @returns {Promise<Array<string>>} A promise that resolves with an array of generated filenames.
 */
const generateCsv = async (baseFilename, data, sessionIdentifier) => {
    if (!data) data = [];

    const outputDir = path.join(appConfig.outputs.path, sessionIdentifier);
    await fs.mkdir(outputDir, { recursive: true });

    const chunkSize = appConfig.csv.chunkSize;
    const generatedFiles = [];

    // Determine if splitting is needed for the 'cleaned' file
    if (baseFilename === appConfig.outputs.cleaned && data.length > chunkSize) {
        const totalChunks = Math.ceil(data.length / chunkSize);
        for (let i = 0; i < totalChunks; i++) {
            const chunkData = data.slice(i * chunkSize, (i + 1) * chunkSize);
            const chunkFilename = `${appConfig.outputs.chunkPrefix}${i + 1}.csv`;
            const filePath = path.join(outputDir, chunkFilename);
            
            const fields = chunkData.length > 0 ? Object.keys(chunkData[0]) : [];
            const json2csvParser = new Parser({ fields });
            const csv = json2csvParser.parse(chunkData);
            
            await fs.writeFile(filePath, csv);
            generatedFiles.push(chunkFilename);
        }
    } else {
        // For invalid file or cleaned file that doesn't need splitting
        const filePath = path.join(outputDir, baseFilename);
        const fields = data.length > 0 ? Object.keys(data[0]) : [];

        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(data);

        await fs.writeFile(filePath, csv);
        generatedFiles.push(baseFilename);
    }

    return generatedFiles;
};

module.exports = {
    generateCsv
};
