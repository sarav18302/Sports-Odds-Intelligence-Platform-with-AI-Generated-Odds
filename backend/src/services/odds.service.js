const axios = require("axios");
const { PYTHON_SERVICE_URL } = require("../config");
const { getCache, setCache } = require("./cache.service");

// function getCacheKey(match) {
//   return `odds:${match.team_a}:${match.team_b}:${match.team_a_rating}:${match.team_b_rating}`;
// }

function getCacheKey(match) {
    return `odds:${match.team_a}-${match.team_b}-${Number(match.team_a_rating).toFixed(2)}-${Number(match.team_b_rating).toFixed(2)}`;
  }


async function generateOdds(match) {
    const key = getCacheKey(match);
    console.log(key)
  try {
    const cached = getCache(key);

    if (cached) {
      console.log("⚡ Cache hit");
      return cached;
    }
    console.log("🐢 Cache miss → calling Python");
    const res = await axios.post(
      `${PYTHON_SERVICE_URL}/generate-odds`,
      {
        teamA: match.team_a,
        teamB: match.team_b,
        teamA_rating: match.team_a_rating,
        teamB_rating: match.team_b_rating,
      },
      {
        timeout: 2000, // important
      }
    );
    setCache(key, res.data, 60); // OK
    return res.data;

  } catch (err) {
    console.error("⚠️ Python service failed:", err.message);

    // fallback logic
    return {
      teamA_win_prob: 0.5,
      teamB_win_prob: 0.5,
      draw_prob: 0,
      odds: {
        teamA: 2.0,
        teamB: 2.0,
        draw: 0
      }
    };
  }
}

module.exports = { generateOdds };