const { Router } = require("express");
const router = Router();
const adminController = require("../controllers/adminController");

router.get("/", adminController.renderAdminPage);
router.post("/", adminController.addAdmin);

module.exports = router;