import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await signup(form);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell max-w-lg">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-panel">
        <h1 className="text-2xl font-bold text-ink">Create account</h1>
        <p className="mt-1 text-sm text-slate-500">Register to submit and track complaints.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <FormField label="Name">
            <input
              className="input"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
            />
          </FormField>
          <FormField label="Email">
            <input
              className="input"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
            />
          </FormField>
          <FormField label="Password">
            <input
              className="input"
              type="password"
              minLength="6"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              required
            />
          </FormField>
          <button className="btn-primary w-full" disabled={loading}>
            {loading ? "Creating..." : "Signup"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-600">
          Already registered? <Link className="font-semibold text-civic" to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
};

export default SignupPage;
