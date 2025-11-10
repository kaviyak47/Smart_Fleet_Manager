import React, { useState } from "react";
import { FiBell } from "react-icons/fi";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Card from "../components/ui/Card";
import CardContent from "../components/ui/CardContent";

export default function Dashboard({ vehicles = [], trips = [] }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAbout, setShowAbout] = useState(false); // Toggle About Us

  // Filter vehicles for alerts (Active, Inactive, In Maintenance)
  const alertVehicles = vehicles.filter((v) =>
    ["Active", "Inactive", "In Maintenance"].includes(v.status)
  );

  const alertBadgeCount = vehicles.filter((v) =>
    ["Inactive", "In Maintenance"].includes(v.status)
  ).length;

  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter((v) => v.status === "Active").length;
  const totalTrips = trips.length;

  const statusCounts = {
    Active: activeVehicles,
    "In Maintenance": vehicles.filter((v) => v.status === "In Maintenance").length,
    Inactive: vehicles.filter((v) => v.status === "Inactive").length,
  };

  const pieData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  const COLORS = ["#4CAF50", "#FFC107", "#F44336"];

  const morningCount = trips.filter(t => t.time?.split(":")[0] < 12).length;
  const noonCount = trips.filter(t => {
    const hour = t.time?.split(":")[0];
    return hour >= 12 && hour < 17;
  }).length;
  const eveningCount = trips.filter(t => t.time?.split(":")[0] >= 17).length;

  return (
    <div className="p-6 space-y-6 relative text-gray-900">
      {/* Notification Icon */}
      <div className="absolute top-4 right-6">
        <button
          className="relative text-gray-800 hover:text-blue-600"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <FiBell size={28} />
          {alertBadgeCount > 0 && (
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-0 mt-2 w-72 bg-white text-gray-900 shadow-lg rounded border z-50 p-4">
            <h3 className="font-bold mb-2">Alerts / Notifications</h3>
            <ul className="list-disc pl-5 space-y-1">
              {alertVehicles.length > 0 ? (
                alertVehicles.map((v) => (
                  <li key={v.id}>
                    Vehicle <strong>{v.name}</strong> is <span className="font-semibold">{v.status}</span>
                  </li>
                ))
              ) : (
                <li>All vehicles are active</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white text-gray-900">
          <CardContent>
            <h3 className="text-lg font-bold">Total Vehicles</h3>
            <p className="text-2xl">{totalVehicles}</p>
          </CardContent>
        </Card>

        <Card className="bg-white text-gray-900">
          <CardContent>
            <h3 className="text-lg font-bold">Active Vehicles</h3>
            <p className="text-2xl">{activeVehicles}</p>
          </CardContent>
        </Card>

        <Card className="bg-white text-gray-900">
          <CardContent>
            <h3 className="text-lg font-bold">Total Trips</h3>
            <p className="text-2xl">{totalTrips}</p>
          </CardContent>
        </Card>
      </div>

      {/* Trip Time Allocation */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <Card className="bg-white text-gray-900">
          <CardContent>
            <h3 className="text-lg font-bold">Morning Trips</h3>
            <p>{morningCount} vehicle(s)</p>
          </CardContent>
        </Card>
        <Card className="bg-white text-gray-900">
          <CardContent>
            <h3 className="text-lg font-bold">Noon Trips</h3>
            <p>{noonCount} vehicle(s)</p>
          </CardContent>
        </Card>
        <Card className="bg-white text-gray-900">
          <CardContent>
            <h3 className="text-lg font-bold">Evening Trips</h3>
            <p>{eveningCount} vehicle(s)</p>
          </CardContent>
        </Card>
      </div>

      {/* Vehicle Status Pie Chart */}
      <Card className="bg-white text-gray-900">
        <CardContent>
          <h3 className="text-lg font-bold mb-4">Vehicle Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* About Us Toggle Button */}
      <div className="mt-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowAbout(!showAbout)}
        >
          {showAbout ? "Hide About Us" : "Show About Us"}
        </button>
      </div>

      {/* About Us Section */}
      {showAbout && (
        <div className="mt-4 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-2 text-black">About Us</h2>
          <p className="mb-2 text-black">
            Welcome to our Smart Fleet Management project! Our system leverages AI-driven predictive maintenance and next fuel refill to ensure fleet efficiency, reduce downtime, and improve safety.
          </p>
          <h3 className="font-semibold text-black">Our Team</h3>
          <ul className="list-disc list-inside text-black">
            <li>Kaviya K - Computer Science and Business Systems, Rajalakshmi Engineering College, Email: 231401047@rajalakshmi.edu.in</li>
            <li>Lakshmi Priya B - Computer Science and Business Systems, Rajalakshmi Engineering College, Email: 231401057@rajalakshmi.edu.in</li>
          </ul>
          <h3 className="font-semibold mt-2 text-black">Our Vision</h3>
          <p className="text-black">
            To create a proactive fleet management system that reduces vehicle downtime, ensures operational efficiency, and contributes to sustainable and safe transportation.
          </p>
        </div>
      )}
    </div>
  );
}
