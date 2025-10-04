import api from "./axios"

export  const registerUser =(userData)=> api.post("/user/register",userData);

export const loginUser = (userData) => api.post("/user/login",userData)