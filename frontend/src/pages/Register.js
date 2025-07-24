import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiMail } from 'react-icons/fi';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      navigate('/');
    } else {
      setError(data.detail || 'Registration failed.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: "url('/register.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Caption */}
      <div className="absolute top-10 z-20 text-center text-white">
        <h1 className="text-4xl font-bold drop-shadow-lg">“Step Into Opportunity, Build Your Job Seeker Identity Today.”</h1>
        <p className="text-lg mt-2 text-white/80">Create your account & unlock amazing jobs</p>
      </div>

      {/* Form Container */}
      <div className="relative z-20 bg-white/10 backdrop-blur-lg shadow-2xl p-8 rounded-2xl w-full max-w-md text-white animate-fade-in-down mt-20">
        <h2 className="text-3xl font-semibold mb-6 text-center">Create Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <FiUser className="absolute top-3 left-3 text-gray-300" />
            <input
              type="text"
              placeholder="Username"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 placeholder-gray-300 text-white outline-none border border-white/30 focus:ring-2 focus:ring-blue-400 transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-300" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 placeholder-gray-300 text-white outline-none border border-white/30 focus:ring-2 focus:ring-blue-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-300" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 placeholder-gray-300 text-white outline-none border border-white/30 focus:ring-2 focus:ring-blue-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Register Button with Gradient */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 via-indigo-500 to-white text-gray-900 py-2 rounded-lg font-semibold shadow-md transform transition duration-300 hover:scale-105 hover:from-purple-700 hover:via-indigo-600 hover:to-white"
          >
            Register
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <p className="text-red-300 mt-4 text-sm text-center">Error: {error}</p>
        )}

        {/* Login Link */}
        <p className="mt-4 text-sm text-center text-white/80">
          Already have an account?{' '}
          <span
            className="underline cursor-pointer text-blue-300 hover:text-blue-400 transition"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>

        {/* Help / Contact Section */}
        <div className="mt-8 text-center text-white/70 text-sm border-t border-white/20 pt-4">
          <p>Need assistance or facing issues?</p>
          <p>
            <span className="text-blue-300 underline cursor-pointer hover:text-blue-400">
              Contact Support
            </span>{' '}
            or visit our{' '}
            <span className="text-purple-300 underline cursor-pointer hover:text-purple-400">
              Help Center
            </span>
          </p>

          <div className="mt-4">
            <h4 className="text-white font-semibold mb-1">Contact Us</h4>
            <p>Email: <span className="text-blue-200">aryadeepak5703@gmail.com</span></p>
            <p>Phone: <span className="text-blue-200">+91-9347129597</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
