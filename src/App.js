import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Trips from "./pages/Trips";
import Vehicles from "./pages/Vehicles";
import Predictive from "./pages/Predictive";
import Login from "./pages/Login";

// Components
import Navbar from "./components/Navbar";

function App() {
  const [vehicles, setVehicles] = useState([
    { id: 1, name: "Truck A", type: "Truck", license: "ABC123", status: "Active", driverMobile: "9876543210" },
    { id: 2, name: "Van B", type: "Van", license: "XYZ789", status: "Inactive", driverMobile: "9123456780" },
    { id: 3, name: "Car C", type: "Car", license: "DEF456", status: "In Maintenance", driverMobile: "9988776655" },
  ]);

  const [trips, setTrips] = useState([
    { id: 1, vehicleId: 1, distance: 120, date: "2025-08-01" },
    { id: 2, vehicleId: 2, distance: 60, date: "2025-08-03" },
    { id: 3, vehicleId: 3, distance: 30, date: "2025-08-05" },
    { id: 4, vehicleId: 1, distance: 150, date: "2025-08-10" },
    { id: 5, vehicleId: 3, distance: 50, date: "2025-08-12" },
  ]);

  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public page */}
        <Route path="/login" element={<Login />} />

        {/* Protected pages with Navbar */}
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard trips={trips} vehicles={vehicles} />
            </>
          }
        />
        <Route
          path="/trips"
          element={
            <>
              <Navbar />
              <Trips trips={trips} setTrips={setTrips} vehicles={vehicles} />
            </>
          }
        />
        <Route
          path="/vehicles"
          element={
            <>
              <Navbar />
              <Vehicles vehicles={vehicles} setVehicles={setVehicles} />
            </>
          }
        />
        <Route
          path="/predictive"
          element={
            <>
              <Navbar />
              <Predictive trips={trips} vehicles={vehicles} />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
