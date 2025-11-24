import React from "react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-600 text-center">
        Hospital Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold">Patients</h2>
          <p className="text-3xl font-bold mt-2">120</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold">Appointments</h2>
          <p className="text-3xl font-bold mt-2">34</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold">Doctors</h2>
          <p className="text-3xl font-bold mt-2">15</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-3xl font-bold mt-2">$8.5k</p>
        </div>
      </div>
    </div>
  );
}
