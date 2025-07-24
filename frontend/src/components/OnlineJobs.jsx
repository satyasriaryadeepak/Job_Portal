import React, { useEffect, useState } from 'react';
import API from '../api/api';

function OnlineJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await API.get('online-jobs/');
      setJobs(res.data.results || []);
    } catch (err) {
      console.error("Failed to fetch online jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6 flex justify-center">
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-amber-400">Latest Online Jobs (Adzuna)</h2>

        {loading ? (
          <p className="text-center text-lg text-gray-300">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-lg text-rose-400">No jobs found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job, idx) => (
              <div
                key={idx}
                className="bg-neutral-800 border border-neutral-700 p-6 rounded-xl shadow hover:shadow-amber-400/30 transition hover:scale-[1.01]"
              >
                <h3 className="text-xl font-bold text-amber-300 mb-1">{job.title}</h3>
                <p className="text-sm text-neutral-300 mb-2 italic">
                  {job.company} — {job.location}
                </p>
                <p className="text-neutral-200 text-sm mb-3">
                  {job.description?.slice(0, 160)}...
                </p>
                <a
                  href={job.redirect_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-emerald-500 text-black rounded hover:bg-emerald-400 transition"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OnlineJobs;
