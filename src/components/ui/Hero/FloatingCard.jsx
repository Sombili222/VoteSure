import { motion } from "framer-motion";

function FloatingCard({ icon: Icon, title, value, trend, badge, position }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={`
        absolute ${position} z-30 w-48 p-4 rounded-2xl
        bg-white/70 backdrop-blur-xl
        border border-white/60
        shadow-[0_8px_30px_rgba(79,70,229,0.15),inset_0_1px_0_rgba(255,255,255,0.9)]
      `}
    >
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-indigo-100/80 backdrop-blur-sm flex items-center justify-center shrink-0">
          <Icon className="text-indigo-600 text-lg" />
        </div>
        <div>
          <p className="text-xs text-gray-500">{title}</p>
          {badge ? (
            <span className="inline-block text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
              {value}
            </span>
          ) : (
            <h3 className="font-bold text-slate-900 leading-tight">{value}</h3>
          )}
        </div>
      </div>
      {trend && !badge && (
        <p className="text-xs font-medium text-emerald-500 mt-2">{trend}</p>
      )}
    </motion.div>
  );
}

export default FloatingCard;