import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex flex-col sm:flex-row justify-between items-center">
      {/* Left side: app name and links */}
      <div className="flex items-center space-x-6 mb-2 sm:mb-0">
        <h1 className="font-bold text-lg">Hospital Management</h1>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/patients" className="hover:underline">Patients</Link>
        <Link to="/appointments" className="hover:underline">Appointments</Link>
      </div>

      {/* Right side: your name + powered by + logout */}
      <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm">
        <span>Powered by Haikonda Enterprise</span>
        <button
          onClick={handleLogout}
          className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
