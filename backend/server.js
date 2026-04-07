const app = require("./src/app");
const { connectDB } = require("./src/config/db");
const initDB = require("./src/config/initDB");
const { PORT } = require("./src/config");

async function start() {
  await connectDB();
  await initDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
  });
}

start();