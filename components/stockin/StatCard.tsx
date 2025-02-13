export default function StatCard({ icon, label, value, bgColor }) {
    return (
      <div className={`bg-${bgColor}-50 p-4 rounded-lg flex items-center gap-3`}>
        <div className={`bg-${bgColor}-100 p-2 rounded-full`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className={`text-lg font-semibold text-${bgColor}-900`}>{value}</p>
        </div>
      </div>
    );
  }