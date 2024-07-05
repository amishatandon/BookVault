import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/SideBar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const Profile = () => {
  // const isLoggedIn = useSelector();
  const [profile, setProfile] = useState(null); // Use null to differentiate between loading state and empty state
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
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4 text-white">
      {!profile && <div
      className="w-full h-[100%] flex items-center justify-center"><Loader /></div>} {/* Show loader while fetching */}
      {profile && (
        <>
          <div className="w-full md:w-1/6">
            <Sidebar profile={profile} /> {/* Pass profile data to Sidebar component */}
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
