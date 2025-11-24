import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    patientId: "",
    date: "",
    reason: "",
  });

  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  // 🔹 Load patients
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "patients"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPatients(list);
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Load appointments
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "appointments"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAppointments(list);
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Add new appointment
  const handleAddAppointment = async (e) => {
    e.preventDefault();
    if (!newAppointment.patientId || !newAppointment.date || !newAppointment.reason) {
      alert("Please fill all fields!");
      return;
    }

    await addDoc(collection(db, "appointments"), {
      ...newAppointment,
      addedBy: currentUser.username || "Unknown",
      addedByRole: currentUser.role || "Unknown",
      createdAt: new Date().toISOString(),
    });

    setNewAppointment({ patientId: "", date: "", reason: "" });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Appointments Management
      </h2>

      {/* Add Appointment Form */}
      <form
        onSubmit={handleAddAppointment}
        className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-lg mx-auto"
      >
        <h3 className="text-xl font-semibold mb-4">Add New Appointment</h3>
        <div className="grid grid-cols-1 gap-4">
          <select
            value={newAppointment.patientId}
            onChange={(e) => setNewAppointment({ ...newAppointment, patientId: e.target.value })}
            className="border border-gray-300 rounded p-2"
            required
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.age}y, {p.gender})
              </option>
            ))}
          </select>
          <input
            type="datetime-local"
            value={newAppointment.date}
            onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
            className="border border-gray-300 rounded p-2"
            required
          />
          <input
            type="text"
            placeholder="Reason / Notes"
            value={newAppointment.reason}
            onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
            className="border border-gray-300 rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add Appointment
        </button>
      </form>

      {/* Appointment List */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4 text-center">Current Appointments</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2 border border-gray-300">Patient</th>
              <th className="p-2 border border-gray-300">Date & Time</th>
              <th className="p-2 border border-gray-300">Reason</th>
              <th className="p-2 border border-gray-300">Added By</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => {
              const patient = patients.find((p) => p.id === a.patientId);
              return (
                <tr key={a.id} className="text-center border-b border-gray-200">
                  <td className="p-2">{patient ? patient.name : "Unknown"}</td>
                  <td className="p-2">{new Date(a.date).toLocaleString()}</td>
                  <td className="p-2">{a.reason}</td>
                  <td className="p-2">{a.addedBy} ({a.addedByRole})</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
