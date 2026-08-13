import { motion } from "framer-motion";

function FeatureCard({ icon: Icon, title, description, large, children }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className={`
        relative bg-white rounded-3xl border border-slate-200/70 shadow-sm hover:shadow-xl hover:border-indigo-100
        p-8 overflow-hidden
        ${large ? "flex flex-col lg:flex-row lg:items-center gap-8" : "flex flex-col"}
      `}
    >
      <div className={large ? "lg:flex-1" : ""}>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center shadow-inner">
          <Icon className="text-indigo-600 text-xl" />
        </div>
        <h3 className={`font-bold text-slate-900 mt-5 ${large ? "text-2xl" : "text-lg"}`}>
          {title}
        </h3>
        <p className="text-slate-500 mt-2 leading-relaxed">{description}</p>
      </div>

      {children && (
        <div className={large ? "lg:flex-1 lg:max-w-sm w-full" : "mt-6"}>
          {children}
        </div>
      )}
    </motion.div>
  );
}

export default FeatureCard;