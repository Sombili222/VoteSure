import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTrophy, FaArrowLeft } from "react-icons/fa";
import AdminLayout from "../../components/layout/AdminLayout";
import VoterLayout from "../../components/layout/VoterLayout";
import StatusStamp from "../Admin/StatusStamp";
import { getElectionById, getElectionStatus } from "../../data/electionsData";
import { tallyVotes } from "../../data/votesData";
import { useAuth } from "../../context/AuthContext";

const BAR_COLORS = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#ec4899"];

function initials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function Results() {
  const { id } = useParams();
  const { user } = useAuth();

  const [election, setElection] = useState(null);
  const [tally, setTally] = useState({ totalVotes: 0, tally: {} });

  useEffect(() => {
    const found = getElectionById(id);
    setElection(found || null);
    if (found) {
      setTally(tallyVotes(found.id));
    }
  }, [id]);

  const Layout = user?.role === "admin" ? AdminLayout : VoterLayout;
  const backTo = user?.role === "admin" ? "/admin/elections" : "/voter";

  if (!election) {
    return (
      <Layout title="Results">
        <p className="text-slate-500">This election doesn't exist or was removed.</p>
        <Link to={backTo} className="text-indigo-600 font-medium text-sm mt-4 inline-block">
          <FaArrowLeft className="inline mr-1.5 text-xs" /> Back
        </Link>
      </Layout>
    );
  }

  const status = getElectionStatus(election);

  if (status === "upcoming") {
    return (
      <Layout title={election.title}>
        <div className="bg-white rounded-2xl border border-slate-200 py-16 text-center">
          <p className="text-slate-900 font-semibold">Voting hasn't started yet.</p>
          <p className="text-slate-500 text-sm mt-1.5">Results will appear here once voting opens.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={election.title}>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <StatusStamp status={status} />
          <span className="text-sm text-slate-500 font-mono tabular-nums">
            {tally.totalVotes} vote{tally.totalVotes !== 1 ? "s" : ""} cast
          </span>
        </div>
        {status === "active" && (
          <span className="text-xs text-slate-400 font-mono uppercase tracking-widest">
            Live — updates as votes come in
          </span>
        )}
      </div>

      <div className="space-y-6">
        {election.positions.map((position) => {
          const positionTally = tally.tally[position.id] || {};
          const positionTotal = Object.values(positionTally).reduce((sum, n) => sum + n, 0);

          const ranked = [...position.candidates].sort(
            (a, b) => (positionTally[b.id] || 0) - (positionTally[a.id] || 0)
          );
          const topVotes = ranked.length > 0 ? positionTally[ranked[0].id] || 0 : 0;

          return (
            <div key={position.id} className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-5">{position.title}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ranked.map((candidate, index) => {
                  const votes = positionTally[candidate.id] || 0;
                  const pct = positionTotal === 0 ? 0 : (votes / positionTotal) * 100;
                  const isWinner = status === "closed" && topVotes > 0 && votes === topVotes;
                  const color = BAR_COLORS[index % BAR_COLORS.length];

                  return (
                    <div
                      key={candidate.id}
                      className={`rounded-2xl border p-4 ${
                        isWinner ? "border-amber-300 bg-amber-50" : "border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0 overflow-hidden"
                          style={{ backgroundColor: color }}
                        >
                          {candidate.photo ? (
                            <img src={candidate.photo} alt={candidate.name} className="w-full h-full object-cover" />
                          ) : (
                            initials(candidate.name)
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-800 text-sm truncate">{candidate.name}</p>
                          <p className="font-mono text-xs text-slate-500 tabular-nums">
                            {votes} vote{votes !== 1 ? "s" : ""} · {Math.round(pct)}%
                          </p>
                        </div>

                        {isWinner && (
                          <span className="flex items-center gap-1 text-amber-600 text-xs font-semibold shrink-0">
                            <FaTrophy className="text-[10px]" />
                          </span>
                        )}
                      </div>

                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </Layout>
  );
}

export default Results;