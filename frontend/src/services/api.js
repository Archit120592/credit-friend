import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// Companies
export const companyAPI = {
  getAll: (params) => api.get('/company', { params }),
  getById: (id) => api.get(`/company/${id}`),
  create: (data) => api.post('/company', data),
  update: (id, data) => api.put(`/company/${id}`, data),
  delete: (id) => api.delete(`/company/${id}`),
  uploadDocument: (id, formData) =>
    api.post(`/company/${id}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

// Reports
export const reportAPI = {
  getAll: (params) => api.get('/report', { params }),
  getById: (id) => api.get(`/report/${id}`),
  generate: (data) => api.post('/report/generate', data),
  update: (id, data) => api.put(`/report/${id}`, data),
  delete: (id) => api.delete(`/report/${id}`),
};

// Admin
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: () => api.get('/admin/users'),
  createUser: (data) => api.post('/admin/users', data),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getLogic: () => api.get('/admin/logic'),
  createLogic: (data) => api.post('/admin/logic', data),
};

// Academy
export const academyAPI = {
  getData: () => api.get('/academy'),
  getProgress: () => api.get('/academy/progress'),
  completeLesson: (data) => api.post('/academy/complete-lesson', data),
  submitQuiz: (data) => api.post('/academy/submit-quiz', data),
};

export default api;
