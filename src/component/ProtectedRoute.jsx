

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // localStorage से token check
  const token = localStorage.getItem("token");

  if (!token) {
    // अगर login नहीं है तो redirect
    return <Navigate to="/login" replace />;
  }

  // अगर login है तो children दिखाओ
  return children;
};

export default ProtectedRoute;
