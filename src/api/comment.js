import axios from "./axios";

// Add a new comment to an idea
export const addComment = async (ideaId, text) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `/comment/${ideaId}`,
    { text },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Get all comments for an idea
export const getCommentsByIdea = async (ideaId) => {
  const response = await axios.get(`/comment/${ideaId}`);
  return response.data;
};

// Update a comment by ID
export const updateComment = async (commentId, text) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `/comment/${commentId}`,
    { text },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Delete a comment by ID
export const deleteComment = async (commentId) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`/comment/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
