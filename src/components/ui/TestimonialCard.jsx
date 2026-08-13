import { FaQuoteLeft } from "react-icons/fa";

function initials(name) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2);
}

function TestimonialCard({ quote, name, role, org }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm p-7 h-full flex flex-col">
      <FaQuoteLeft className="text-indigo-200 text-2xl" />
      <p className="text-slate-700 leading-relaxed mt-4 flex-1">"{quote}"</p>
      <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-100">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center font-semibold text-sm shrink-0">
          {initials(name)}
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-sm">{name}</p>
          <p className="text-slate-500 text-xs">{role}, {org}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;