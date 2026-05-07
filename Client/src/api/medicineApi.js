import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/v1';

const medicineApi = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // Include cookies in requests
});

export const getMedicines = (params) => medicineApi.get('/meds', { params });

export const createMedicine = (data) => medicineApi.post('/meds', data);

export const updateMedicine = (id, data) => medicineApi.put(`/meds/${id}`, data);

export const deleteMedicine = (id) => medicineApi.delete(`/meds/${id}`);

export const getCategories = () => medicineApi.get('/categories');

export const createCategory = (data) => medicineApi.post('/categories', data);

export const updateCategory = (id, data) => medicineApi.put(`/categories/${id}`, data);

export const deleteCategory = (id) => medicineApi.delete(`/categories/${id}`);

export const getTherapyAreas = () => medicineApi.get('/therapy-areas');

export const createTherapyArea = (data) => medicineApi.post('/therapy-areas', data);

export const updateTherapyArea = (id, data) => medicineApi.put(`/therapy-areas/${id}`, data);

export const deleteTherapyArea = (id) => medicineApi.delete(`/therapy-areas/${id}`);

export default medicineApi;