import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import { createComplaint } from "../services/complaintService";
import { categories, statuses } from "../utils/constants";

const initialForm = {
  name: "",
  email: "",
  title: "",
  description: "",
  category: "Other",
  location: "",
  status: "Pending"
};

const ComplaintRegistrationPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...initialForm, name: user?.name || "", email: user?.email || "" });
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = await createComplaint(form);
      toast.success("Complaint registered and analyzed");
      navigate(`/ai-analysis/${data.complaint._id}`, { state: { complaint: data.complaint } });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell max-w-4xl">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-panel">
        <h1 className="text-3xl font-bold text-ink">Complaint Registration</h1>
        <p className="mt-1 text-slate-500">Submit details and receive AI analysis immediately.</p>
        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <FormField label="Name">
            <input className="input" value={form.name} onChange={(e) => updateField("name", e.target.value)} required />
          </FormField>
          <FormField label="Email">
            <input className="input" type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} required />
          </FormField>
          <FormField label="Complaint Title">
            <input className="input" value={form.title} onChange={(e) => updateField("title", e.target.value)} required />
          </FormField>
          <FormField label="Location">
            <input className="input" value={form.location} onChange={(e) => updateField("location", e.target.value)} required />
          </FormField>
          <FormField label="Complaint Category">
            <select className="input" value={form.category} onChange={(e) => updateField("category", e.target.value)}>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </FormField>
          <FormField label="Complaint Status">
            <select className="input" value={form.status} onChange={(e) => updateField("status", e.target.value)}>
              {statuses.map((status) => <option key={status}>{status}</option>)}
            </select>
          </FormField>
          <FormField label="Complaint Description">
            <textarea
              className="input min-h-36"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              required
            />
          </FormField>
          <div className="md:col-span-2">
            <button className="btn-primary w-full sm:w-auto" disabled={loading}>
              {loading ? "Submitting..." : "Submit complaint"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ComplaintRegistrationPage;
