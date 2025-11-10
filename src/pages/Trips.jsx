import React, { useState } from "react";
import Card from "../components/ui/Card";
import CardContent from "../components/ui/CardContent";

export default function Trips({ trips, setTrips, vehicles }) {
  const [newTrip, setNewTrip] = useState({
    vehicle: vehicles[0]?.name || "",
    date: "",
    time: "",
    distance: 0,
  });
  const [editId, setEditId] = useState(null);

  const handleSave = () => {
    if (!newTrip.vehicle || !newTrip.date || !newTrip.time || !newTrip.distance) {
      return alert("Fill all fields!");
    }

    if (editId !== null) {
      setTrips(trips.map(t => (t.id === editId ? { id: editId, ...newTrip } : t)));
      setEditId(null);
    } else {
      setTrips([...trips, { id: Date.now(), ...newTrip }]);
    }

    setNewTrip({
      vehicle: vehicles[0]?.name || "",
      date: "",
      time: "",
      distance: 0,
    });
  };

  const handleEdit = (t) => {
    setNewTrip({ ...t });
    setEditId(t.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this trip?")) setTrips(trips.filter(t => t.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Trips</h2>

      <div className="mb-6 flex flex-wrap gap-2">
        <select
          value={newTrip.vehicle}
          onChange={(e) => setNewTrip({ ...newTrip, vehicle: e.target.value })}
          className="border p-2 text-black"
        >
          {vehicles.map(v => (
            <option key={v.id} value={v.name}>{v.name}</option>
          ))}
        </select>

        <input
          type="date"
          value={newTrip.date}
          onChange={(e) => setNewTrip({ ...newTrip, date: e.target.value })}
          className="border p-2 text-black"
        />

        <input
          type="time"
          value={newTrip.time}
          onChange={(e) => setNewTrip({ ...newTrip, time: e.target.value })}
          className="border p-2 text-black"
        />

        <input
          type="number"
          placeholder="Distance (km)"
          value={newTrip.distance}
          onChange={(e) => setNewTrip({ ...newTrip, distance: parseInt(e.target.value) })}
          className="border p-2 text-black"
        />

        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editId !== null ? "Update" : "Add"}
        </button>
      </div>

      {trips.length > 0 ? (
        <Card>
          <CardContent>
            <table className="w-full border-collapse border border-gray-300 text-black">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Vehicle</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Distance (km)</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trips.map(t => (
                  <tr key={t.id}>
                    <td className="border p-2">{t.vehicle}</td>
                    <td className="border p-2">{t.date}</td>
                    <td className="border p-2">{t.time}</td>
                    <td className="border p-2">{t.distance}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleEdit(t)}
                        className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      ) : (
        <p>No trips added yet.</p>
      )}
    </div>
  );
}
