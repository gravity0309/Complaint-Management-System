import { Calendar, Mail, MapPin, User } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusBadge from "../components/StatusBadge";
import { getComplaintById } from "../services/complaintService";

const ComplaintDetailsPage = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComplaint = async () => {
      try {
        const data = await getComplaintById(id);
        setComplaint(data.complaint);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadComplaint();
  }, [id]);

  if (loading) return <LoadingSpinner label="Loading complaint details..." />;
  if (!complaint) return <main className="page-shell">Complaint not found.</main>;

  return (
    <main className="page-shell max-w-5xl">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-panel">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p className="text-sm font-semibold uppercase text-civic">{complaint.category}</p>
            <h1 className="mt-2 text-3xl font-bold text-ink">{complaint.title}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge value={complaint.status} />
            <StatusBadge value={complaint.aiAnalysis?.priority} />
          </div>
        </div>

        <div className="mt-6 grid gap-4 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-4">
          <span className="flex items-center gap-2"><User className="h-4 w-4 text-civic" /> {complaint.name}</span>
          <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-civic" /> {complaint.email}</span>
          <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-civic" /> {complaint.location}</span>
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-civic" /> {new Date(complaint.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold text-ink">Description</h2>
          <p className="mt-2 rounded-md bg-slate-50 p-4 text-slate-700">{complaint.description}</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-md border border-slate-200 p-4">
            <h2 className="font-semibold text-ink">Suggested Department</h2>
            <p className="mt-2 text-slate-700">{complaint.aiAnalysis?.department}</p>
          </div>
          <div className="rounded-md border border-slate-200 p-4">
            <h2 className="font-semibold text-ink">AI Summary</h2>
            <p className="mt-2 text-slate-700">{complaint.aiAnalysis?.summary}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="btn-primary" to={`/complaints/${complaint._id}/status`}>Update status</Link>
          <Link className="btn-secondary" to={`/ai-analysis/${complaint._id}`}>View AI analysis</Link>
        </div>
      </section>
    </main>
  );
};

export default ComplaintDetailsPage;
