import { motion } from "framer-motion";
import { FaShieldAlt, FaCheckCircle, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="fixed inset-0 flex overflow-hidden bg-white">

      {/* Left: fixed to viewport height, only the form area scrolls */}
      <div className="w-full lg:w-1/2 h-full flex flex-col">

        <div className="px-6 sm:px-12 lg:px-16 pt-8 shrink-0">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-md shadow-indigo-500/25">
              <FaShieldAlt className="text-white text-sm" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">VoteSure</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-6 sm:px-12 lg:px-16 py-8 ">
          <div className="max-w-md w-full mx-auto ">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-3xl font-black text-slate-900">{title}</h1>
              {subtitle && <p className="text-slate-500 mt-2">{subtitle}</p>}
              <div className="mt-8">{children}</div>
            </motion.div>
          </div>
        </div>

      </div>

      {/* Right: fixed 50%, no scroll */}
      <div className="hidden lg:flex w-1/2 h-screen relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-blue-600 items-center justify-center">

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="relative max-w-md px-10 text-center">

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center mx-auto"
          >
            <FaShieldAlt className="text-white text-3xl" />
          </motion.div>

          <h2 className="text-3xl font-black text-white mt-8 leading-tight">
            Elections people actually trust.
          </h2>
          <p className="text-indigo-100 mt-4 leading-relaxed">
            End-to-end encrypted voting, verified voters, and results you can watch happen live.
          </p>

          <div className="grid grid-cols-1 gap-3 mt-10 text-left">
            {[
              { icon: FaLock, text: "End-to-end encrypted ballots" },
              { icon: FaCheckCircle, text: "Verified voter identity" },
              { icon: FaShieldAlt, text: "Tamper-evident audit trail" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3">
                <item.icon className="text-white text-sm shrink-0" />
                <span className="text-white text-sm">{item.text}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}

export default AuthLayout;