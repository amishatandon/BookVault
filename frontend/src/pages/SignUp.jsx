import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/v1/sign-up", formData);
      console.log("Signup successful:", response.data);
      // Redirect or show success message after successful signup
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl mb-4">Sign Up</p>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label htmlFor="username" className="text-zinc-400">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="username"
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="text-zinc-400">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="xyz@example.com"
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="text-zinc-400">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="password"
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="address" className="text-zinc-400">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                rows="5"
                placeholder="address"
                required
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-300 px-4 py-2 rounded-lg text-zinc-900 hover:bg-blue-400 block w-full"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-zinc-200 font-semibold">Or</p>
          <p className="mt-4 text-zinc-500 font-semibold">
            Already have an account?{" "}
            <Link to="/login" className="hover:text-blue-500">
              <u>Log In</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
