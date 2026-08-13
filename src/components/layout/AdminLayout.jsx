import { useState, useEffect} from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShieldAlt, FaChartPie, FaVoteYea, FaBars, FaTimes, FaSignOutAlt, FaPlus,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { readElections } from "../../data/electionsData";

const NAV_ITEMS = [
  { label: "Overview", to: "/admin", icon: FaChartPie },
  { label: "Elections", to: "/admin/elections", icon: FaVoteYea },
];

function SidebarContent({ onNavigate }) {
  const { user, logout } = useAuth();
  const [electionCount, setElectionCount] = useState(0);

  useEffect(() => {
    setElectionCount(readElections().length);
  }, []);

  function initials(name = "") {
    return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  }

  return (
    <div className="flex flex-col h-full">

      <Link to="/" className="flex items-center gap-2.5 px-6 py-6">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-md shadow-indigo-500/25">
          <FaShieldAlt className="text-white text-sm" />
        </div>
        <span className="text-xl font-extrabold text-slate-900 tracking-tight">VoteSure</span>
      </Link>

      <div className="px-6 mb-2">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Main</p>
      </div>

      <nav className="px-3 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/admin"}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            <item.icon className="text-base shrink-0" />
            <span className="flex-1">{item.label}</span>
            {item.label === "Elections" && electionCount > 0 && (
              <span className="text-[11px] font-mono font-semibold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md tabular-nums">
                {electionCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="flex-1" />

      <div className="px-3 mb-4">
        <Link
          to="/admin/elections/create"
          onClick={onNavigate}
          className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/20 hover:shadow-lg transition-shadow"
        >
          <span className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
            <FaPlus className="text-xs" />
          </span>
          <span className="text-sm font-semibold">New Election</span>
        </Link>
      </div>

      <div className="px-3 pb-5 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3.5 py-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center text-xs font-semibold shrink-0">
            {initials(user?.name)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{user?.name}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3.5 py-2.5 mt-1 w-full rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <FaSignOutAlt className="text-base" />
          Log out
        </button>
      </div>

    </div>
  );
}

function AdminLayout({ children, title }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="h-screen flex bg-slate-50 overflow-hidden">

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-white border-r border-slate-100 h-full">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 w-72 h-full bg-white z-50 lg:hidden"
            >
              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main column */}
      <div className="flex-1 h-full flex flex-col min-w-0">

        <header className="h-16 shrink-0 bg-white border-b border-slate-100 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center text-slate-600"
            >
              <FaBars />
            </button>
            <h1 className="text-lg font-bold text-slate-900">{title}</h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;