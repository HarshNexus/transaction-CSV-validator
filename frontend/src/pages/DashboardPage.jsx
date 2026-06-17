import React from 'react';

export default function DashboardPage({ onUploadClick }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-5xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Transaction Data Validation Platform
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Upload, validate, and process your transaction CSV files with ease
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-4xl mb-4">📁</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Upload CSV</h3>
            <p className="text-gray-600 text-sm">
              Upload your transaction CSV files for automated validation and processing
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Smart Validation</h3>
            <p className="text-gray-600 text-sm">
              Intelligent validation rules check data integrity, formats, and business logic
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Export Results</h3>
            <p className="text-gray-600 text-sm">
              Download cleaned data, error reports, and automatically split large files
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Get Started Now</h3>
          <button
            onClick={onUploadClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition transform hover:scale-105"
          >
            Upload CSV File →
          </button>
        </div>

        <div className="mt-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
          <h4 className="font-bold text-blue-900 mb-2">What We Validate:</h4>
          <ul className="text-blue-800 text-sm space-y-1 grid grid-cols-1 md:grid-cols-2">
            <li>✓ Required fields and data types</li>
            <li>✓ Date and time formats (YYYY-MM-DD, HH:mm:ss)</li>
            <li>✓ Phone numbers by country</li>
            <li>✓ Payment modes (Cash, UPI, Card, etc.)</li>
            <li>✓ Positive quantities and prices</li>
            <li>✓ Duplicate Order and Transaction IDs</li>
            <li>✓ Valid country codes</li>
            <li>✓ Invalid characters and data integrity</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
