import { motion } from "framer-motion";

function StepCard({ number, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="relative bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md text-center"
    >
      <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto text-xl font-bold shadow-md shadow-indigo-500/25">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mt-5">{title}</h3>
      <p className="text-slate-500 mt-3 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default StepCard;