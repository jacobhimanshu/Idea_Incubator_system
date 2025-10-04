
import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      alert(res.data.message || "User registered successfully");
      if (res.data.success) {
        navigate("/login");
      }
      console.log(res.data);
    } catch (err) {
      alert("Error registering", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          Create Account
        </h2>

        <input
          name="name"
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full px-5 py-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
        />
        <input
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full px-5 py-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-5 py-3 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
        />

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-500 transform hover:-translate-y-1 transition duration-300"
        >
          Signup
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline font-medium">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
