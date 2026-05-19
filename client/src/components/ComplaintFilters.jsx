import { Search } from "lucide-react";
import { categories, statuses } from "../utils/constants";

const ComplaintFilters = ({ filters, onChange, onReset }) => (
  <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-panel md:grid-cols-[1fr_180px_180px_auto]">
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
      <input
        className="input pl-9"
        placeholder="Search by location"
        value={filters.location}
        onChange={(event) => onChange("location", event.target.value)}
      />
    </div>
    <select
      className="input"
      value={filters.category}
      onChange={(event) => onChange("category", event.target.value)}
    >
      <option value="">All categories</option>
      {categories.map((category) => (
        <option key={category}>{category}</option>
      ))}
    </select>
    <select
      className="input"
      value={filters.status}
      onChange={(event) => onChange("status", event.target.value)}
    >
      <option value="">All statuses</option>
      {statuses.map((status) => (
        <option key={status}>{status}</option>
      ))}
    </select>
    <button className="btn-secondary" onClick={onReset}>
      Reset
    </button>
  </div>
);

export default ComplaintFilters;
