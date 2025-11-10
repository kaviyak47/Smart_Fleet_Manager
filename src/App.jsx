import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Trips from "./pages/Trips";
import Predictive from "./pages/Predictive";


// Components
import Navbar from "./components/Navbar";

export default function App() {
  // Load vehicles from localStorage or default to []
  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem("vehicles");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "Bus A", type: "Mini", license: "TN01", driverMobile: "9999999999", status: "Active" },
          { id: 2, name: "Bus B", type: "Standard", license: "TN02", driverMobile: "8888888888", status: "Active" },
          { id: 3, name: "Bus C", type: "Luxury", license: "TN03", driverMobile: "7777777777", status: "Inactive" },
        ];
  });

  // Trips
  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem("trips");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, vehicle: "Bus A", date: "2025-08-01", time: "08:30" },
          { id: 2, vehicle: "Bus B", date: "2025-08-03", time: "13:00" },
          { id: 3, vehicle: "Bus C", date: "2025-08-05", time: "19:00" },
          { id: 4, vehicle: "Bus A", date: "2025-08-07", time: "09:00" },
          { id: 5, vehicle: "Bus B", date: "2025-08-09", time: "14:30" },
        ];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(true); // simple login flag

  // Save vehicles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
  }, [vehicles]);

  // Save trips to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

  const handleLogout = () => setIsLoggedIn(false);

  if (!isLoggedIn) {
    return <Navigate to="/login" />; // redirect to login page if not logged in
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        {/* ✅ Pass vehicles & trips into Navbar */}
        <Navbar onLogout={handleLogout} vehicles={vehicles} trips={trips} />

        <Routes>
          <Route path="/dashboard" element={<Dashboard vehicles={vehicles} trips={trips} />} />
          <Route path="/vehicles" element={<Vehicles vehicles={vehicles} setVehicles={setVehicles} />} />
          <Route path="/trips" element={<Trips trips={trips} setTrips={setTrips} vehicles={vehicles} />} />
          <Route path="/predictive" element={<Predictive vehicles={vehicles} fuelHistory={[]} />} />
          
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}
