import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import StatCard from "../../components/ui/StatCard";
import StatusStamp from "./StatusStamp";
import Button from "../../components/common/Button";
import { readElections, getElectionStatus, countCandidates } from "../../data/electionsData";

function Overview() {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    setElections(readElections());
  }, []);

  const totalElections = elections.length;
  const activeNow = elections.filter((e) => getElectionStatus(e) === "active").length;
  const positionsOpen = elections.reduce((sum, e) => sum + e.positions.length, 0);
  const candidatesRegistered = elections.reduce((sum, e) => sum + countCandidates(e), 0);

  const sortedByNewest = [...elections].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const latest = sortedByNewest[0];
  const recent = sortedByNewest.slice(0, 5);

  return (
    <AdminLayout title="Overview">

      <div className="flex items-center justify-between mb-6">
        <p className="text-slate-500 text-sm">Manage your elections and voters</p>
        <Link to="/admin/elections/create">
          <Button className="bg-indigo-600 text-white">+ Create Election</Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Elections" value={String(totalElections)} />
        <StatCard title="Active Now" value={String(activeNow)} />
        <StatCard title="Positions Open" value={String(positionsOpen)} />
        <StatCard title="Candidates Registered" value={String(candidatesRegistered)} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-8">

        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Recent Elections</h3>
            <Link to="/admin/elections" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              View all →
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className="py-16 text-center px-6">
              <p className="text-slate-900 font-semibold">No elections yet.</p>
              <p className="text-slate-500 text-sm mt-1.5">Create one to see it show up here.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <tbody>
                {recent.map((election) => (
                  <tr key={election.id} className="border-b border-slate-50 last:border-0">
                    <td className="py-3.5 px-6 font-medium text-slate-800">{election.title}</td>
                    <td className="py-3.5 px-6 font-mono text-xs text-slate-500 tabular-nums">
                      {countCandidates(election)} candidates
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <StatusStamp status={getElectionStatus(election)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400">Latest Election</p>

          {latest ? (
            <>
              <h3 className="text-xl font-bold mt-2">{latest.title}</h3>
              <p className="text-slate-400 text-sm mt-1">
                {latest.positions.length} position{latest.positions.length !== 1 ? "s" : ""} ·{" "}
                {countCandidates(latest)} candidates
              </p>

              <div className="mt-6">
                <StatusStamp status={getElectionStatus(latest)} />
              </div>

              <Link to="/admin/elections" className="mt-auto pt-8">
                <span className="text-sm font-medium text-indigo-300 hover:text-indigo-200">
                  View details →
                </span>
              </Link>
            </>
          ) : (
            <p className="text-slate-400 text-sm mt-4">
              Nothing published yet. Your most recent election will appear here.
            </p>
          )}
        </div>

      </div>

    </AdminLayout>
  );
}

export default Overview;