import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaShieldAlt, FaBars, FaTimes } from "react-icons/fa";
import Button from "../common/Button";

const LINKS = [
  { label: "Home", to: "/", type: "link" },
  { label: "Features", to: "#features", type: "anchor" },
  { label: "How It Works", to: "#how-it-works", type: "anchor" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-white/60 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-md shadow-indigo-500/25">
            <FaShieldAlt className="text-white text-sm" />
          </div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">
            VoteSure
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-9">
          {LINKS.map((item) => {
            const isActive = item.type === "link" && location.pathname === item.to;
            const Tag = item.type === "link" ? Link : "a";
            const props = item.type === "link" ? { to: item.to } : { href: item.to };

            return (
              <Tag
                key={item.label}
                {...props}
                className="relative text-[15px] text-slate-600 hover:text-slate-900 transition-colors py-1"
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-indigo-600 rounded-full"
                  />
                )}
              </Tag>
            );
          })}
        </div>

        {/* Desktop buttons */}
        <div className="hidden lg:flex gap-3">
          <Link to="/login">
            <Button className="border border-slate-200 text-slate-700 bg-white hover:border-slate-300">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/30">
              Register
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-700"
          aria-label="Toggle menu"
        >
          {open ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-white border-b border-slate-100"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {LINKS.map((item) => {
                const Tag = item.type === "link" ? Link : "a";
                const props = item.type === "link" ? { to: item.to } : { href: item.to };
                return (
                  <Tag
                    key={item.label}
                    {...props}
                    onClick={() => setOpen(false)}
                    className="text-[16px] font-medium text-slate-700"
                  >
                    {item.label}
                  </Tag>
                );
              })}
              <div className="flex flex-col gap-3 mt-2">
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button className="w-full border border-slate-200 text-slate-700 bg-white">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md">
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;