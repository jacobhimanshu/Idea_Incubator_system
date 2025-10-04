
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
              // localStorage.setItem("token", res.token);
              //  localStorage.setItem("name", res.user.name);
      // console.log("result of the login", res);

      if (res.data.success) {
        // token और user details पहले save करो
        localStorage.setItem("token", res.data.accesToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("Login successful ");

        // अब navigate करो
        navigate("/");
      } else {
        alert(res.data.message || "Login failed ");
      }
    } catch (error) {
      console.log("Login error:", error);
      alert(error.response?.data?.message || "Something went wrong ");
    }
  };
  return (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6">
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 border border-white/30"
    >
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
        🔑 Login
      </h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 hover:bg-gray-100 transition"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 hover:bg-gray-100 transition"
        required
      />

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        Login
      </button>

      <p className="mt-6 text-center text-gray-700">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="text-purple-600 font-semibold hover:underline hover:text-purple-800 transition"
        >
          Signup
        </button>
      </p>
    </form>
  </div>
);
};

export default Login;
