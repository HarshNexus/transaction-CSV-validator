import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { validateCSV } from '../services/api';

export default function UploadPage({ onValidationComplete }) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        toast.error('Please select a CSV file');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    setIsLoading(true);
    try {
      const response = await validateCSV(file);
      toast.success('Validation completed successfully!');
      onValidationComplete(response.data.data);
    } catch (error) {
      const message = error.response?.data?.message || 'Validation failed. Please try again.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload CSV File</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
              disabled={isLoading}
            />
            <label htmlFor="fileInput" className="cursor-pointer">
              <div className="text-gray-600">
                <p className="text-lg font-semibold">Drag and drop your CSV file here</p>
                <p className="text-sm text-gray-500 mt-2">or click to browse</p>
              </div>
            </label>
          </div>

          {file && (
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <p className="text-blue-800">
                <span className="font-semibold">Selected file:</span> {file.name}
              </p>
              <p className="text-sm text-blue-600 mt-1">
                Size: {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={!file || isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition"
          >
            {isLoading ? 'Processing...' : 'Upload and Validate'}
          </button>
        </form>
      </div>
    </div>
  );
}
