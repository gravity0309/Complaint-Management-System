import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import FormField from "../components/FormField";
import LoadingSpinner from "../components/LoadingSpinner";
import { getComplaintById, updateComplaint } from "../services/complaintService";
import { statuses } from "../utils/constants";

const ComplaintStatusUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadComplaint = async () => {
      try {
        const data = await getComplaintById(id);
        setComplaint(data.complaint);
        setStatus(data.complaint.status);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadComplaint();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      await updateComplaint(id, { status });
      toast.success("Complaint status updated");
      navigate(`/complaints/${id}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner label="Loading status..." />;

  return (
    <main className="page-shell max-w-xl">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-panel">
        <h1 className="text-2xl font-bold text-ink">Complaint Status Update</h1>
        <p className="mt-1 text-sm text-slate-500">{complaint?.title}</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <FormField label="Complaint Status">
            <select className="input" value={status} onChange={(event) => setStatus(event.target.value)}>
              {statuses.map((item) => <option key={item}>{item}</option>)}
            </select>
          </FormField>
          <button className="btn-primary" disabled={saving}>
            {saving ? "Updating..." : "Update status"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default ComplaintStatusUpdatePage;
