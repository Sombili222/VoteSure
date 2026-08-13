import ProgressCircle from "./Hero/ProgressCircle";
import StatCard from "./StatCard";
import CandidateCard from "./CandidateCard";

import {
  stats,
  candidates,
} from "../../data/dashboardData";

function DashboardCard() {
  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 overflow-hidden">

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left */}

        <div className="lg:col-span-2">

          <div className="grid grid-cols-2 gap-5">

            {stats.map((stat) => (
              <StatCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
              />
            ))}

          </div>

          <div className="mt-8 bg-slate-50 rounded-2xl p-6">

            <h3 className="text-xl font-bold text-slate-900">
              Candidate Standings
            </h3>

            <div className="mt-6 space-y-4">

              {candidates.map((candidate) => (

                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                />

              ))}

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white">

        <h3 className="text-xl font-bold">
            Live Election
        </h3>

        <p className="text-slate-300 mt-2">
            Student Union President
        </p>

        <div className="flex justify-center mt-8">

            <ProgressCircle
            percentage={82}
            size={170}
            strokeWidth={10}
            color="#3B82F6"
            small  />

        </div>

            <div className="grid grid-cols-2 gap-4 mt-10">

                <div className="bg-white/10 rounded-xl p-4">

                <p className="text-slate-300 text-sm">
                    Votes Cast
                </p>

                <h2 className="text-2xl font-bold mt-1">
                    24,875
                </h2>

                </div>

                <div className="bg-white/10 rounded-xl p-4">

                <p className="text-slate-300 text-sm">
                    Time Left
                </p>

                <h2 className="text-2xl font-bold mt-1">
                    3h 24m
                </h2>

                </div>

            </div>

            <div className="mt-8 bg-green-500/20 border border-green-400/30 rounded-xl p-4">

                <p className="text-green-300 font-semibold">
                ● Election Active
                </p>

            </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardCard;