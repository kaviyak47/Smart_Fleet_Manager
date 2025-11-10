import React, { useState } from "react";
import Card from "../components/ui/Card";
import CardContent from "../components/ui/CardContent";

export default function Vehicles({ vehicles, setVehicles }) {
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    type: "",
    license: "",
    status: "Active",
    driverMobile: "",
  });
  const [editId, setEditId] = useState(null);

  const handleSave = () => {
    if (!newVehicle.name || !newVehicle.type || !newVehicle.license || !newVehicle.driverMobile) {
      return alert("Fill all fields!");
    }

    if (editId !== null) {
      setVehicles(vehicles.map(v => (v.id === editId ? { id: editId, ...newVehicle } : v)));
      setEditId(null);
    } else {
      setVehicles([...vehicles, { id: Date.now(), ...newVehicle }]);
    }

    setNewVehicle({ name: "", type: "", license: "", status: "Active", driverMobile: "" });
  };

  const handleEdit = (v) => {
    setNewVehicle({ ...v });
    setEditId(v.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this vehicle?")) setVehicles(vehicles.filter(v => v.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Vehicles</h2>

      <div className="mb-6 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Name"
          value={newVehicle.name}
          onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
          className="border p-2 text-black"
        />
        <input
          type="text"
          placeholder="Type"
          value={newVehicle.type}
          onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
          className="border p-2 text-black"
        />
        <input
          type="text"
          placeholder="License"
          value={newVehicle.license}
          onChange={(e) => setNewVehicle({ ...newVehicle, license: e.target.value })}
          className="border p-2 text-black"
        />
        <input
          type="text"
          placeholder="Driver Mobile"
          value={newVehicle.driverMobile}
          onChange={(e) => setNewVehicle({ ...newVehicle, driverMobile: e.target.value })}
          className="border p-2 text-black"
        />
        <select
          value={newVehicle.status}
          onChange={(e) => setNewVehicle({ ...newVehicle, status: e.target.value })}
          className="border p-2 text-black"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="In Maintenance">In Maintenance</option>
        </select>

        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editId !== null ? "Update" : "Add"}
        </button>
      </div>

      {vehicles.length > 0 ? (
        <Card>
          <CardContent>
            <table className="w-full border-collapse border border-gray-300 text-black">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Type</th>
                  <th className="border p-2">License</th>
                  <th className="border p-2">Driver Mobile</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map(v => (
                  <tr key={v.id}>
                    <td className="border p-2">{v.name}</td>
                    <td className="border p-2">{v.type}</td>
                    <td className="border p-2">{v.license}</td>
                    <td className="border p-2">{v.driverMobile}</td>
                    <td className="border p-2">{v.status}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleEdit(v)}
                        className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(v.id)}
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
        <p>No vehicles added yet.</p>
      )}
    </div>
  );
}
