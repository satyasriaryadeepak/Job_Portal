// src/components/JobPostForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const JobPostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');

  const quotes = [
    "Hiring is the most important people function you have.",
    "Great vision without great people is irrelevant.",
    "The right person in the right job makes all the difference.",
    "Behind every successful company is a great team.",
    "Good hiring is the key to good business.",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to post a job.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8000/api/jobs/',
        {
          title,
          description,
          skills_required: skillsRequired,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      alert('Job posted successfully!');
      setTitle('');
      setDescription('');
      setSkillsRequired('');
    } catch (error) {
      console.error('Error posting job:', error.response?.data || error.message);
      alert('Failed to post job.');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start px-6 py-10 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/bg.jpg')" }} // ✅ make sure /public/bg.jpg exists
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/70 via-blue-600/50 to-sky-400/40 z-0" />

      {/* Quote */}
      <motion.div
        className="relative z-10 bg-blue-200/80 text-blue-900 p-5 rounded-xl mb-8 shadow-lg text-center max-w-2xl w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-lg font-medium italic">💬 {randomQuote}</p>
      </motion.div>

      {/* Form Card (No White, All Blue) */}
      <motion.div
        className="relative z-10 max-w-xl w-full bg-blue-100/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-blue-300"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          📄 Post a Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-blue-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 bg-blue-50 text-blue-900 placeholder:text-blue-600"
            required
          />
          <textarea
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-blue-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 bg-blue-50 text-blue-900 placeholder:text-blue-600"
            required
            rows={5}
          />
          <input
            type="text"
            placeholder="Skills Required (comma separated)"
            value={skillsRequired}
            onChange={(e) => setSkillsRequired(e.target.value)}
            className="w-full p-3 border border-blue-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 bg-blue-50 text-blue-900 placeholder:text-blue-600"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-md"
          >
             Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default JobPostForm;
