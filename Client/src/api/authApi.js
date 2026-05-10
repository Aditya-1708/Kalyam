import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

const authApi = axios.create({
  baseURL: `${API_BASE}/api/v1`,
  withCredentials: true,
});

export const loginAdmin = (email, password) =>
  authApi.post("/users/login", { email, password });

export const logoutAdmin = () =>
  authApi.post("/users/logout");

export const verifyAuth = () =>
  authApi.get("/users/verify");

export const getAdminUsers = () =>
  authApi.get("/users");

export const createAdminUser = (data) =>
  authApi.post("/users", data);

export const deleteUser = (id) =>
  authApi.delete(`/users/${id}`);

export default authApi;
