const { Router } = require("express");
const router = Router();
const signupController = require("../controllers/signupController");

router.get("/", signupController.renderSignUpForm);
router.post("/", signupController.addNewUser);

module.exports = router;