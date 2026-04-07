const { getDB } = require("../config/db");
const queries = require("../queries/match.queries");
const { generateOdds } = require("./odds.service");

async function getMatchesWithOdds() {
  const pool = getDB();
  const result = await pool.query(queries.GET_ALL_MATCHES);

  const matches = result.rows;

  const enriched = await Promise.all(
    matches.map(async (m) => {
      const oddsData = await generateOdds(m);

      return {
        id: m.id,
        teams: `${m.team_a} vs ${m.team_b}`,
        probabilities: {
          teamA: oddsData.teamA_win_prob,
          teamB: oddsData.teamB_win_prob,
          draw: oddsData.draw_prob
        }
      };
    })
  );

  return enriched;
}

module.exports = { getMatchesWithOdds };