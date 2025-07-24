import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { motion } from 'framer-motion';

function ResumeMatchAllJobs() {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState('');
  const [results, setResults] = useState([]);
  const [selectedResumeName, setSelectedResumeName] = useState('');

  useEffect(() => {
    const fetchResumes = async () => {
      const res = await API.get('resumes/');
      setResumes(res.data);
    };
    fetchResumes();
  }, []);

  const handleMatchAll = async () => {
    try {
      const selected = resumes.find((r) => r.id.toString() === resumeId);
      setSelectedResumeName(selected?.resume_name || `Resume ${resumeId}`);

      const res = await API.get(`resumes/${resumeId}/match_jobs/`);
      setResults(res.data.results || []);
    } catch (err) {
      console.error('Matching failed', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-500 to-sky-400 text-white px-6 py-10">
      <div className="w-full max-w-4xl bg-blue-950/30 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-blue-300">
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Resume to Job Match Finder 
        </motion.h2>

        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <div className="w-full sm:w-auto">
            <label className="block mb-2 text-blue-100 font-semibold">Select Resume:</label>
            <select
              onChange={(e) => setResumeId(e.target.value)}
              value={resumeId}
              className="bg-blue-800 text-white p-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
            >
              <option value="">-- Choose Resume --</option>
              {resumes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.resume_name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleMatchAll}
            disabled={!resumeId}
            className={`px-6 py-2 rounded font-bold transition-all duration-300 ${
              resumeId
                ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Match Jobs
          </button>
        </div>

        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 space-y-6"
          >
            <h3 className="text-xl font-semibold text-yellow-300 mb-2 text-center">
              Matching Jobs for <span className="text-white underline">{selectedResumeName}</span>
            </h3>
            {results.map((job, index) => (
              <motion.div
                key={index}
                className="bg-blue-800/90 text-white p-6 rounded-xl border border-blue-300 shadow hover:scale-[1.02] transition-transform"
                whileHover={{ scale: 1.01 }}
              >
                <h4 className="text-lg font-bold text-cyan-300">{job.job_title}</h4>
                <p className="text-sm mt-1">
                  🔢 Match Score: <span className="font-bold text-yellow-300">{job.match_score}%</span>
                </p>
                <p className="mt-2 text-sm">
                  🧠 Matched Skills: <span className="text-blue-100">{job.matched_skills.join(', ')}</span>
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ResumeMatchAllJobs;
