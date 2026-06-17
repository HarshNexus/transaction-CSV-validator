import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [validationData, setValidationData] = useState(null);

  const handleValidationComplete = (data) => {
    setValidationData(data);
    setCurrentPage('results');
  };

  const handleBackClick = () => {
    setCurrentPage('upload');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main className="container mx-auto">
        {currentPage === 'dashboard' && (
          <DashboardPage onUploadClick={() => setCurrentPage('upload')} />
        )}
        {currentPage === 'upload' && (
          <UploadPage onValidationComplete={handleValidationComplete} />
        )}
        {currentPage === 'results' && validationData && (
          <ResultsPage validationData={validationData} onBackClick={handleBackClick} />
        )}
      </main>
    </div>
  );
}

export default App;
