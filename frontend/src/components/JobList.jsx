import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { motion } from 'framer-motion';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await API.get('jobs/');
      setJobs(res.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const quote = "Find the job that sets your soul on fire. 🔥";

  return (
    <div
      className="min-h-screen px-6 py-10 flex flex-col items-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/bg.jpg')" }} // ✅ Make sure bg.jpg exists in public folder
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/70 via-indigo-600/50 to-sky-400/40 z-0" />

      {/* Quote */}
      <motion.div
        className="relative z-10 text-center mb-8 bg-blue-200/80 text-blue-900 p-4 rounded-xl shadow-lg max-w-2xl w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl font-medium italic">💬 {quote}</h2>
      </motion.div>

      {/* Job Listings */}
      <motion.div
        className="relative z-10 w-full max-w-4xl bg-blue-100/80 p-6 rounded-3xl backdrop-blur-md shadow-xl border border-blue-300"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Available Jobs</h2>

        {jobs.length === 0 ? (
          <p className="text-blue-900 text-center">No jobs available.</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                className="bg-blue-50 text-blue-900 border border-blue-300 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                <p className="mb-3">{job.description}</p>
                <p className="text-sm font-medium text-blue-800">
                  🛠 Required Skills: <span className="font-normal">{job.skills_required}</span>
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default JobList;
