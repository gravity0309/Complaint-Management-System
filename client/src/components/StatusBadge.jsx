const styles = {
  Pending: "bg-amber-100 text-amber-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Resolved: "bg-emerald-100 text-emerald-800",
  Low: "bg-slate-100 text-slate-700",
  Medium: "bg-orange-100 text-orange-800",
  High: "bg-red-100 text-red-800"
};

const StatusBadge = ({ value }) => (
  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles[value] || styles.Low}`}>
    {value || "Unknown"}
  </span>
);

export default StatusBadge;
