const validator = require('validator');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const appConfig = require('../config/appConfig');
const countryRules = require('../config/countryRules.json');

dayjs.extend(customParseFormat);

// --- Reusable Validation Functions ---

const isRequired = (value) => value && value.trim() !== '';
const isPositiveInteger = (value) => validator.isInt(String(value), { gt: 0 });
const isPositiveNumber = (value) => validator.isFloat(String(value), { gt: 0 });
const isValidDate = (date) => dayjs(date, 'YYYY-MM-DD', true).isValid();
const isValidTime = (time) => dayjs(time, 'HH:mm:ss', true).isValid();
const isValidCountry = (country) => Object.keys(countryRules).includes(country);

const isValidPhone = (phone, country) => {
    if (!isValidCountry(country) || !phone) return false;
    const expectedLength = countryRules[country];
    return validator.isMobilePhone(String(phone), 'any', { strictMode: false }) && phone.length === expectedLength;
};

const isValidPaymentMode = (mode) => appConfig.paymentMethods.includes(mode);

// --- Validation Schema ---

const validationSchema = {
    'Order ID': [
        { validate: isRequired, message: 'Order ID is required.' }
    ],
    'Customer Name': [
        { validate: isRequired, message: 'Customer Name is required.' }
    ],
    'Customer Phone': [
        { validate: (value, row) => isValidPhone(value, row.Country), message: 'Invalid phone number for the specified country.' }
    ],
    'Country': [
        { validate: isValidCountry, message: 'Invalid or unsupported country.' }
    ],
    'Order Date': [
        { validate: isValidDate, message: 'Invalid date format. Expected YYYY-MM-DD.' }
    ],
    'Order Time': [
        { validate: isValidTime, message: 'Invalid time format. Expected HH:mm:ss.' }
    ],
    'Product ID': [
        { validate: isRequired, message: 'Product ID is required.' }
    ],
    'Product Name': [
        { validate: isRequired, message: 'Product Name is required.' }
    ],
    'Quantity': [
        { validate: isPositiveInteger, message: 'Quantity must be a positive integer.' }
    ],
    'Price': [
        { validate: isPositiveNumber, message: 'Price must be a positive number.' }
    ],
    'Payment Mode': [
        { validate: isValidPaymentMode, message: 'Invalid payment mode.' }
    ],
    'Transaction ID': [
        { validate: isRequired, message: 'Transaction ID is required.' }
    ]
};

module.exports = {
    validationSchema,
    // Exporting individual functions for potential reuse or testing
    isRequired,
    isPositiveInteger,
    isPositiveNumber,
    isValidDate,
    isValidTime,
    isValidCountry,
    isValidPhone,
    isValidPaymentMode
};
