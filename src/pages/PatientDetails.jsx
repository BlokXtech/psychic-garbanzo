import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    diagnosis: "",
    status: "voluntary",
    hospital: "",
  });
  const [selectedPatient, setSelectedPatient] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  // 🔹 Live sync from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "patients"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPatients(list);
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Add new patient
  const handleAddPatient = async (e) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.age || !newPatient.gender) {
      alert("Please fill all fields!");
      return;
    }

    await addDoc(collection(db, "patients"), {
      ...newPatient,
      addedBy: currentUser.username || "Unknown",
      addedByRole: currentUser.role || "Unknown",
      visitCount: 1,
      createdAt: new Date().toISOString(),
      history: [
        {
          date: new Date().toLocaleString(),
          diagnosis: newPatient.diagnosis || "General Checkup",
          inTime: new Date().toLocaleString(),
          outTime: "",
        },
      ],
      hospitalHistory: newPatient.hospital ? [newPatient.hospital] : [],
    });

    setNewPatient({
      name: "",
      age: "",
      gender: "",
      diagnosis: "",
      status: "voluntary",
      hospital: "",
    });
  };

  // 🔹 Show patient history
  const viewPatientHistory = async (id) => {
    const ref = doc(db, "patients", id);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
      setSelectedPatient({ id, ...snapshot.data() });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Patient Management
      </h2>

      {/* Add New Patient Form */}
      <form
        onSubmit={handleAddPatient}
        className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-lg mx-auto"
      >
        <h3 className="text-xl font-semibold mb-4">Add New Patient</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={newPatient.name}
            onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
            className="border border-gray-300 rounded p-2"
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={newPatient.age}
            onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
            className="border border-gray-300 rounded p-2"
            required
          />
          <select
            value={newPatient.gender}
            onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
            className="border border-gray-300 rounded p-2"
            required
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="text"
            placeholder="Diagnosis / Condition"
            value={newPatient.diagnosis}
            onChange={(e) => setNewPatient({ ...newPatient, diagnosis: e.target.value })}
            className="border border-gray-300 rounded p-2"
          />
          <select
            value={newPatient.status}
            onChange={(e) => setNewPatient({ ...newPatient, status: e.target.value })}
            className="border border-gray-300 rounded p-2 col-span-2"
          >
            <option value="voluntary">Came voluntarily</option>
            <option value="police">Brought in by police</option>
          </select>
          <input
            type="text"
            placeholder="Hospital"
            value={newPatient.hospital}
            onChange={(e) => setNewPatient({ ...newPatient, hospital: e.target.value })}
            className="border border-gray-300 rounded p-2 col-span-2"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add Patient
        </button>
      </form>

      {/* Patient List */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Current Patients
        </h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2 border border-gray-300">Name</th>
              <th className="p-2 border border-gray-300">Age</th>
              <th className="p-2 border border-gray-300">Gender</th>
              <th className="p-2 border border-gray-300">Visits</th>
              <th className="p-2 border border-gray-300">Added By</th>
              <th className="p-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="text-center border-b border-gray-200">
                <td className="p-2 flex items-center justify-center space-x-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      p.status === "police" ? "bg-red-600" : "bg-green-600"
                    }`}
                  ></span>
                  <span>{p.name}</span>
                </td>
                <td className="p-2">{p.age}</td>
                <td className="p-2">{p.gender}</td>
                <td className="p-2">{p.visitCount || 1}</td>
                <td className="p-2">{p.addedBy}</td>
                <td className="p-2">
                  <button
                    onClick={() => viewPatientHistory(p.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Patient History Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-center text-blue-700">
              {selectedPatient.name}’s Health History
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Added by: {selectedPatient.addedBy} ({selectedPatient.addedByRole})  
              <br />
              Hospital history: {selectedPatient.hospitalHistory?.join(", ") || "N/A"}
            </p>
            <ul className="space-y-2">
              {selectedPatient.history.map((entry, index) => (
                <li
                  key={index}
                  className="border border-gray-200 rounded p-2 bg-gray-50"
                >
                  <p><strong>Date:</strong> {entry.date}</p>
                  <p><strong>Diagnosis:</strong> {entry.diagnosis}</p>
                  <p><strong>Check-in:</strong> {entry.inTime}</p>
                  <p><strong>Check-out:</strong> {entry.outTime || "N/A"}</p>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedPatient(null)}
              className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
