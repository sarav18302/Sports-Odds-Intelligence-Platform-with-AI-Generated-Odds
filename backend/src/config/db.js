const { Pool } = require("pg");
const { DB_URL } = require("./index");

let pool;

function extractDBName(url) {
  return url.split("/").pop();
}

function getBaseURL(url) {
  return url.substring(0, url.lastIndexOf("/"));
}

async function ensureDatabaseExists() {
  const dbName = extractDBName(DB_URL);
  const baseURL = getBaseURL(DB_URL);

  const tempPool = new Pool({
    connectionString: baseURL + "/postgres", // connect to default DB
  });

  const result = await tempPool.query(
    "SELECT 1 FROM pg_database WHERE datname=$1",
    [dbName]
  );

  if (result.rowCount === 0) {
    console.log(`📦 Creating database: ${dbName}`);
    await tempPool.query(`CREATE DATABASE ${dbName}`);
  } else {
    console.log("✅ Database already exists");
  }

  await tempPool.end();
}

async function connectDB(retries = 5, delay = 3000) {
  while (retries) {
    try {
      await ensureDatabaseExists();

      pool = new Pool({
        connectionString: DB_URL,
      });

      await pool.query("SELECT 1");

      console.log("✅ DB connected");
      return;
    } catch (err) {
      console.log("Retrying DB...", err.message);
      retries--;

      if (!retries) {
        console.error("❌ DB failed");
        process.exit(1);
      }

      await new Promise(res => setTimeout(res, delay));
    }
  }
}

function getDB() {
  if (!pool) throw new Error("DB not initialized");
  return pool;
}

module.exports = { connectDB, getDB };