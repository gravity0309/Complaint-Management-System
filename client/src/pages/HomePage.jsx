import { ArrowRight, Brain, ClipboardList, LockKeyhole, SearchCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const features = [
  { icon: ClipboardList, title: "Register", text: "Submit civic complaints with clear details and location." },
  { icon: Brain, title: "Analyze", text: "Gemini detects priority, department, summary, and response." },
  { icon: SearchCheck, title: "Track", text: "Follow complaint status from pending to resolved." },
  { icon: LockKeyhole, title: "Secure", text: "JWT authentication with role-based admin access." }
];

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <main>
      <section className="bg-skyglass">
        <div className="page-shell grid gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-civic">AI civic response platform</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
              AI-Based Smart Complaint Management System
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600">
              Register, categorize, prioritize, and track public complaints with a clean MERN stack workflow built for citizens and administrators.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary" to={isAuthenticated ? "/dashboard" : "/signup"}>
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className="btn-secondary" to={isAuthenticated ? "/complaints" : "/login"}>
                Track complaints
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-panel">
            <div className="space-y-4">
              {features.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4 rounded-md bg-slate-50 p-4">
                  <Icon className="mt-1 h-6 w-6 text-civic" />
                  <div>
                    <h2 className="font-semibold text-ink">{title}</h2>
                    <p className="text-sm text-slate-600">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
