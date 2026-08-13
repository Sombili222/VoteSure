import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../common/Button";

function PricingCard({ name, price, period, description, features, popular, ctaLabel }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className={`
        relative rounded-3xl p-8 flex flex-col h-full
        ${popular
          ? "bg-gradient-to-b from-indigo-600 to-blue-600 text-white shadow-2xl shadow-indigo-500/30 lg:scale-105"
          : "bg-white border border-slate-200/70 shadow-sm"}
      `}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-indigo-600 text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
          Most Popular
        </span>
      )}

      <h3 className={`text-lg font-semibold ${popular ? "text-indigo-100" : "text-slate-500"}`}>
        {name}
      </h3>

      <div className="flex items-end gap-1 mt-3">
        <span className={`text-4xl font-black ${popular ? "text-white" : "text-slate-900"}`}>
          {price}
        </span>
        {period && (
          <span className={`text-sm mb-1 ${popular ? "text-indigo-100" : "text-slate-400"}`}>
            /{period}
          </span>
        )}
      </div>

      <p className={`mt-3 text-sm leading-relaxed ${popular ? "text-indigo-100" : "text-slate-500"}`}>
        {description}
      </p>

      <ul className="mt-6 space-y-3 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <FaCheck className={`mt-0.5 shrink-0 ${popular ? "text-indigo-200" : "text-indigo-600"}`} />
            <span className={popular ? "text-indigo-50" : "text-slate-600"}>{f}</span>
          </li>
        ))}
      </ul>

      <Link to="/register" className="mt-8">
        <Button
          className={`w-full ${
            popular
              ? "bg-white text-indigo-600"
              : "bg-slate-900 text-white"
          }`}
        >
          {ctaLabel}
        </Button>
      </Link>
    </motion.div>
  );
}

export default PricingCard;