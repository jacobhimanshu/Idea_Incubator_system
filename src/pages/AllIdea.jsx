import React, { useEffect, useState } from "react";
import { getAllIdeas, deleteIdea } from "../api/idea";
import { useNavigate } from "react-router-dom";
import UpvoteButton from "./UpvoteBttn";

const AllIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const navigate = useNavigate();

  const fetchIdeas = async () => {
    try {
      const data = await getAllIdeas();
      setIdeas(data.idea || []);
    } catch (error) {
      console.error("Error fetching ideas:", error);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this idea?")) return;

    try {
      await deleteIdea(id);
      alert("Idea deleted successfully!");
      setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea._id !== id));
    } catch (error) {
      console.error(
        "Error deleting idea:",
        error.response?.data || error.message
      );
      alert("Failed to delete idea");
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-pink-300 to-blue-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-9 text-center  text-gray-800">
        All Ideas
      </h1>

      {ideas.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No ideas yet. Create the first one!
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="bg-white border border-gray-200 rounded-3xl shadow-lg p-6 hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
            >
              <h1 className="font-bold text-gray-700 mb-1">Title:</h1>
              <h2 className="text-xl font-semibold text-blue-600 mb-3 hover:underline cursor-pointer">
                {idea.title}
              </h2>

              <h3 className="text-green-800 text-lg font-semibold mb-1">
                Short Desc:
              </h3>
              <p className="text-gray-700 mb-3">
                {idea.shortDescription || "No short description"}
              </p>

              <p className="text-sm text-gray-500 mb-4">
                By: {idea.author?.name || "Anonymous"}
              </p>

              {/* <div className="flex flex-wrap gap-3 mb-4">
                <button
                  onClick={() => navigate(`/idea/${idea._id}`)}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 shadow-md transition duration-200"
                >
                  View
                </button>
                <button
                  onClick={() => navigate(`/edit/${idea._id}`)}
                  className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 shadow-md transition duration-200"
                  >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(idea._id)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 shadow-md transition duration-200"
                  >
                  Delete
                </button>
              </div> */}
              <div className="flex flex-wrap gap-3 mb-4">
                <button
                  onClick={() => navigate(`/idea/${idea._id}`)}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 shadow-md transition duration-200"
                >
                  View
                </button>

                {/*  Edit button only enabled if logged in */}
                <button
                  onClick={() => navigate(`/edit/${idea._id}`)}
                  disabled={!localStorage.getItem("token")} // 🔹 disable if not logged in
                  className={`flex-1 px-4 py-2 rounded-xl shadow-md transition duration-200 
      ${
        localStorage.getItem("token")
          ? "bg-yellow-500 text-white hover:bg-yellow-600"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
                >
                  Edit
                </button>

                {/* Delete button only enabled if logged in */}
                <button
                  onClick={() => handleDelete(idea._id)}
                  disabled={!localStorage.getItem("token")} // 🔹 disable if not logged in
                  className={`flex-1 px-4 py-2 rounded-xl shadow-md transition duration-200 
      ${
        localStorage.getItem("token")
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
                >
                  Delete
                </button>
              </div>

              <div className="mt-2">
                <UpvoteButton
                  ideaId={idea._id}
                  initialUpvotes={idea.upvotes?.length || 0}
                  token={localStorage.getItem("token")}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllIdeas;
