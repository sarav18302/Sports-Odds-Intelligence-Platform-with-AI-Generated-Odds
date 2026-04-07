function answerQuery(query, matches) {
    query = query.toLowerCase();
  
    if (!matches.length) {
      return "No matches available.";
    }
  
    // 🔥 1. Likely winner
    if (query.includes("likely") || query.includes("win")) {
      const best = matches.reduce((prev, curr) =>
        prev.probabilities.teamA > curr.probabilities.teamA ? prev : curr
      );
  
      return `${best.teams}: ${best.teams.split(" vs ")[0]} is more likely to win (${(best.probabilities.teamA * 100).toFixed(1)}%)`;
    }
  
    // 🔥 2. Close matches
    if (query.includes("close")) {
      const sorted = matches
        .map(m => ({
          ...m,
          diff: Math.abs(m.probabilities.teamA - m.probabilities.teamB)
        }))
        .sort((a, b) => a.diff - b.diff);
  
      const m = sorted[0];
  
      return `${m.teams} is the closest match with nearly equal chances.`;
    }
  
    // 🔥 3. Most predictable
    if (query.includes("predictable")) {
      const best = matches.reduce((prev, curr) =>
        prev.probabilities.teamA > curr.probabilities.teamA ? prev : curr
      );
  
      return `${best.teams} is most predictable with clear favorite.`;
    }
  
    return "I can help with predictions, close matches, or likely winners.";
  }
  
  module.exports = { answerQuery };