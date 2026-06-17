import React, { useState, useMemo } from 'react';
import { downloadFile } from '../services/api';

export default function ResultsPage({ validationData, onBackClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const invalidRecords = validationData?.files?.invalid || [];
  
  const filteredRecords = useMemo(() => {
    if (!Array.isArray(invalidRecords)) return [];
    return invalidRecords.filter(record =>
      Object.values(record).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [invalidRecords, searchTerm]);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + itemsPerPage);

  const handleDownload = (filename) => {
    downloadFile(validationData.session, filename);
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <button
        onClick={onBackClick}
        className="mb-6 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        ← Back to Upload
      </button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Records</p>
          <p className="text-3xl font-bold text-gray-800">{validationData.totalRecords}</p>
        </div>
        <div className="bg-green-50 rounded-lg shadow p-6">
          <p className="text-green-700 text-sm">Valid Records</p>
          <p className="text-3xl font-bold text-green-600">{validationData.validCount}</p>
        </div>
        <div className="bg-red-50 rounded-lg shadow p-6">
          <p className="text-red-700 text-sm">Invalid Records</p>
          <p className="text-3xl font-bold text-red-600">{validationData.invalidCount}</p>
        </div>
        <div className="bg-blue-50 rounded-lg shadow p-6">
          <p className="text-blue-700 text-sm">Processing Time</p>
          <p className="text-3xl font-bold text-blue-600">{validationData.processingTime}</p>
        </div>
      </div>

      {validationData.chunksCreated > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
          <p className="text-yellow-800">
            ✓ Valid data split into <span className="font-bold">{validationData.chunksCreated}</span> chunks
          </p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Download Files</h3>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(validationData.files?.cleaned) ? (
            validationData.files.cleaned.map((filename) => (
              <button
                key={filename}
                onClick={() => handleDownload(filename)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                📥 {filename}
              </button>
            ))
          ) : (
            <button
              onClick={() => handleDownload(validationData.files?.cleaned)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              📥 {validationData.files?.cleaned || 'cleaned.csv'}
            </button>
          )}
          {validationData.files?.invalid && (
            <button
              onClick={() => handleDownload(validationData.files.invalid)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              📥 {validationData.files.invalid}
            </button>
          )}
        </div>
      </div>

      {Array.isArray(invalidRecords) && invalidRecords.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Invalid Records</h3>
          
          <input
            type="text"
            placeholder="Search errors..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
          />

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Customer Name</th>
                  <th className="px-4 py-2 text-left">Error(s)</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRecords.map((record, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{record['Order ID']}</td>
                    <td className="px-4 py-2">{record['Customer Name']}</td>
                    <td className="px-4 py-2 text-red-600 text-xs">{record['Reason(s)']}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
