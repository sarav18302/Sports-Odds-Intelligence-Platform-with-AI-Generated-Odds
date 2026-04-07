const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors({
    origin: "*"
  }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/matches", require("./routes/match.routes"));
app.use("/health", require("./routes/health.routes"));
app.use("/auth", require("./routes/auth.routes"));
app.use("/agent", require("./routes/agent.routes"));

module.exports = app;