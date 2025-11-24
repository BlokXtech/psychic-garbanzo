import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // ----- Admin login -----
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminUsername === "admin" && adminPassword === "admin") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ username: "admin", role: "admin" })
      );
      navigate("/dashboard");
    } else {
      alert("❌ Invalid admin credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Admin Login */}
      <form
        onSubmit={handleAdminLogin}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Staff Login</h1>

        <input
          type="text"
          placeholder="Admin Username"
          value={adminUsername}
          onChange={(e) => setAdminUsername(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login as Admin
        </button>
      </form>

      <div className="text-center text-sm text-gray-600 mt-6">
        Powered by Haikonda Enterprises
      </div>
    </div>
  );
}
