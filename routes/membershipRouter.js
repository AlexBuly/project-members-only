const { Router } = require("express");
const router = Router();
const membershipController = require("../controllers/membershipController");

router.get("/", membershipController.renderMembershipPage);
router.post("/", membershipController.addMembership);

module.exports = router;