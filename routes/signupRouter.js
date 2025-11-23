const { Router } = require("express");
const router = Router();
const signupController = require("../controllers/signupController");
const { body } = require("express-validator");

router.get("/", signupController.renderSignUpForm);
router.post("/", 
    [
        body("password")
            .isLength({min: 5}).withMessage("Password must be at least 5 characters long"),

        body("confirmPassword")
            .custom((value, {req}) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords do not match");
                }
                return true;
            })
    ], signupController.addNewUser);

module.exports = router;