
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getIdeaById } from "../api/idea";
import {
  addComment,
  getCommentsByIdea,
  updateComment,
  deleteComment,
} from "../api/comment";
import CollabForm from "../component/CollabForm"; 

import {jwtDecode} from "jwt-decode";

const IdeaDetails = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Get logged-in user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUser(decoded);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  // Fetch idea + comments
  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const data = await getIdeaById(id);
        setIdea(data.idea);
      } catch (err) {
        console.error("Error fetching idea details:", err);
      }
    };

    const fetchComments = async () => {
      try {
        const data = await getCommentsByIdea(id);
        setComments(data.comments || []);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchIdea();
    fetchComments();
  }, [id]);

  // Add Comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const data = await addComment(id, newComment);
      setComments((prev) => [...prev, data.comment]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  // Update Comment
  const handleUpdateComment = async (commentId) => {
    try {
      await updateComment(commentId, editingText);
      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? { ...c, text: editingText } : c))
      );
      setEditingCommentId(null);
      setEditingText("");
    } catch (err) {
      console.error("Error updating comment:", err);
    }
  };

  // Delete Comment
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  // Edit Comment
  const handleEditComment = (comment) => {
    setEditingCommentId(comment._id);
    setEditingText(comment.text);
  };

  if (!idea)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg font-medium">
        Loading...
      </p>
    );

  return (   
    <div className="min-h-screen bg-indigo-200 p-6">
  {/* <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-6"></div> */}


    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-xl rounded-3xl mt-10">
      {/* Idea Details */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
        {/* <h2 className="text-2xl font-extrabold text-indigo-600 mb-2">Title:{idea.title}</h2> */}
       < h2 className="text-2xl font-extrabold mb-2">
  <span className="text-black">Title:</span>{" "}
  <span className="text-indigo-600">{idea.title}</span>
</h2>
        <p className="text-sm text-gray-700 mb-4">
          By : <span className="font-medium">{idea.author?.name || "Anonymous"}</span>{" "}
          ({idea.author?.email || "No email"}) |{" "}
          {new Date(idea.createdAt).toLocaleDateString()}
        </p>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Short Description</h3>
          <p className="text-gray-600">{idea.shortDescription || "No short description available"}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Full Description</h3>
          <p className="text-gray-600">{idea.fullDescription || "No full description available"}</p>
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={() => navigate(`/edit/${idea._id}`)}
            className="px-5 py-2 bg-yellow-500 text-white font-medium rounded-xl hover:bg-yellow-600 transition-colors"
          >
            Edit Idea
          </button>
          <button
            onClick={() => navigate("/my-collab-requests")}
            className="px-5 py-2 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
          >
            View My Collab Requests
          </button>
        </div>

        {/* Collab Form */}
        <div className="mt-6">
          <CollabForm ideaId={idea._id} receiverId={idea.author._id} />
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">💬 Comments</h3>

        {currentUser ? (
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="border border-gray-300 p-3 flex-1 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleAddComment}
              className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
            >
              Add
            </button>
          </div>
        ) : (
          <p className="text-gray-500 mb-4">Please login to add a comment.</p>
        )}

        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment._id}
              className="p-4 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {editingCommentId === comment._id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="border border-gray-300 p-2 flex-1 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        onClick={() => handleUpdateComment(comment._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingCommentId(null)}
                        className="px-3 py-1 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-800 mb-1">{comment.text}</p>
                      <p className="text-xs text-gray-400">By: {comment.author?.name || "User"}</p>
                    </>
                  )}
                </div>

                {currentUser &&
                  (currentUser.id === comment.author?._id ||
                    currentUser._id === comment.author?._id) &&
                  editingCommentId !== comment._id && (
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEditComment(comment)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>

  );
};

export default IdeaDetails;
