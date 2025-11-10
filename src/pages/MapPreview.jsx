// src/pages/MapPreview.jsx
import React from "react";

// Replace with your real Google Maps API key
const API_KEY = "YOUR_REAL_API_KEY";

export default function MapPreview({ vehicles = [] }) {
  // Build markers string for Google Static Maps
  const activeVehicles = vehicles.filter(v => v.status === "Active");
  const markers = activeVehicles.length
    ? activeVehicles.map(v => `${v.lat},${v.lng}`).join("|")
    : "13.0827,80.2707"; // fallback

  return (
    <div style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#0077B6" }}>
      <h2 style={{ color: "white", fontSize: "24px", marginBottom: "16px" }}>Active Vehicles Map</h2>
      
      <div style={{ height: "400px", backgroundColor: "white", borderRadius: "8px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?size=800x400&markers=${markers}&key=${API_KEY}`}
          alt="Active Vehicles Map"
          style={{ width: "100%", height: "100%", borderRadius: "8px" }}
        />
      </div>

      {activeVehicles.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "8px", color: "white" }}>No active vehicles to display</p>
      )}
    </div>
  );
}
