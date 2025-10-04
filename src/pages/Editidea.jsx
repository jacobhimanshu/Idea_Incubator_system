

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Idea } from "../../../backend/src/models/idea.model";

const EditIdea = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [message, setMessage] = useState("");

  // पहले से idea fetch करो
  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const token = localStorage.getItem("token"); // token ले लो
        const res = await axios.get(`/api/idea/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTitle(res.data.title);
        setShortDescription(res.data.shortDescription);
        setFullDescription(res.data.fullDescription);
      } catch (error) {
        console.error("Error fetching idea:", error);
      }
    };
    fetchIdea();
  }, [id]);

  // Update handler
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/idea/update/${id}`,
        { title, shortDescription, fullDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Idea updated successfully!");
      navigate(`/idea/${id}`);
    } catch (error) {
      console.error("Error updating idea:", error);
      setMessage("Failed to update idea");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-200 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Edit Idea
        </h1>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
              placeholder="Enter idea title"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Short Description
            </label>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
              placeholder="Enter short description"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Full Description
            </label>
            <textarea
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
              rows="5"
              placeholder="Enter full description"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 shadow-md transition-all"
            >
              Update
            </button>
           
          </div>
        </form>

        {message && (
          <p className="mt-6 text-center font-medium text-indigo-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default EditIdea;
