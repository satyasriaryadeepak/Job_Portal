import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile)
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-rose-900 to-gray-900 text-white p-6">
        <p className="text-lg">Loading profile...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-rose-900 to-gray-900 text-white p-6">
      <div className="bg-zinc-800 p-6 rounded-2xl shadow-2xl max-w-md mx-auto mt-10">
        <h2 className="text-3xl font-extrabold text-emerald-400 mb-6 text-center">
          My Profile
        </h2>
        <div className="space-y-3 text-lg">
          <p>
            <span className="text-purple-300 font-medium">ID:</span> {profile.id}
          </p>
          <p>
            <span className="text-rose-300 font-medium">Username:</span> {profile.username}
          </p>
          <p>
            <span className="text-emerald-300 font-medium">Email:</span> {profile.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
