// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api",  // proxy se backend connect hoga
  withCredentials: true, // taaki cookies (jwt token) bheji jaa sake
  
});
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
export default api;
