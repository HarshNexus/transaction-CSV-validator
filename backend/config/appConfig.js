const path = require('path');

const config = {
    csv: {
        chunkSize: 10000,
    },
    uploads: {
        path: path.join(__dirname, '../uploads'),
    },
    outputs: {
        path: path.join(__dirname, '../outputs'),
        cleaned: 'cleaned.csv',
        invalid: 'invalid.csv',
        chunkPrefix: 'chunk_',
    },
    paymentMethods: [
        'Cash',
        'UPI',
        'Credit Card',
        'Debit Card',
        'Net Banking'
    ]
};

module.exports = config;