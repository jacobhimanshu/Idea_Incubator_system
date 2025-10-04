import axios from "./axios";

// Send a new collab request
export const sendCollabRequest = async (ideaId, receiverId, message) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "/collab",
      { idea: ideaId, receiver: receiverId, message },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    console.error("Error sending collab request:", err);
    throw err.response?.data || err;
  }
};

// Get my collab requests (sent + received)
export const getMyCollabRequests = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/collab", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // { success, requests }
  } catch (err) {
    console.error("Error fetching collab requests:", err);
    throw err.response?.data || err;
  }
};

// Accept collab request
export const acceptCollabRequest = async (reqId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `/collab/${reqId}/accept`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    console.error("Error accepting request:", err);
    throw err.response?.data || err;
  }
};

// Reject collab request
export const rejectCollabRequest = async (reqId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `/collab/${reqId}/reject`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    console.error("Error rejecting request:", err);
    throw err.response?.data || err;
  }
};
