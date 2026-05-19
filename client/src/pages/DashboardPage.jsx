import { AlertTriangle, CheckCircle2, Clock, ClipboardList } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import StatCard from "../components/StatCard";
import { getComplaintStats, getComplaints } from "../services/complaintService";
import StatusBadge from "../components/StatusBadge";

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [statsData, complaintsData] = await Promise.all([
          getComplaintStats(),
          getComplaints()
        ]);
        setStats(statsData);
        setRecent(complaintsData.complaints.slice(0, 5));
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) return <LoadingSpinner label="Loading dashboard..." />;

  return (
    <main className="page-shell">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-ink">Dashboard</h1>
          <p className="text-slate-500">Monitor complaint volume and priority.</p>
        </div>
        <Link className="btn-primary" to="/complaints/new">Register complaint</Link>
      </div>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={ClipboardList} label="Total complaints" value={stats?.total || 0} />
        <StatCard icon={Clock} label="Pending" value={stats?.pending || 0} tone="text-amber-600" />
        <StatCard icon={CheckCircle2} label="Resolved" value={stats?.resolved || 0} tone="text-emerald-600" />
        <StatCard icon={AlertTriangle} label="High priority" value={stats?.highPriority || 0} tone="text-red-600" />
      </section>

      <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">Recent complaints</h2>
          <Link className="text-sm font-semibold text-civic" to="/complaints">View all</Link>
        </div>
        <div className="mt-4 divide-y divide-slate-100">
          {recent.map((complaint) => (
            <Link
              key={complaint._id}
              to={`/complaints/${complaint._id}`}
              className="flex flex-col gap-2 py-3 hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-ink">{complaint.title}</p>
                <p className="text-sm text-slate-500">{complaint.location} - {complaint.category}</p>
              </div>
              <div className="flex gap-2">
                <StatusBadge value={complaint.status} />
                <StatusBadge value={complaint.aiAnalysis?.priority} />
              </div>
            </Link>
          ))}
          {recent.length === 0 && <p className="py-6 text-center text-sm text-slate-500">No complaints yet.</p>}
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
