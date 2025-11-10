import React, { useState } from "react";

const FuelHistory = ({ vehicles, fuelHistory, setFuelHistory }) => {
  const [newEntry, setNewEntry] = useState({
    vehicleId: vehicles.length > 0 ? vehicles[0].id : "",
    liters: "",
    date: "",
  });

  const handleChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!newEntry.vehicleId || !newEntry.liters || !newEntry.date) return;
    const newId = fuelHistory.length > 0 ? fuelHistory[fuelHistory.length - 1].id + 1 : 1;
    setFuelHistory([...fuelHistory, { id: newId, ...newEntry, liters: Number(newEntry.liters) }]);
    setNewEntry({ vehicleId: vehicles[0].id, liters: "", date: "" });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Fuel History</h2>

      {/* Add new fuel entry */}
      <div className="mb-6 flex gap-2 items-center">
        <select
          name="vehicleId"
          value={newEntry.vehicleId}
          onChange={handleChange}
          className="border px-2 py-1 rounded"
        >
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name} ({v.license})
            </option>
          ))}
        </select>
        <input
          type="number"
          name="liters"
          placeholder="Liters"
          value={newEntry.liters}
          onChange={handleChange}
          className="border px-2 py-1 rounded"
        />
        <input
          type="date"
          name="date"
          value={newEntry.date}
          onChange={handleChange}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Fuel history table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Vehicle</th>
            <th className="border px-2 py-1">Liters</th>
            <th className="border px-2 py-1">Date</th>
          </tr>
        </thead>
        <tbody>
          {fuelHistory.map((entry) => {
            const vehicle = vehicles.find((v) => v.id === entry.vehicleId);
            return (
              <tr key={entry.id} className="text-center">
                <td className="border px-2 py-1">{vehicle ? vehicle.name : "Unknown"}</td>
                <td className="border px-2 py-1">{entry.liters}</td>
                <td className="border px-2 py-1">{entry.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FuelHistory;
