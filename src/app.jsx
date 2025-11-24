import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Patients from "./pages/Patients.jsx";
import PatientDetails from "./pages/PatientDetails.jsx"; // NEW
import Appointments from "./pages/Appointments.jsx";
import Login from "./pages/Login.jsx";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isLoggedIn"); // simple demo
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Navbar />
              <div className="p-6">
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="patients" element={<Patients />} />
                  <Route path="patients/:id" element={<PatientDetails />} /> {/* NEW */}
                  <Route path="appointments" element={<Appointments />} />
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
