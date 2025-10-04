import React, { useState } from "react";
import { sendCollabRequest } from "../api/collaboration";

const CollabForm = ({ ideaId, receiverId }) => {
  const [message, setMessage] = useState("");

  const handleSendCollab = async () => {
    console.log("DEBUG:", { ideaId, receiverId, message }); 
    try {
      const data = await sendCollabRequest(ideaId, receiverId, message);
      alert("ok sent" + data.message);
      setMessage("");
    } catch (err) {
      console.error("Error sending collab request:", err);
      alert("Failed to send request");
    }
  };

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="text-lg font-bold">Collaborate</h3>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your collaboration message..."
        className="border p-2 w-full rounded-lg mt-2"
      />
      <button
        onClick={handleSendCollab}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg"
      >
        Send Collaboration Request
      </button>
    </div>
  );
};

export default CollabForm;
