import api from './axios';
import axios from './axios'; 


export const createIdea = async (ideaData) => {
  const response = await axios.post('/idea/create', ideaData);
  return response.data;
};

// Get all ideas
export const getAllIdeas = async () => {
  const response = await axios.get('/idea/all');
  return response.data;
};

export const getIdeaById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/idea/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update idea by ID
// src/api/idea.js
export const updateIdea = async (id, updatedData) => {
  const token = localStorage.getItem("token");   // auth token
  const response = await axios.put(`/idea/update/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};



// Delete idea by ID
export const deleteIdea = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`/idea/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
