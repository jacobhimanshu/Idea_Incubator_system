
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createIdea } from "../api/idea";

const Home = () => {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first to create an idea!");
      setLoading(false);
      alert("logout succesfullly");
      navigate("/login");
      return;
    }

    try {
      const newIdea = { title, shortDescription, fullDescription };

      const res = await createIdea(newIdea, token);

      console.log("Created:", res);
      setMessage("Idea created successfully!");
      setTitle("");
      setShortDescription("");
      setFullDescription("");
    } catch (error) {
      console.error("Error creating idea:", error);
      setMessage("Failed to create idea");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-6">
    {/* Glassmorphic Card */}
    <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-10 w-full max-w-lg border border-white/40">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 flex items-center justify-center gap-2">
         
        <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          Create a New Idea
        </span>
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold text-gray-800 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 hover:bg-gray-100 transition"
            placeholder="Enter your idea title..."
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">Short Description</label>
          <input
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 hover:bg-gray-100 transition"
            placeholder="Enter short description..."
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">Full Description</label>
          <textarea
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 hover:bg-gray-100 transition"
            rows="4"
            placeholder="Write your full idea details..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Idea"}
        </button>
      </form>

      {/* Message */}
      {message && (
        <p className="mt-4 text-center font-medium text-gray-700">{message}</p>
      )}

      {/* Buttons */}
      <div className="mt-8 space-y-4">
        <button
          onClick={() => {
            const token = localStorage.getItem("token");
            if (!token) {
              navigate("/login");
            } else {
              navigate("/all-ideas");
            }
          }}
          className="w-full px-4 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Go to All Ideas
        </button>

        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
);

};

export default Home;
