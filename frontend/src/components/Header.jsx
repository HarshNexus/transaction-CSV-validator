import React from 'react';

export default function Header({ currentPage, onPageChange }) {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Transaction Validation</h1>
          <div className="flex gap-4">
            <button
              onClick={() => onPageChange('dashboard')}
              className={`px-4 py-2 rounded font-medium transition ${
                currentPage === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onPageChange('upload')}
              className={`px-4 py-2 rounded font-medium transition ${
                currentPage === 'upload'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Upload
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
