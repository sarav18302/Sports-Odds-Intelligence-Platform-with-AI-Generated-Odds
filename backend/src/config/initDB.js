const fs = require("fs");
const path = require("path");
const { getDB } = require("./db");

async function initDB() {
  const pool = getDB();

  const schemaPath = path.join(__dirname, "../schema/schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");

  await pool.query(schema);

  console.log("✅ Schema initialized");
}

module.exports = initDB;