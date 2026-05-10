import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

const medicineApi = axios.create({
  baseURL: `${API_BASE}/api/v1`,
  withCredentials: true,
});


export const getMedicines = (params) => medicineApi.get('/meds', { params });

export const createMedicine = (data) => medicineApi.post('/meds', data);

export const updateMedicine = (id, data) => medicineApi.put(`/meds/${id}`, data);

export const deleteMedicine = (id) => medicineApi.delete(`/meds/${id}`);

export default medicineApi;
