import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AllIdeas from './pages/AllIdea';
import ProtectedRoute from './component/ProtectedRoute';
import IdeaDetails from './pages/IdeaSingle';
import EditIdea from './pages/Editidea';
import MyCollabRequests from './component/MycollabReq';

const App = () => {
  const isAuth = localStorage.getItem("token"); // token check

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-ideas"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <AllIdeas />
            </ProtectedRoute>
          }
        />

      
      <Route path="/ideas" element={<AllIdeas />} />
      <Route path="/idea/:id" element={<IdeaDetails />} /> 
     <Route path="/edit/:id" element={<EditIdea />} />
     <Route path="/my-collab-requests" element={<MyCollabRequests />} /> 
      </Routes>
  
    </div>
  );
};

export default App;
