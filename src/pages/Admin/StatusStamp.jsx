const STYLES = {
  active: "text-emerald-700 border-emerald-600",
  upcoming: "text-amber-700 border-amber-600",
  closed: "text-slate-500 border-slate-400",
};

const LABELS = {
  active: "Active",
  upcoming: "Upcoming",
  closed: "Closed",
};

function StatusStamp({ status }) {
  return (
    <span
      className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md border-[3px] border-double -rotate-2 font-mono text-[10px] font-bold uppercase tracking-widest ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}

export default StatusStamp;