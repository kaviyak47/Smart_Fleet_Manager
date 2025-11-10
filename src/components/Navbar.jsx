import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ onLogout }) {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <div className="flex gap-6">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/vehicles">Vehicles</Link>
        <Link to="/trips">Trips</Link>
        <Link to="/predictive">Predictive</Link>
        {/* About Us removed from Navbar */}
      </div>
      <button onClick={onLogout} className="bg-red-500 px-3 py-1 rounded">
        Logout
      </button>
    </nav>
  );
}
