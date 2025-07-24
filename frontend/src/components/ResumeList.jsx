import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);

  const quotes = [
    "Your resume is your first impression—make it count.",
    "Success is where preparation and opportunity meet.",
    "Every great career begins with a single resume.",
    "Opportunities don't happen. You create them.",
    "Believe in yourself and your resume will speak volumes.",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/api/resumes/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setResumes(response.data);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    fetchResumes();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-6 py-10 relative"
      style={{
        backgroundImage: "url('/bg.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/60 via-blue-400/50 to-pink-300/50 z-0" />

      {/* ✨ Quote OUTSIDE the box */}
      <motion.div
        className="relative z-10 bg-gradient-to-r from-yellow-100 via-red-100 to-pink-100 text-gray-800 p-5 rounded-xl mb-8 shadow-lg text-center max-w-3xl w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <p className="text-lg font-medium italic">💬 {randomQuote}</p>
      </motion.div>

      {/* Resume List Box */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-3xl w-full border border-gray-300"
      >
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-8">
          🧾 Uploaded Resumes
        </h2>

        {resumes.length === 0 ? (
          <p className="text-center text-gray-600">No resumes uploaded yet.</p>
        ) : (
          <ul className="grid gap-6">
            {resumes.map((resume, i) => (
              <motion.li
                key={resume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 rounded-xl shadow-xl bg-gradient-to-r from-indigo-200 via-sky-200 to-teal-200 hover:scale-105 transition-transform duration-300"
              >
                <FiFileText className="text-indigo-700 text-2xl" />
                <a
                  href={resume.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-gray-800 hover:underline break-all"
                >
                  {resume.file_name || resume.file.split("/").pop()}
                </a>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
};

export default ResumeList;
