const ELECTIONS_KEY = "votesure_elections";

export function readElections() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ELECTIONS_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeElections(elections) {
  localStorage.setItem(ELECTIONS_KEY, JSON.stringify(elections));
}

export function createElection(election) {
  const elections = readElections();
  const newElection = {
    ...election,
    id: Date.now().toString(),
    status: "upcoming",
    createdAt: new Date().toISOString(),
  };
  writeElections([...elections, newElection]);
  return newElection;
}

export function getElectionStatus(election) {
  const now = new Date();
  const start = new Date(election.startAt);
  const end = new Date(election.endAt);
  if (now < start) return "upcoming";
  if (now > end) return "closed";
  return "active";
}

export function countCandidates(election) {
  return election.positions.reduce((sum, p) => sum + p.candidates.length, 0);
}

export function deleteElection(id) {
  const elections = readElections();
  writeElections(elections.filter((e) => e.id !== id));
}

export function getElectionById(id) {
  return readElections().find((e) => e.id === id);
}