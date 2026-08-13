import { motion } from "framer-motion";

function initials(name) {
  return name.split(" ").map((w) => w[0]).join("");
}

function CandidateCard({ candidate }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-slate-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0"
            style={{ backgroundColor: candidate.color }}
          >
            {initials(candidate.name)}
          </div>
          <span className="font-medium text-slate-800 text-sm">{candidate.name}</span>
        </div>
        <span className="font-bold text-slate-900 text-sm">{candidate.votes}%</span>
      </div>

      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${candidate.votes}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ backgroundColor: candidate.color }}
        />
      </div>
    </div>
  );
}

export default CandidateCard;