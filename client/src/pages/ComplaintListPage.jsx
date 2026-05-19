import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ComplaintFilters from "../components/ComplaintFilters";
import ComplaintTable from "../components/ComplaintTable";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import { deleteComplaint, getComplaints } from "../services/complaintService";

const defaultFilters = { location: "", category: "", status: "" };

const ComplaintListPage = () => {
  const { isAdmin } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [loading, setLoading] = useState(true);

  const loadComplaints = async (activeFilters = filters) => {
    setLoading(true);
    try {
      const params = Object.fromEntries(
        Object.entries(activeFilters).filter(([, value]) => value)
      );
      const data = await getComplaints(params);
      setComplaints(data.complaints);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => loadComplaints(filters), 250);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this complaint?");
    if (!confirmed) return;

    try {
      await deleteComplaint(id);
      toast.success("Complaint deleted");
      setComplaints((current) => current.filter((complaint) => complaint._id !== id));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main className="page-shell">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-ink">Complaint List</h1>
        <p className="text-slate-500">Search, filter, inspect, and manage complaint records.</p>
      </div>
      <ComplaintFilters
        filters={filters}
        onChange={(field, value) => setFilters((current) => ({ ...current, [field]: value }))}
        onReset={() => setFilters(defaultFilters)}
      />
      <div className="mt-5">
        {loading ? (
          <LoadingSpinner label="Loading complaints..." />
        ) : (
          <ComplaintTable complaints={complaints} isAdmin={isAdmin} onDelete={handleDelete} />
        )}
      </div>
    </main>
  );
};

export default ComplaintListPage;
