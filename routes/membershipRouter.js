const { Router } = require("express");
const router = Router();
const membershipController = require("../controllers/membershipController");

router.get("/", membershipController.renderMembershipPage);

module.exports = router;