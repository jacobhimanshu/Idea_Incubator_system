import React, { useEffect, useState } from "react";
import {
  getMyCollabRequests,
  acceptCollabRequest,
  rejectCollabRequest,
} from "../api/collaboration";

const MyCollabRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState({});

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await getMyCollabRequests();
      setRequests(data.request || []);
    } catch (err) {
      console.error("Error fetching collab requests:", err);
      alert(
        err.response?.data?.message || "Failed to load collaboration requests"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (reqId) => {
    if (!window.confirm("Accept this collaboration request?")) return;
    try {
      setProcessing((prev) => ({ ...prev, [reqId]: true }));
      await acceptCollabRequest(reqId);
      await fetchRequests();
    } catch (err) {
      console.error("Error accepting:", err);
      alert(err.response?.data?.message || "Failed to accept request");
    } finally {
      setProcessing((prev) => ({ ...prev, [reqId]: false }));
    }
  };

  const handleReject = async (reqId) => {
    if (!window.confirm("Reject this collaboration request?")) return;
    try {
      setProcessing((prev) => ({ ...prev, [reqId]: true }));
      await rejectCollabRequest(reqId);
      await fetchRequests();
    } catch (err) {
      console.error("Error rejecting:", err);
      alert(err.response?.data?.message || "Failed to reject request");
    } finally {
      setProcessing((prev) => ({ ...prev, [reqId]: false }));
    }
  };

  if (loading)
    return <p className="p-6 text-center text-gray-500">Loading requests...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        📩 Collaboration Requests
      </h2>

      {requests.length === 0 ? (
        <div className="text-center text-gray-500 py-16 bg-gray-50 rounded-lg shadow-md">
          <p className="text-lg">No collaboration requests yet </p>
        </div>
      ) : (
        <ul className="space-y-6">
          {requests.map((r) => (
            <li
              key={r._id}
              className="p-6 border border-gray-200 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-start flex-wrap">
                <div className="w-full sm:w-3/4">
                  <p className="text-lg font-semibold text-gray-700">
                    Idea:{" "}
                    <span className="font-normal">{r.idea?.title || "—"}</span>
                  </p>
                  <p className="text-gray-600 mt-1">
                    From: <span className="font-medium">{r.sender?.name}</span>{" "}
                    ({r.sender?.email})
                  </p>
                  <p className="mt-2 text-gray-700">{r.message}</p>

                  <p className="text-sm mt-3">
                    Status:{" "}
                    <span
                      className={`font-semibold px-3 py-1 rounded-full text-sm ${
                        r.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : r.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {r.status.toUpperCase()}
                    </span>
                  </p>
                </div>

                {r.status === "pending" && (
                  <div className="mt-4 sm:mt-0 flex gap-3 flex-wrap">
                    <button
                      onClick={() => handleAccept(r._id)}
                      disabled={processing[r._id]}
                      className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl font-semibold hover:from-green-500 hover:to-green-700 shadow-md transition-all"
                    >
                      {processing[r._id] ? "Accepting..." : "Accept"}
                    </button>
                    <button
                      onClick={() => handleReject(r._id)}
                      disabled={processing[r._id]}
                      className="px-5 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-xl font-semibold hover:from-red-500 hover:to-red-700 shadow-md transition-all"
                    >
                      {processing[r._id] ? "Rejecting..." : "Reject"}
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCollabRequests;
