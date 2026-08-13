import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import VoterLayout from "../../components/layout/VoterLayout";
import Button from "../../components/common/Button";
import { getElectionById, getElectionStatus } from "../../data/electionsData";
import { hasVoted, castVote } from "../../data/votesData";
import { useAuth } from "../../context/AuthContext";

const CANDIDATE_COLORS = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#ec4899"];
const CONFETTI_COLORS = ["#4f46e5", "#3b82f6", "#10b981", "#f59e0b"];

function initials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function ConfettiBurst() {
  const dots = Array.from({ length: 14 });
  return (
    <div className="relative w-0 h-0 mx-auto">
      {dots.map((_, i) => {
        const angle = (i / dots.length) * 2 * Math.PI;
        const distance = 55 + (i % 3) * 20;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x, y, opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
            className="absolute top-0 left-0 w-2 h-2 rounded-full"
            style={{ backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length] }}
          />
        );
      })}
    </div>
  );
}

function CastVote() {
  const { id } = useParams();
  const { user } = useAuth();

  const [election, setElection] = useState(null);
  const [selections, setSelections] = useState({});
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setElection(getElectionById(id) || null);
  }, [id]);

  if (!election) {
    return (
      <VoterLayout title="Election not found">
        <p className="text-slate-500">This election doesn't exist or was removed.</p>
        <Link to="/voter" className="text-indigo-600 font-medium text-sm mt-4 inline-block">
          Back to My Elections
        </Link>
      </VoterLayout>
    );
  }

  const status = getElectionStatus(election);
  const alreadyVoted = hasVoted(election.id, user.email);

  if (status !== "active") {
    return (
      <VoterLayout title={election.title}>
        <p className="text-slate-500">Voting is not currently open for this election.</p>
        <Link to="/voter" className="text-indigo-600 font-medium text-sm mt-4 inline-block">
          Back to My Elections
        </Link>
      </VoterLayout>
    );
  }

  if (alreadyVoted && !submitted) {
    return (
      <VoterLayout title={election.title}>
        <div className="bg-white rounded-2xl border border-slate-200 py-16 text-center">
          <FaCheckCircle className="text-emerald-500 text-3xl mx-auto" />
          <p className="text-slate-900 font-semibold mt-4">You've already voted in this election.</p>
          <Link to="/voter" className="text-indigo-600 font-medium text-sm mt-3 inline-block">
            Back to My Elections
          </Link>
        </div>
      </VoterLayout>
    );
  }

  if (submitted) {
    return (
      <VoterLayout title={election.title}>
        <div className="bg-white rounded-2xl border border-slate-200 py-20 text-center">

          <ConfettiBurst />

          <motion.div
            initial={{ scale: 0, rotate: -25, opacity: 0 }}
            animate={{ scale: 1, rotate: -8, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.15 }}
            className="inline-flex flex-col items-center justify-center border-[3px] border-double border-emerald-600 rounded-xl px-7 py-4 text-emerald-700"
          >
            <FaCheckCircle className="text-2xl mb-1" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest">Vote Cast</span>
          </motion.div>

          <p className="text-slate-900 font-semibold mt-6">Your vote has been recorded.</p>
          <p className="text-slate-500 text-sm mt-1">Thank you for participating.</p>

          <Link to="/voter" className="inline-block mt-7">
            <Button className="bg-indigo-600 text-white">Back to My Elections</Button>
          </Link>
        </div>
      </VoterLayout>
    );
  }

  const totalPositions = election.positions.length;
  const selectedCount = Object.keys(selections).length;
  const progressPct = totalPositions === 0 ? 0 : (selectedCount / totalPositions) * 100;

  function selectCandidate(positionId, candidateId) {
    setSelections({ ...selections, [positionId]: candidateId });
  }

  function openConfirm() {
    setError("");
    const missing = election.positions.some((p) => !selections[p.id]);
    if (missing) {
      setError("Please select a candidate for every position before reviewing.");
      return;
    }
    setShowConfirm(true);
  }

  async function confirmSubmit() {
    setSubmitting(true);
    try {
      castVote(election.id, user.email, selections);
      setShowConfirm(false);
      setSubmitted(true);
    } catch (err) {
      setShowConfirm(false);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function candidateName(positionId, candidateId) {
    const position = election.positions.find((p) => p.id === positionId);
    const candidate = position?.candidates.find((c) => c.id === candidateId);
    return candidate?.name || "";
  }

  return (
    <VoterLayout title={election.title}>

      {election.description && (
        <p className="text-slate-500 -mt-4 mb-6">{election.description}</p>
      )}

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium text-slate-700">
            {selectedCount} of {totalPositions} position{totalPositions !== 1 ? "s" : ""} selected
          </span>
          <span className="text-slate-400">{Math.round(progressPct)}%</span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-linear-to-r from-indigo-600 to-blue-600 rounded-full"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="space-y-6">
        {election.positions.map((position) => (
          <div key={position.id} className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4">{position.title}</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {position.candidates.map((candidate, index) => {
                const selected = selections[position.id] === candidate.id;
                const color = CANDIDATE_COLORS[index % CANDIDATE_COLORS.length];

                return (
                  <motion.button
                    type="button"
                    key={candidate.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => selectCandidate(position.id, candidate.id)}
                    className={`relative flex flex-col items-center text-center rounded-2xl border p-4 transition-colors ${
                      selected ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selected ? "border-indigo-600" : "border-slate-300"
                      }`}
                    >
                      <AnimatePresence>
                        {selected && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="w-2.5 h-2.5 rounded-full bg-indigo-600"
                          />
                        )}
                      </AnimatePresence>
                    </span>

                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 overflow-hidden"
                      style={{ backgroundColor: color }}
                    >
                      {candidate.photo ? (
                        <img src={candidate.photo} alt={candidate.name} className="w-full h-full object-cover" />
                      ) : (
                        initials(candidate.name)
                      )}
                    </div>

                    <p className="font-medium text-slate-800 mt-3 text-sm">{candidate.name}</p>
                    {candidate.manifesto && (
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-3">
                        {candidate.manifesto}
                      </p>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 mt-6">
          {error}
        </p>
      )}

      <Button
        onClick={openConfirm}
        className="w-full bg-linear-to-r from-indigo-600 to-blue-600 text-white mt-6"
      >
        Review My Ballot
      </Button>

      {/* Confirmation modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-6"
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-md w-full p-6"
            >
              <h3 className="text-lg font-bold text-slate-900">Review your ballot</h3>
              <p className="text-sm text-slate-500 mt-1">
                Confirm your choices — this cannot be changed once submitted.
              </p>

              <div className="mt-5 space-y-3">
                {election.positions.map((position) => (
                  <div key={position.id} className="flex items-center justify-between text-sm border-b border-slate-100 pb-3 last:border-0">
                    <span className="text-slate-500">{position.title}</span>
                    <span className="font-semibold text-slate-900">
                      {candidateName(position.id, selections[position.id])}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-6">
                <Button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 bg-white border border-slate-200 text-slate-700"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={confirmSubmit}
                  disabled={submitting}
                  className="flex-1 bg-linear-to-r from-indigo-600 to-blue-600 text-white"
                >
                  {submitting ? "Submitting..." : "Confirm & Submit"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </VoterLayout>
  );
}

export default CastVote;