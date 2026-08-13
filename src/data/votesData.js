const VOTES_KEY = "votesure_votes";

function readVotes() {
  try {
    const parsed = JSON.parse(localStorage.getItem(VOTES_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeVotes(votes) {
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
}

export function hasVoted(electionId, voterEmail) {
  return readVotes().some((v) => v.electionId === electionId && v.voterEmail === voterEmail);
}

export function castVote(electionId, voterEmail, selections) {
  if (hasVoted(electionId, voterEmail)) {
    throw new Error("You have already voted in this election.");
  }
  const votes = readVotes();
  votes.push({
    id: Date.now().toString(),
    electionId,
    voterEmail,
    selections, // { positionId: candidateId }
    castAt: new Date().toISOString(),
  });
  writeVotes(votes);
}

export function tallyVotes(electionId) {
  const votes = readVotes().filter((v) => v.electionId === electionId);
  const tally = {}; // positionId -> { candidateId: count }

  votes.forEach((vote) => {
    Object.entries(vote.selections).forEach(([positionId, candidateId]) => {
      if (!tally[positionId]) tally[positionId] = {};
      tally[positionId][candidateId] = (tally[positionId][candidateId] || 0) + 1;
    });
  });

  return { totalVotes: votes.length, tally };
}