import { useState } from "react";

import toast from "react-hot-toast";

import { Link } from "react-router-dom";

import FormField from "../components/FormField";

import { loginUser } from "../services/authService";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      // API call
      const data = await loginUser(form);

      console.log("LOGIN RESPONSE:", data);

      // Save token correctly
      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast.success("Logged in successfully");

      // Force redirect
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell max-w-lg">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-panel">
        <h1 className="text-2xl font-bold text-ink">
          Login
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Access your complaint dashboard.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={handleSubmit}
        >
          <FormField label="Email">
            <input
              className="input"
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm({
                  ...form,
                  email: event.target.value
                })
              }
              required
            />
          </FormField>

          <FormField label="Password">
            <input
              className="input"
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm({
                  ...form,
                  password: event.target.value
                })
              }
              required
            />
          </FormField>

          <button
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          New user?{" "}
          <Link
            className="font-semibold text-civic"
            to="/signup"
          >
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
};

export default LoginPage;