import React, { useEffect, useState } from 'react';
import API from '../api/api';

function MatchOnlineJobs() {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState('');
  const [query, setQuery] = useState('developer');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await API.get('resumes/');
        setResumes(res.data);
      } catch (err) {
        console.error('Failed to fetch resumes', err);
      }
    };
    fetchResumes();
  }, []);

  const handleMatch = async () => {
    setLoading(true);
    try {
      const res = await API.post('match-online-jobs/', {
        resume_id: resumeId,
        query: query,
      });
      setResults(res.data.results || []);
    } catch (err) {
      console.error('Error matching online jobs:', err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-neutral-800 rounded-2xl p-8 shadow-2xl border border-neutral-700">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Match Resume with Online Jobs
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 mb-6">
          <div>
            <label className="block mb-2 font-semibold">Select Resume:</label>
            <select
              value={resumeId}
              onChange={(e) => setResumeId(e.target.value)}
              className="w-full p-3 rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none"
            >
              <option value="">-- Choose Resume --</option>
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.filename || resume.file.split('/').pop()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Job Title / Query:</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Python Developer"
              className="w-full p-3 rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleMatch}
          disabled={!resumeId}
          className={`w-full py-3 rounded text-lg font-semibold transition ${
            resumeId
              ? 'bg-amber-500 text-black hover:bg-amber-400'
              : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
          {loading ? 'Matching...' : 'Match Jobs'}
        </button>

        {results.length > 0 && (
          <div className="mt-10 space-y-6">
            <h3 className="text-2xl font-semibold text-amber-400 text-center">
              Matching Jobs Found
            </h3>
            {results.map((job, idx) => (
              <div
                key={idx}
                className="bg-neutral-700 p-6 rounded-xl border border-neutral-600 shadow hover:scale-[1.01] transition-transform"
              >
                <h4 className="text-xl font-bold text-amber-300">{job.job_title}</h4>
                <p className="text-sm text-neutral-300">{job.company}</p>
                <p className="mt-2 text-sm">
                  Score: <span className="font-bold text-amber-400">{job.score}%</span>
                </p>
                <p className="mt-1 text-sm">Matched Keywords: {job.matched_keywords.join(', ')}</p>
                <p className="mt-1 text-sm text-red-300">Missing Keywords: {job.missing_keywords.join(', ')}</p>
                <a
                  href={job.apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-amber-300 underline hover:text-amber-200"
                >
                  Apply Now →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MatchOnlineJobs;
