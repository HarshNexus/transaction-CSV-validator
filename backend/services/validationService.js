const { validationSchema } = require('../validators/transactionValidators');

/**
 * Validates a single record against the validation schema.
 * @param {object} record - The record to validate.
 * @returns {{isValid: boolean, errors: Array<string>}} An object containing the validation result.
 */
const validateRecord = (record) => {
    const errors = [];
    for (const field in validationSchema) {
        const rules = validationSchema[field];
        const value = record[field];

        for (const rule of rules) {
            if (!rule.validate(value, record)) {
                errors.push(rule.message);
            }
        }
    }
    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Processes a collection of records, separating them into valid and invalid records.
 * @param {Array<object>} records - The array of records to process.
 * @returns {{validRecords: Array<object>, invalidRecords: Array<object>}}
 */
const processTransactions = (records) => {
    const validRecords = [];
    const invalidRecords = [];
    const seenOrderIDs = new Set();
    const seenTransactionIDs = new Set();

    records.forEach(record => {
        const { isValid, errors } = validateRecord(record);
        let recordIsValid = isValid;
        const currentErrors = [...errors];

        // Check for duplicate Order ID
        if (seenOrderIDs.has(record['Order ID'])) {
            currentErrors.push('Duplicate Order ID.');
            recordIsValid = false;
        } else {
            seenOrderIDs.add(record['Order ID']);
        }

        // Check for duplicate Transaction ID
        if (seenTransactionIDs.has(record['Transaction ID'])) {
            currentErrors.push('Duplicate Transaction ID.');
            recordIsValid = false;
        } else {
            seenTransactionIDs.add(record['Transaction ID']);
        }

        if (recordIsValid) {
            validRecords.push(record);
        } else {
            invalidRecords.push({
                ...record,
                'Reason(s)': currentErrors.join('; ')
            });
        }
    });

    return { validRecords, invalidRecords };
};


module.exports = {
    validateRecord,
    processTransactions
};
