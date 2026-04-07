const { getDB } = require("../config/db");
const queries = require("../queries/match.queries");
const { generateOdds } = require("../services/odds.service");

exports.createMatch = async (req, res) => {
  try {
    const pool = getDB();
    const {
      sport, league, team_a, team_b,
      team_a_rating, team_b_rating, start_time
    } = req.body;

    const result = await pool.query(
      queries.CREATE_MATCH,
      [sport, league, team_a, team_b, team_a_rating, team_b_rating, start_time]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.getMatches = async (req, res) => {
//   try {
//     const pool = getDB();
//     const result = await pool.query(queries.GET_ALL_MATCHES);

//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.getMatches = async (req, res) => {
    try {
      const pool = getDB();
      const result = await pool.query(queries.GET_ALL_MATCHES);
  
      const matches = result.rows;
  
      const enriched = await Promise.all(
        matches.map(async (m) => {
          const oddsData = await generateOdds(m);
  
          return {
            id: m.id,
            teams: `${m.team_a} vs ${m.team_b}`,
            start_time: m.start_time,
            odds: oddsData.odds,
            probabilities: {
              teamA: oddsData.teamA_win_prob,
              teamB: oddsData.teamB_win_prob,
              draw: oddsData.draw_prob
            }
          };
        })
      );
  
      res.json(enriched);
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

exports.getMatchById = async (req, res) => {
  try {
    const pool = getDB();
    const result = await pool.query(
      queries.GET_MATCH_BY_ID,
      [req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMatch = async (req, res) => {
  try {
    const pool = getDB();
    const { team_a_rating, team_b_rating } = req.body;

    const result = await pool.query(
      queries.UPDATE_MATCH,
      [team_a_rating, team_b_rating, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMatch = async (req, res) => {
  try {
    const pool = getDB();

    await pool.query(
      queries.DELETE_MATCH,
      [req.params.id]
    );

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};