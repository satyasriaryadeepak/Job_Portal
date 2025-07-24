import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FiUser, FiLock } from "react-icons/fi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.detail || "Unknown error"));
    }
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: "url('/register.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

      {/* Caption / Heading */}
      <div className="absolute top-10 z-20 text-center text-white animate-fade-in-down">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">
          One Login, Unlimited Opportunities
        </h1>
        <p className="mt-2 text-lg text-gray-200">
          Enter your credentials and find your dream job today.
        </p>
      </div>

      {/* Login Box */}
      <div className="relative z-30 flex items-center justify-center h-full">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-96 max-w-full text-white animate-fade-in-up border border-white/20">
          <h2 className="text-3xl font-bold mb-6 text-center tracking-wide">
            Welcome Back
          </h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <FiUser className="absolute left-3 top-3.5 text-white/70" />
              <input
                type="text"
                placeholder="Username"
                className="w-full py-2.5 pl-10 pr-4 rounded-lg bg-white/20 focus:bg-white/30 placeholder-white/70 text-white outline-none border border-white/30 focus:ring-2 focus:ring-violet-400 transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-white/70" />
              <input
                type="password"
                placeholder="Password"
                className="w-full py-2.5 pl-10 pr-4 rounded-lg bg-white/20 focus:bg-white/30 placeholder-white/70 text-white outline-none border border-white/30 focus:ring-2 focus:ring-violet-400 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Login Button - Gradient */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 via-indigo-500 to-white text-gray-900 py-2.5 rounded-xl font-semibold shadow-lg transform transition duration-300 hover:scale-105 hover:from-purple-700 hover:via-indigo-600 hover:to-white"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-5 text-center text-sm text-gray-300">
            New here?{" "}
            <Link to="/register" className="text-cyan-200 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Footer - Contact / Help */}
      <footer className="absolute bottom-4 w-full text-center text-white z-20 animate-fade-in-up">
        <p className="text-sm text-gray-300">
          Need help?{" "}
          <a href="#contact" className="text-blue-200 underline">
            Contact Us
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Login;
