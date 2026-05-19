import { Brain, Building2, MessageSquareText, SignalHigh } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusBadge from "../components/StatusBadge";
import { getComplaintById } from "../services/complaintService";

const AiAnalysisPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [complaint, setComplaint] = useState(state?.complaint || null);
  const [loading, setLoading] = useState(!state?.complaint);

  useEffect(() => {
    if (complaint) return;

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
  }, [complaint, id]);

  if (loading) return <LoadingSpinner label="Loading AI analysis..." />;
  if (!complaint) return <main className="page-shell">Analysis not found.</main>;

  const analysis = complaint.aiAnalysis || {};

  return (
    <main className="page-shell max-w-5xl">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-panel">
        <div className="flex items-center gap-3">
          <Brain className="h-8 w-8 text-civic" />
          <div>
            <h1 className="text-3xl font-bold text-ink">AI Analysis Result</h1>
            <p className="text-slate-500">{complaint.title}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-md border border-slate-200 p-4">
            <SignalHigh className="h-5 w-5 text-red-600" />
            <h2 className="mt-2 font-semibold text-ink">Priority</h2>
            <div className="mt-2"><StatusBadge value={analysis.priority} /></div>
          </article>
          <article className="rounded-md border border-slate-200 p-4">
            <Building2 className="h-5 w-5 text-civic" />
            <h2 className="mt-2 font-semibold text-ink">Suggested Department</h2>
            <p className="mt-2 text-slate-700">{analysis.department}</p>
          </article>
          <article className="rounded-md border border-slate-200 p-4">
            <MessageSquareText className="h-5 w-5 text-blue-600" />
            <h2 className="mt-2 font-semibold text-ink">Complaint Summary</h2>
            <p className="mt-2 text-slate-700">{analysis.summary}</p>
          </article>
          <article className="rounded-md border border-slate-200 p-4">
            <Brain className="h-5 w-5 text-purple-600" />
            <h2 className="mt-2 font-semibold text-ink">Auto Response</h2>
            <p className="mt-2 text-slate-700">{analysis.autoResponse}</p>
          </article>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="btn-primary" to={`/complaints/${complaint._id}`}>View complaint details</Link>
          <Link className="btn-secondary" to="/complaints">Back to list</Link>
        </div>
      </section>
    </main>
  );
};

export default AiAnalysisPage;
