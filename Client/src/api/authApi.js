import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/v1';

const authApi = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // Include cookies in requests
});

export const loginAdmin = (email, password) =>
  authApi.post('/users/login', { email, password });

export const logoutAdmin = () =>
  authApi.post('/users/logout');

export const verifyAuth = () =>
  authApi.get('/users/verify');

export const getAdminUsers = () =>
  authApi.get('/users');

export const createAdminUser = (data) =>
  authApi.post('/users', data);

export const deleteUser = (id) =>
  authApi.delete(`/users/${id}`);

export default authApi;