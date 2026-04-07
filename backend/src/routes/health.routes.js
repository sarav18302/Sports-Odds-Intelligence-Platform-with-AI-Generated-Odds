// TODO : API Live Check, DB Connection readiness Check

const router = require("express").Router();
const { getDB } = require("../config/db");

router.get("/", async (req, res) => {
  const start = Date.now();

  try {
    const pool = getDB();

    await pool.query("SELECT 1"); // DB check

    const latency = Date.now() - start;

    res.json({
      status: "ok",
      service: "sports-odds-backend",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: {
        status: "connected",
        latency_ms: latency
      }
    });

  } catch (err) {
    res.status(500).json({
      status: "error",
      service: "sports-odds-backend",
      database: {
        status: "disconnected",
        error: err.message
      }
    });
  }
});

module.exports = router;