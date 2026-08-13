import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

function parseValue(value) {
  const match = value.match(/^([\d,]+)(.*)$/);
  if (!match) return { number: null, suffix: value };
  return { number: parseInt(match[1].replace(/,/g, ""), 10), suffix: match[2] };
}

function StatCard({ title, value }) {
  const numRef = useRef(null);
  const { number, suffix } = parseValue(value);

  useEffect(() => {
    if (number === null || !numRef.current) return;

    const counter = { count: 0 };

    gsap.to(counter, {
      count: number,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        numRef.current.textContent = Math.round(counter.count).toLocaleString() + suffix;
      },
    });
  }, [number, suffix]);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-800 p-5 shadow-sm hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-900 transition-shadow"
    >
      <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
      <h3 ref={numRef} className="text-3xl font-black text-slate-900 dark:text-white mt-2">
        {number === null ? value : "0" + suffix}
      </h3>
    </motion.div>
  );
}

export default StatCard;