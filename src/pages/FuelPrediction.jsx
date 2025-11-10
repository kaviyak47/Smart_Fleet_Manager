import React, { useEffect, useState } from "react";
import MLR from "ml-regression-multivariate-linear";

const FuelPrediction = ({ vehicles }) => {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    // Step 1: Generate synthetic dataset
    const syntheticData = [];
    vehicles.forEach((v) => {
      for (let i = 0; i < 20; i++) {
        const vehicleType = v.type.length; // crude numeric encoding
        const driverType = Math.random() < 0.5 ? 0 : 1;
        const traffic = Math.floor(Math.random() * 3); // 0=low,1=med,2=high
        const weather = Math.floor(Math.random() * 3); // 0=clear,1=rainy,2=hot

        // Fake formula: fuel ↑ with traffic + weather
        const liters = 5 * vehicleType + 2 * driverType + 3 * traffic + 2 * weather + Math.random();
        // Maintenance days ↓ if traffic or weather bad
        const nextMaintenance = 30 - (traffic * 5 + weather * 3 + Math.random() * 2);

        syntheticData.push({ vehicleType, driverType, traffic, weather, liters, nextMaintenance });
      }
    });

    const X = syntheticData.map(d => [d.vehicleType, d.driverType, d.traffic, d.weather]);
    const Y = syntheticData.map(d => [d.liters, d.nextMaintenance]);

    // Step 2: Train Linear Regression
    const mlr = new MLR(X, Y);

    // Step 3: Predict for each vehicle
    const preds = vehicles.map((v) => {
      const features = [v.type.length, 1, 1, 1]; // assume avg driver, traffic, weather
      return mlr.predict(features);
    });

    setPredictions(preds);

    // Step 4: Accuracy check (R² for fuel)
    const predsAll = X.map(x => mlr.predict(x));
    const ssRes = Y.reduce((sum, y, i) => {
      const err = y[0] - predsAll[i][0];
      return sum + err * err;
    }, 0);
    const meanY = Y.reduce((sum, y) => sum + y[0], 0) / Y.length;
    const ssTot = Y.reduce((sum, y) => {
      const err = y[0] - meanY;
      return sum + err * err;
    }, 0);
    const r2 = 1 - ssRes / ssTot;
    console.log("Fuel Prediction Accuracy (R²):", (r2 * 100).toFixed(2) + "%");
  }, [vehicles]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold mb-6 text-blue-600">Predict. Prevent. Perform.</h1>
      <p className="mb-6 text-gray-700">Optimize your fleet's fuel usage and maintenance schedule effortlessly.</p>

      {/* Prediction Table */}
      <table className="w-full border-collapse border rounded overflow-hidden shadow">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="border p-2">Vehicle</th>
            <th className="border p-2">Predicted Fuel (L)</th>
            <th className="border p-2">Predicted Maintenance (Days)</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, i) => (
            <tr key={vehicle.id} className={`text-center ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
              <td className="border p-2 font-medium">{vehicle.name}</td>
              <td className="border p-2 font-semibold">
                {predictions[i] ? predictions[i][0].toFixed(1) : "-"}
              </td>
              <td className="border p-2 font-semibold">
                {predictions[i] ? Math.round(predictions[i][1]) : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FuelPrediction;
