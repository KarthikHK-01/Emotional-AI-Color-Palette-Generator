import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

function Profile() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [password, setPassword] = useState("");

  const [editField, setEditField] = useState(""); 

  const handleSave = () => {
    const payload = {editField};

    if(editField === "username"){
      payload.newName = username;
    }else if(editField === "password"){
      payload.newPassword = password;
    }

    axios.post("http://localhost:3000/api/save-details", payload, {
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      } 
    });
    localStorage.setItem("username", payload.newName);

    setEditField(""); 
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow px-6 py-10 bg-gray-100">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-6 text-indigo-700">Your Profile</h2>

          {/* Username Field */}
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-semibold mb-2">Username</label>
            <div className="flex items-center justify-between bg-gray-50 border border-gray-300 rounded-md p-3">
              {editField === "username" ? (
                <input
                  className="w-full focus:outline-none text-gray-800"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              ) : (
                <span className="text-gray-800">{username}</span>
              )}
              <button
                onClick={() =>
                  editField === "username" ? handleSave() : setEditField("username")
                }
                className="text-sm font-medium text-indigo-600 hover:underline ml-4"
              >
                {editField === "username" ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-semibold mb-2">Password</label>
            <div className="flex items-center justify-between bg-gray-50 border border-gray-300 rounded-md p-3">
              {editField === "password" ? (
                <input
                  type="password"
                  className="w-full focus:outline-none text-gray-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              ) : (
                <span className="text-gray-800">{"•".repeat(password.length)}</span>
              )}
              <button
                onClick={() =>
                  editField === "password" ? handleSave() : setEditField("password")
                }
                className="text-sm font-medium text-indigo-600 hover:underline ml-4"
              >
                {editField === "password" ? "Save" : "Change"}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
