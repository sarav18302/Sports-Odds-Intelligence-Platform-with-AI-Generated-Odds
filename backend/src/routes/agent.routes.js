const router = require("express").Router();
const controller = require("../controllers/agent.controller");

router.post("/query", controller.queryAgent);

module.exports = router;