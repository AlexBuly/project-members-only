const { Router } = require("express");
const router = Router();
const loginController = require("../controllers/loginController");

router.get("/", loginController.getUser);
router.post("/", loginController.loginUser);
router.get("/log-out", loginController.logout);

module.exports = router;