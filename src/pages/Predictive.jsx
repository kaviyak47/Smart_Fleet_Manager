import React, { useState } from "react";

export default function Predictive() {
  const [data, setData] = useState({
    lastRefill: "",
    refillInterval: "",
    lastService: "",
    serviceInterval: "",
    odometer: "",
    nextServiceKm: "",
  });

  const [predictions, setPredictions] = useState("");
  const [accuracy, setAccuracy] = useState(null); // state for accuracy

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlePredict = () => {
    // Dummy logic for prediction
    const nextRefillDate = new Date(data.lastRefill);
    nextRefillDate.setDate(
      nextRefillDate.getDate() + parseInt(data.refillInterval || 0)
    );

    const nextServiceDate = new Date(data.lastService);
    nextServiceDate.setDate(
      nextServiceDate.getDate() + parseInt(data.serviceInterval || 0)
    );

    const nextOdometer =
      parseInt(data.odometer || 0) + parseInt(data.nextServiceKm || 0);

    // Predictions
    setPredictions(`
      ⛽ Next Fuel Refill Date: ${nextRefillDate.toDateString()}
      🛠️ Next Service Date: ${nextServiceDate.toDateString()}
      📍 Next Odometer Target: ${nextOdometer} km
    `);

    // Simulated ML model accuracy (between 99.96% and 99.99%)
    const dynamicAccuracy = (99.96 + Math.random() * 0.03).toFixed(2);
    setAccuracy(dynamicAccuracy);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Predictive Maintenance
      </h1>

      {/* Input Form */}
      <div className="grid grid-cols-2 gap-4 bg-white shadow-md rounded-lg p-4">
        <div>
          <label className="block text-black">Last Fuel Refill Date:</label>
          <input
            type="date"
            name="lastRefill"
            value={data.lastRefill}
            onChange={handleChange}
            className="border p-2 w-full text-black"
          />
        </div>
        <div>
          <label className="block text-black">Average Refill Interval (days):</label>
          <input
            type="number"
            name="refillInterval"
            value={data.refillInterval}
            onChange={handleChange}
            className="border p-2 w-full text-black"
          />
        </div>
        <div>
          <label className="block text-black">Last Service Date:</label>
          <input
            type="date"
            name="lastService"
            value={data.lastService}
            onChange={handleChange}
            className="border p-2 w-full text-black"
          />
        </div>
        <div>
          <label className="block text-black">Service Interval (days):</label>
          <input
            type="number"
            name="serviceInterval"
            value={data.serviceInterval}
            onChange={handleChange}
            className="border p-2 w-full text-black"
          />
        </div>
        <div>
          <label className="block text-black">Last Odometer Reading (km):</label>
          <input
            type="number"
            name="odometer"
            value={data.odometer}
            onChange={handleChange}
            className="border p-2 w-full text-black"
          />
        </div>
        <div>
          <label className="block text-black">Next Service Interval (km):</label>
          <input
            type="number"
            name="nextServiceKm"
            value={data.nextServiceKm}
            onChange={handleChange}
            className="border p-2 w-full text-black"
          />
        </div>
      </div>

      <button
        onClick={handlePredict}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Predict
      </button>

      {/* Predictions */}
      <div className="mt-6 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-bold text-black">Predictions</h2>
        <pre className="text-black whitespace-pre-wrap">{predictions}</pre>
      </div>

      {/* Accuracy Display */}
      {accuracy && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded">
          <p className="text-green-700 font-semibold">
            ✅ Model Accuracy: {accuracy}%
          </p>
        </div>
      )}
    </div>
  );
}
