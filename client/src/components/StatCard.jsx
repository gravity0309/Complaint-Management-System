const StatCard = ({ icon: Icon, label, value, tone = "text-civic" }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-bold text-ink">{value}</p>
      </div>
      {Icon && <Icon className={`h-9 w-9 ${tone}`} />}
    </div>
  </div>
);

export default StatCard;
