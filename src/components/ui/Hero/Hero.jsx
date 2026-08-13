import {
  FaLandmark,
  FaUsers,
  FaVoteYea,
  FaGlobeAmericas,
  FaShieldAlt,
} from "react-icons/fa";
import HeroText from "./HeroText";
import HeroVisual from "./HeroVisual";

const STATS = [
  { icon: FaLandmark, number: "250+", label: "Organizations" },
  { icon: FaUsers, number: "1.2M+", label: "Verified Voters" },
  { icon: FaVoteYea, number: "3,450+", label: "Elections" },
  { icon: FaGlobeAmericas, number: "12+", label: "Countries" },
  { icon: FaShieldAlt, number: "99.9%", label: "Uptime" },
];

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-50">

      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <HeroText />
          <HeroVisual />
        </div>

        {/* Bottom Stats — static, no auto-scroll */}
        <div className="mt-16 bg-white/70 backdrop-blur-xl border border-white rounded-3xl shadow-xl">
          <div className="grid grid-cols-2 lg:grid-cols-5">
            {STATS.map((stat) => (
              <Stat key={stat.label} icon={stat.icon} number={stat.number} label={stat.label} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function Stat({ icon: Icon, number, label }) {
  return (
    <div className="flex items-center gap-4 p-6 border-b lg:border-b-0 lg:border-r last:border-r-0 border-slate-200">
      <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
        <Icon className="text-indigo-600 text-lg" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-900">{number}</h3>
        <p className="text-slate-500">{label}</p>
      </div>
    </div>
  );
}

export default Hero;