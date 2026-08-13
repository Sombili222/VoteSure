import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaChartPie } from "react-icons/fa";
import AdminLayout from "../../components/layout/AdminLayout";
import Button from "../../components/common/Button";
import StatusStamp from "./StatusStamp";
import { readElections, getElectionStatus, countCandidates, deleteElection } from "../../data/electionsData";

const PAGE_SIZE = 5;

function formatWindow(startAt, endAt) {
  const opts = { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
  const start = new Date(startAt).toLocaleString(undefined, opts);
  const end = new Date(endAt).toLocaleString(undefined, opts);
  return `${start} — ${end}`;
}

function ElectionsList() {
  const [elections, setElections] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setElections(readElections());
  }, []);

  function handleDelete(id, title) {
    const confirmed = window.confirm(`Delete "${title}"? This cannot be undone.`);
    if (!confirmed) return;
    deleteElection(id);
    const updated = readElections();
    setElections(updated);

    // if deleting the last item on a page pushes the page out of range, step back one page
    const newTotalPages = Math.max(1, Math.ceil(updated.length / PAGE_SIZE));
    if (page > newTotalPages) setPage(newTotalPages);
  }

  const totalPages = Math.max(1, Math.ceil(elections.length / PAGE_SIZE));
  const startIndex = (page - 1) * PAGE_SIZE;
  const visibleElections = elections.slice(startIndex, startIndex + PAGE_SIZE);

  function goToPage(nextPage) {
    if (nextPage < 1 || nextPage > totalPages) return;
    setPage(nextPage);
  }

  return (
    <AdminLayout title="Elections">

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">
          {elections.length} election{elections.length !== 1 ? "s" : ""} on record
        </p>
        <Link to="/admin/elections/create">
          <Button className="bg-indigo-600 text-white">+ New Election</Button>
        </Link>
      </div>

      {elections.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 py-20 text-center">
          <p className="text-slate-900 font-semibold">No elections yet.</p>
          <p className="text-slate-500 text-sm mt-1.5 max-w-sm mx-auto">
            Every ballot starts here. Set up positions, add candidates, and open the vote.
          </p>
          <Link to="/admin/elections/create" className="inline-block mt-6">
            <Button className="bg-indigo-600 text-white">Create your first election</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">

          <div className="overflow-x-auto overflow-y-auto max-h-[60vh]">
            <table className="w-full min-w-215 text-sm">
              <thead className="sticky top-0 z-10 bg-white">
                <tr className="border-b border-slate-100 text-left">
                  <th className="py-3.5 px-6 font-medium text-slate-400 text-xs uppercase tracking-wide bg-white">Election</th>
                  <th className="py-3.5 px-6 font-medium text-slate-400 text-xs uppercase tracking-wide bg-white whitespace-nowrap">Voting window</th>
                  <th className="py-3.5 px-6 font-medium text-slate-400 text-xs uppercase tracking-wide bg-white">Positions</th>
                  <th className="py-3.5 px-6 font-medium text-slate-400 text-xs uppercase tracking-wide bg-white">Candidates</th>
                  <th className="py-3.5 px-6 font-medium text-slate-400 text-xs uppercase tracking-wide bg-white">Status</th>
                  <th className="py-3.5 px-6 font-medium text-slate-400 text-xs uppercase tracking-wide bg-white w-28">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleElections.map((election) => (
                  <tr key={election.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-semibold text-slate-900">{election.title}</p>
                      {election.description && (
                        <p className="text-slate-400 text-xs mt-0.5 truncate max-w-xs">{election.description}</p>
                      )}
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-slate-600 tabular-nums whitespace-nowrap">
                      {formatWindow(election.startAt, election.endAt)}
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-700 tabular-nums">{election.positions.length}</td>
                    <td className="py-4 px-6 font-mono text-slate-700 tabular-nums">{countCandidates(election)}</td>
                    <td className="py-4 px-6">
                      <StatusStamp status={getElectionStatus(election)} />
                    </td>
                    <td className="py-4 px-6 text-right w-28">
                      <div className="flex items-center justify-end gap-4">
                        <Link
                          to={`/results/${election.id}`}
                          className="w-8 h-8 inline-flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                          title="View results"
                        >
                          <FaChartPie className="text-sm" />
                        </Link>
                        <button
                          onClick={() => handleDelete(election.id, election.title)}
                          className="w-8 h-8 inline-flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete election"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
              <p className="text-xs text-slate-400">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNumber = i + 1;
                  const active = pageNumber === page;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? "bg-indigo-600 text-white"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </AdminLayout>
  );
}

export default ElectionsList;