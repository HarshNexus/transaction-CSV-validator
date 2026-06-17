import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return apiClient.post('/transactions/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const validateCSV = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return apiClient.post('/transactions/validate', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const listFiles = async (sessionId) => {
  return apiClient.get(`/download/${sessionId}`);
};

export const downloadFile = (sessionId, filename) => {
  window.location.href = `${API_BASE}/download/${sessionId}/${filename}`;
};

export default apiClient;
