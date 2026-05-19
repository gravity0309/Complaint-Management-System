import { LogOut, Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/complaints/new", label: "Register" },
  { to: "/complaints", label: "Complaints" },
  { to: "/admin", label: "Admin" }
];

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const [open, setOpen] = useState(false);
  const visibleItems = navItems.filter((item) => item.to !== "/admin" || isAdmin);

  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium ${
      isActive ? "bg-civic text-white" : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-ink">
          <ShieldCheck className="h-6 w-6 text-civic" />
          Smart CMS
        </Link>

        <button
          className="rounded-md p-2 text-slate-600 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>

        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <>
              {visibleItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={linkClass}>
                  {item.label}
                </NavLink>
              ))}
              <span className="px-2 text-sm text-slate-500">{user?.name}</span>
              <button className="btn-secondary" onClick={logout}>
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <NavLink to="/signup" className={linkClass}>
                Signup
              </NavLink>
            </>
          )}
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                {visibleItems.map((item) => (
                  <NavLink key={item.to} to={item.to} className={linkClass} onClick={() => setOpen(false)}>
                    {item.label}
                  </NavLink>
                ))}
                <button className="btn-secondary" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkClass} onClick={() => setOpen(false)}>
                  Login
                </NavLink>
                <NavLink to="/signup" className={linkClass} onClick={() => setOpen(false)}>
                  Signup
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
