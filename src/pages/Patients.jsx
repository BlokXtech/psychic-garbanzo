import React, { useState, useEffect } from "react";

export default function Login() {
  // ----- Admin Login -----
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  // ----- Staff Check-In/Out -----
  const [checkStaffNumber, setCheckStaffNumber] = useState("");
  const [checkStaffPassword, setCheckStaffPassword] = useState("");
  const [checkStatusMessage, setCheckStatusMessage] = useState("");

  // ----- System Login -----
  const [loginStaffNumber, setLoginStaffNumber] = useState("");
  const [loginStaffPassword, setLoginStaffPassword] = useState("");
  const [loginStatusMessage, setLoginStatusMessage] = useState("");

  const [checkedInStaff, setCheckedInStaff] = useState([]);

  // Sample staff list with hospital codes
  const validStaff = [
    { staffNumber: "11A100001", name: "Nurse Alice", role: "nurse", hospital: "Oshakati", password: "1234" },
    { staffNumber: "11A100002", name: "Dr Bob", role: "doctor", hospital: "Oshakati", password: "1234" },
    { staffNumber: "11B100001", name: "Nurse Carol", role: "nurse", hospital: "Eenhana", password: "1234" },
  ];

  useEffect(() => {
    const storedStaff = JSON.parse(localStorage.getItem("checkedInStaff")) || [];
    setCheckedInStaff(storedStaff);
  }, []);

  useEffect(() => {
    localStorage.setItem("checkedInStaff", JSON.stringify(checkedInStaff));
  }, [checkedInStaff]);

  // ----- Admin Login Handler -----
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminUsername === "admin" && adminPassword === "admin") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify({ username: "admin", role: "admin" }));
      alert("✅ Admin logged in!");
      setAdminUsername("");
      setAdminPassword("");
    } else {
      alert("❌ Invalid admin credentials");
    }
  };

  // ----- Staff Check-In/Out Handler -----
  const handleCheckInOut = (e) => {
    e.preventDefault();
    const staff = validStaff.find(
      (s) => s.staffNumber === checkStaffNumber && s.password === checkStaffPassword
    );

    if (!staff) {
      setCheckStatusMessage("❌ Invalid staff number or password");
      setTimeout(() => setCheckStatusMessage(""), 4000);
      return;
    }

    const currentTime = new Date().toLocaleString();
    const index = checkedInStaff.findIndex((s) => s.staffNumber === staff.staffNumber);

    if (index === -1 || checkedInStaff[index].status === "out") {
      // Check-in
      const newEntry = { ...staff, time: currentTime, status: "in" };
      if (index === -1) setCheckedInStaff([...checkedInStaff, newEntry]);
      else {
        const updated = [...checkedInStaff];
        updated[index] = newEntry;
        setCheckedInStaff(updated);
      }
      setCheckStatusMessage(`✅ ${staff.name} checked in at ${currentTime}`);
    } else {
      // Check-out
      const updated = [...checkedInStaff];
      updated[index] = { ...updated[index], time: currentTime, status: "out" };
      setCheckedInStaff(updated);
      setCheckStatusMessage(`✅ ${staff.name} checked out at ${currentTime}`);
    }

    setCheckStaffNumber("");
    setCheckStaffPassword("");
    setTimeout(() => setCheckStatusMessage(""), 4000);
  };

  // ----- Staff System Login Handler -----
  const handleSystemLogin = (e) => {
    e.preventDefault();
    const staff = validStaff.find(
      (s) => s.staffNumber === loginStaffNumber && s.password === loginStaffPassword
    );
    if (!staff) {
      setLoginStatusMessage("❌ Invalid staff number or password");
      setTimeout(() => setLoginStatusMessage(""), 4000);
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(staff));
    setLoginStatusMessage(`✅ ${staff.name} logged in!`);
    setLoginStaffNumber("");
    setLoginStaffPassword("");
    setTimeout(() => setLoginStatusMessage(""), 4000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {/* Staff Check-In/Out */}
        <div className="bg-white p-6 rounded-lg shadow-md w-80">
          <h2 className="text-xl font-bold mb-4 text-center">Work Check-In / Check-Out</h2>
          <form onSubmit={handleCheckInOut} className="space-y-3">
            <input
              type="text"
              placeholder="Staff Number"
              value={checkStaffNumber}
              onChange={(e) => setCheckStaffNumber(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={checkStaffPassword}
              onChange={(e) => setCheckStaffPassword(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Sign In / Out
            </button>
          </form>
          {checkStatusMessage && <p className="mt-3 text-center font-semibold">{checkStatusMessage}</p>}
        </div>

        {/* Staff System Login */}
        <div className="bg-white p-6 rounded-lg shadow-md w-80">
          <h2 className="text-xl font-bold mb-4 text-center">System Login</h2>
          <form onSubmit={handleSystemLogin} className="space-y-3">
            <input
              type="text"
              placeholder="Staff Number"
              value={loginStaffNumber}
              onChange={(e) => setLoginStaffNumber(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginStaffPassword}
              onChange={(e) => setLoginStaffPassword(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Login
            </button>
          </form>
          {loginStatusMessage && <p className="mt-3 text-center font-semibold">{loginStatusMessage}</p>}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-600 mt-6">
        Powered by Haikonda Enterprises
      </div>
    </div>
  );
}
