import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/SideBar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/get-user-information", { headers });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Handle error (show error message, retry logic, etc.)
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="bg-zinc-900 min-h-screen px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white">
      {!profile && (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      {profile && (
        <>
          <div className="w-full md:w-1/6">
            <Sidebar profile={profile} />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
