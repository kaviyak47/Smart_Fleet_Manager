import React, { useState } from "react";

export default function Drivers() {
  const [drivers, setDrivers] = useState([
    { id: "D001", name: "Ravi Kumar", phone: "9876543210", license: "TN-12345", status: "Active" },
    { id: "D002", name: "Suresh", phone: "9876509876", license: "TN-54321", status: "Inactive" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newDriver, setNewDriver] = useState({
    id: "",
    name: "",
    phone: "",
    license: "",
    status: "Active",
  });

  const handleAddDriver = () => {
    setDrivers([...drivers, newDriver]);
    setNewDriver({
      id: "",
      name: "",
      phone: "",
      license: "",
      status: "Active",
    });
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Drivers</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          + Add Driver
        </button>
      </div>

      {/* Drivers Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Driver ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">License</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{driver.id}</td>
                <td className="p-3">{driver.name}</td>
                <td className="p-3">{driver.phone}</td>
                <td className="p-3">{driver.license}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      driver.status === "Active"
                        ? "bg-green-200 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {driver.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Driver Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add Driver</h2>
            <input
              type="text"
              placeholder="Driver ID"
              className="w-full mb-2 p-2 border rounded"
              value={newDriver.id}
              onChange={(e) => setNewDriver({ ...newDriver, id: e.target.value })}
            />
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-2 p-2 border rounded"
              value={newDriver.name}
              onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full mb-2 p-2 border rounded"
              value={newDriver.phone}
              onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
            />
            <input
              type="text"
              placeholder="License"
              className="w-full mb-2 p-2 border rounded"
              value={newDriver.license}
              onChange={(e) => setNewDriver({ ...newDriver, license: e.target.value })}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDriver}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
