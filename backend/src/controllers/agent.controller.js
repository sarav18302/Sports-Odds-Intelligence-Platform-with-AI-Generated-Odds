const { getMatchesWithOdds } = require("../services/match.service");
const { answerQuery } = require("../services/agent.service");

exports.queryAgent = async (req, res) => {
  try {
    const { query } = req.body;

    const matches = await getMatchesWithOdds();

    const answer = answerQuery(query, matches);

    res.json({ answer });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};