import React, { useState } from "react";
import { toggleUpvote } from "../api/likes";
import axios from "axios";
const UpvoteButton = ({ ideaId, initialUpvotes }) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);

  const handleUpvote = async () => {
    try {
      const data = await toggleUpvote(ideaId);
      setUpvotes(data.totalUpvotes);
    } catch (err) {
      console.error("Error upvoting:", err.response?.data || err.message);
      alert("Failed to upvote. Maybe you need to login.");
    }
  };

 return (
  <button
    onClick={handleUpvote}
    className="  flex-wrap mt-3 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg shadow-md hover:from-green-600 hover:to-green-700 active:scale-95 transition-transform"
  >
    
    <span className="text-base font-semibold">Like</span>
    <span className="ml-1 text-sm bg-white text-green-600 px-2 py-0.5 rounded-full">
      {upvotes}
    </span>
  </button>
);

};

export default UpvoteButton;
