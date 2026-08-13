import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import VoterLayout from "../../components/layout/VoterLayout";
import StatusStamp from "../Admin/StatusStamp";
import { readElections, getElectionStatus, countCandidates } from "../../data/electionsData";
import { hasVoted } from "../../data/votesData";
import { useAuth } from "../../context/AuthContext";

function Voter() {
  const { user } = useAuth();
  const [elections, setElections] = useState([]);

  useEffect(() => {
    setElections(readElections());
  }, []);

  return (
    <VoterLayout title="My Elections">

      {elections.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 py-20 text-center">
          <p className="text-slate-900 font-semibold">No elections available yet.</p>
          <p className="text-slate-500 text-sm mt-1.5">Check back once your organization opens one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {elections.map((election) => {
            const status = getElectionStatus(election);
            const voted = hasVoted(election.id, user.email);

            return (
              <div
                key={election.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-slate-900">{election.title}</h3>
                    <StatusStamp status={status} />
                  </div>
                  <p className="text-sm text-slate-500 mt-1">
                    {election.positions.length} position{election.positions.length !== 1 ? "s" : ""} ·{" "}
                    {countCandidates(election)} candidates
                  </p>
                </div>

                {status === "active" && !voted && (
                  <Link to={`/voter/elections/${election.id}`}>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors shrink-0">
                      Vote Now
                    </button>
                  </Link>
                )}

                {status === "active" && voted && (
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                      <FaCheckCircle /> Voted
                    </span>
                    <Link to={`/results/${election.id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                      View live results
                    </Link>
                  </div>
                )}

                {status === "upcoming" && (
                  <span className="text-sm text-slate-400 shrink-0">Not open yet</span>
                )}

                {status === "closed" && (
                  <Link to={`/results/${election.id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-700 shrink-0">
                    View Results
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}

    </VoterLayout>
  );
}

export default Voter;