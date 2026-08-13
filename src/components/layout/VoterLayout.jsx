import { Link } from "react-router-dom";
import { FaShieldAlt, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function initials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function VoterLayout({ children, title }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">

      <header className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-md shadow-indigo-500/25">
              <FaShieldAlt className="text-white text-sm" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">VoteSure</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center text-xs font-semibold">
                {initials(user?.name)}
              </div>
              <span className="text-sm font-medium text-slate-700">{user?.name}</span>
            </div>
            <button
              onClick={logout}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
              title="Log out"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {title && <h1 className="text-2xl font-black text-slate-900 mb-6">{title}</h1>}
        {children}
      </main>

    </div>
  );
}

export default VoterLayout;