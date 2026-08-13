import { motion } from "framer-motion";
import { FaLock, FaUserCheck, FaBolt, FaCheckCircle } from "react-icons/fa";
import Reveal from "../common/Reveal";

const trustItems = [
  { id: 1, icon: FaLock, title: "End-to-End Encryption" },
  { id: 2, icon: FaUserCheck, title: "Verified Voters" },
  { id: 3, icon: FaBolt, title: "Real-Time Results" },
  { id: 4, icon: FaCheckCircle, title: "Transparent Counting" },
];

function Trust() {
  return (
    <section id="trust" className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <Reveal>
          <p className="text-center text-3xl lg:text-5xl font-bold text-slate-900">
            Trusted For Secure Digital Elections
          </p>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {trustItems.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="flex items-center justify-center gap-3 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 p-5 h-full transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-50 to-blue-100 flex items-center justify-center shadow-inner shrink-0">
                  <item.icon className="text-indigo-600 text-xl" />
                </div>
                <p className="font-semibold text-slate-800 text-sm lg:text-base">
                  {item.title}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Trust;