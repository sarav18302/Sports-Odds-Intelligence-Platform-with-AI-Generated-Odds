const router = require("express").Router();
const controller = require("../controllers/match.controller");
const auth = require("../middleware/auth.middleware");
router.post("/",auth, controller.createMatch);
router.get("/", auth, controller.getMatches);
router.get("/:id", auth, controller.getMatchById);
router.put("/:id", auth, controller.updateMatch);
router.delete("/:id", auth, controller.deleteMatch);

module.exports = router;