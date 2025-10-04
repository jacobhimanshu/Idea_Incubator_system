import api from './axios';
import axios from './axios'; 

// Toggle Upvote API
export const toggleUpvote = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `/idea/${id}/upvote`,
    {}, // कोई body नहीं भेजनी
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

