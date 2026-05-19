import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <main className="page-shell flex min-h-[70vh] items-center justify-center">
    <section className="max-w-md rounded-lg border border-slate-200 bg-white p-8 text-center shadow-panel">
      <p className="text-sm font-semibold uppercase text-civic">404</p>
      <h1 className="mt-2 text-3xl font-bold text-ink">Page not found</h1>
      <p className="mt-3 text-slate-500">The page you are looking for does not exist.</p>
      <Link className="btn-primary mt-6" to="/">Go home</Link>
    </section>
  </main>
);

export default NotFoundPage;
