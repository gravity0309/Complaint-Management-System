import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ComplaintFilters from "../components/ComplaintFilters";
import ComplaintTable from "../components/ComplaintTable";
import LoadingSpinner from "../components/LoadingSpinner";
import StatCard from "../components/StatCard";
import { deleteComplaint, getComplaintStats, getComplaints } from "../services/complaintService";
import { AlertTriangle, CheckCircle2, Clock, ClipboardList } from "lucide-react";

const defaultFilters = { location: "", category: "", status: "" };

const AdminPanelPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAdminData = async (activeFilters = filters) => {
    setLoading(true);
    try {
      const params = Object.fromEntries(Object.entries(activeFilters).filter(([, value]) => value));
      const [complaintsData, statsData] = await Promise.all([getComplaints(params), getComplaintStats()]);
      setComplaints(complaintsData.complaints);
      setStats(statsData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => loadAdminData(filters), 250);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this complaint permanently?")) return;

    try {
      await deleteComplaint(id);
      toast.success("Complaint deleted");
      loadAdminData(filters);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main className="page-shell">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-ink">Admin Panel</h1>
        <p className="text-slate-500">Manage complaints, priorities, and operational status.</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={ClipboardList} label="Total" value={stats?.total || 0} />
        <StatCard icon={Clock} label="Pending" value={stats?.pending || 0} tone="text-amber-600" />
        <StatCard icon={CheckCircle2} label="Resolved" value={stats?.resolved || 0} tone="text-emerald-600" />
        <StatCard icon={AlertTriangle} label="High Priority" value={stats?.highPriority || 0} tone="text-red-600" />
      </section>

      <div className="mt-6">
        <ComplaintFilters
          filters={filters}
          onChange={(field, value) => setFilters((current) => ({ ...current, [field]: value }))}
          onReset={() => setFilters(defaultFilters)}
        />
      </div>

      <div className="mt-5">
        {loading ? (
          <LoadingSpinner label="Loading admin data..." />
        ) : (
          <ComplaintTable complaints={complaints} isAdmin onDelete={handleDelete} />
        )}
      </div>
    </main>
  );
};

export default AdminPanelPage;
