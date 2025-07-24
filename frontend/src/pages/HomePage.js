import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFileUpload,
  FaFileAlt,
  FaBriefcase,
  FaSearch,
  FaLink,
  FaGlobe,
  FaExternalLinkAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Upload Resume",
      desc: "Upload your resume to start matching",
      bg: "bg-gradient-to-br from-blue-600 to-blue-800",
      text: "text-white",
      descColor: "text-white/80",
      icon: <FaFileUpload size={24} />,
      link: "/upload",
    },
    {
      title: "View Resumes",
      desc: "Check all resumes you’ve uploaded",
      bg: "bg-gradient-to-br from-green-600 to-green-800",
      text: "text-white",
      descColor: "text-white/80",
      icon: <FaFileAlt size={24} />,
      link: "/resumes",
    },
    {
      title: "Post Job",
      desc: "Post a new job to the portal",
      bg: "bg-gradient-to-br from-purple-600 to-purple-800",
      text: "text-white",
      descColor: "text-white/80",
      icon: <FaBriefcase size={24} />,
      link: "/post-job",
    },
    {
      title: "View Jobs",
      desc: "Browse all job listings",
      bg: "bg-gradient-to-br from-yellow-400 to-yellow-500",
      text: "text-gray-900",
      descColor: "text-gray-800",
      icon: <FaSearch size={24} />,
      link: "/jobs",
    },
    {
      title: "Match Resume to All Jobs",
      desc: "Match your resume to all posted jobs",
      bg: "bg-gradient-to-br from-pink-600 to-pink-800",
      text: "text-white",
      descColor: "text-white/80",
      icon: <FaLink size={24} />,
      link: "/match-resume",
    },
    {
      title: "Match Resume to Online Jobs",
      desc: "Find jobs from external sources",
      bg: "bg-gradient-to-br from-orange-400 to-orange-600",
      text: "text-gray-900",
      descColor: "text-gray-800",
      icon: <FaGlobe size={24} />,
      link: "/match-online-jobs",
    },
    {
      title: "Online Jobs",
      desc: "Explore jobs from Adzuna API",
      bg: "bg-gradient-to-br from-indigo-500 to-indigo-700",
      text: "text-white",
      descColor: "text-white/80",
      icon: <FaExternalLinkAlt size={24} />,
      link: "/online-jobs",
    },
    {
      title: "My Profile",
      desc: "View your profile details",
      bg: "bg-gradient-to-br from-teal-600 to-teal-800",
      text: "text-white",
      descColor: "text-white/80",
      icon: <FaUser size={24} />,
      link: "/profile",
    },
    {
      title: "Logout",
      desc: "Sign out of your account",
      bg: "bg-gradient-to-br from-red-600 to-red-800",
      text: "text-white",
      descColor: "text-white/80",
      icon: <FaSignOutAlt size={24} />,
      action: () => {
        localStorage.removeItem("token");
        navigate("/");
      },
    },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden scroll">
      {/* Fixed Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/hp5.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Scrollable Foreground Content */}
      <div className="relative z-10 h-full w-full overflow-y-auto">
        <div className="px-4 py-6 min-h-full flex items-start justify-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8 max-w-6xl w-full">
            <h1 className="text-4xl font-extrabold text-white text-center mb-4">
              Welcome to the Job Portal
            </h1>
            <p className="text-lg text-white/80 text-center mb-10">
              Find jobs, match your resume, post opportunities, and explore your career path.
            </p>

            <div className="max-w-xl space-y-6 mb-10">
              <p className="text-sm text-purple-300 font-medium tracking-wider">
                Find Jobs, Employment & Career
              </p>
              <h1 className="text-5xl font-bold leading-tight text-white">
                Get a <span className="text-purple-300">Job</span> that’s Perfect <br /> for <span className="text-pink-300">You</span>
              </h1>
              <p className="text-gray-200 text-lg">
                Be found. Put your CV in front of great employers.
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`cursor-pointer p-6 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 ${card.bg} h-44 flex flex-col justify-between ${card.text}`}
                  onClick={() => (card.action ? card.action() : navigate(card.link))}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {card.icon}
                    <h2 className="text-xl font-semibold">{card.title}</h2>
                  </div>
                  <p className={`text-sm ${card.descColor}`}>{card.desc}</p>
                </div>
              ))}
            </div>

            {/* About Us */}
            <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-4 border-b border-white/30 pb-2">✨ About Us</h2>
              <p className="text-white/90 mb-4 text-lg leading-relaxed">
                Our job portal is designed to simplify your job hunting and hiring process.
                Whether you’re a job seeker or an employer, we offer a seamless and intuitive platform for interaction.
              </p>
              <ul className="text-white/90 space-y-3 list-disc list-inside text-base">
                <li><span className="text-blue-300 font-semibold">✓</span> Upload and manage your resumes easily</li>
                <li><span className="text-blue-300 font-semibold">✓</span> Match resumes to job descriptions with AI-powered scoring</li>
                <li><span className="text-blue-300 font-semibold">✓</span> Discover job listings from top companies and external APIs</li>
                <li><span className="text-blue-300 font-semibold">✓</span> Post and manage job offers as a recruiter or admin</li>
                <li><span className="text-blue-300 font-semibold">✓</span> View profiles and track application statuses</li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-4 border-b border-white/30 pb-2">📞 Contact Us</h2>
              <p className="text-white/90 mb-4 text-lg leading-relaxed">
                Have questions, feedback, or need support? Reach out to us through the following channels.
              </p>
              <ul className="text-white/90 space-y-3 list-disc list-inside text-base">
                <li><span className="text-yellow-300 font-semibold">📧</span> <strong>Email:</strong> <a href="mailto:aryadeepak5703@gmail.com" className="underline hover:text-blue-200">aryadeepak5703@gmail.com</a></li>
                <li><span className="text-yellow-300 font-semibold">📞</span> <strong>Phone:</strong> <a href="tel:+9090909909" className="underline hover:text-blue-200">+91 9347129597</a></li>
                <li><span className="text-yellow-300 font-semibold">📍</span> <strong>Location:</strong> Hyderabad, India</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
