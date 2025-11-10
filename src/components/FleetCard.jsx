export default function FleetCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="mt-4 text-2xl font-bold">{value}</p>
    </div>
  );
}
