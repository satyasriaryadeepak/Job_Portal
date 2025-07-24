import React, { useState } from 'react';
import API from '../api/api';
import { FiUploadCloud } from 'react-icons/fi';

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setUploading(true);
    setError("");
    setSkills([]);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await API.post('resumes/upload/', formData);
      setSkills(res.data.skills);
    } catch (err) {
      setError("❌ Failed to upload resume. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center"
      style={{ backgroundImage: "url('/up3.jpg')" }} // 👈 Make sure bg.jpg is in public/
    >
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl p-10 max-w-lg w-full backdrop-blur-md border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">📄 Upload Your Resume</h2>

        <div className="flex flex-col items-center gap-4 mb-6">
          <label className="flex flex-col items-center px-6 py-4 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer w-full text-center hover:border-blue-500 transition">
            <FiUploadCloud size={32} className="text-blue-600 mb-2" />
            <span className="text-gray-700">{file ? file.name : "Choose a file to upload"}</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          <button
            className={`w-full py-3 rounded-xl font-semibold text-white transition ${
              uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Resume"}
          </button>
        </div>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {skills.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-xl mt-4 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">✅ Extracted Skills</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeUpload;
