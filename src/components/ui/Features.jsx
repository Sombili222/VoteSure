import {
  FaLock,
  FaMobileAlt,
  FaChartLine,
  FaUsersCog,
  FaFileExport,
} from "react-icons/fa";
import Reveal from "../common/Reveal";
import FeatureCard from "./FeatureCard";

function LiveResultsMock() {
  const bars = [
    { name: "Adaeze O.", pct: 62, color: "bg-indigo-600" },
    { name: "Chidi N.", pct: 38, color: "bg-blue-400" },
  ];
  return (
    <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-slate-500">President — Live</span>
        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Counting
        </span>
      </div>
      {bars.map((b) => (
        <div key={b.name} className="mb-3 last:mb-0">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-700 font-medium">{b.name}</span>
            <span className="text-slate-500">{b.pct}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div className={`h-full ${b.color} rounded-full`} style={{ width: `${b.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
            Features
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3">
            Everything an election needs
          </h2>
          <p className="text-slate-500 mt-5 leading-7">
            Built for organizations that can't afford to get an election wrong.
          </p>
        </Reveal>

        <div className="mt-16 space-y-6">

            <Reveal>
                <FeatureCard
                large
                icon={FaChartLine}
                title="Real-time, tamper-evident results"
                description="Every vote is counted the moment it's cast. Results update live and every count is cryptographically verifiable — no waiting, no black box."
                >
                <LiveResultsMock />
                </FeatureCard>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <Reveal delay={0.1}>
                <FeatureCard
                    icon={FaLock}
                    title="Secure vote storage"
                    description="Every vote is tied to a verified voter and locked once submitted — no edits, no resubmissions."
                />
                </Reveal>

                <Reveal delay={0.15}>
                <FeatureCard
                    icon={FaMobileAlt}
                    title="Vote from any device"
                    description="No app to install. Fully responsive voting on phone, tablet, or desktop."
                />
                </Reveal>

                <Reveal delay={0.2}>
                <FeatureCard
                    icon={FaUsersCog}
                    title="Verified voter rolls"
                    description="Upload voter lists once — VoteSure handles identity checks and duplicate prevention."
                />
                </Reveal>

                <Reveal delay={0.25}>
                <FeatureCard
                    icon={FaFileExport}
                    title="Exportable audit trail"
                    description="Download a full, timestamped record of every election for compliance or dispute resolution."
                />
                </Reveal>

            </div>

        </div>
      </div>
    </section>
  );
}

export default Features;