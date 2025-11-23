const pool = require("../db/pool");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const addNewUser = async (req, res, next) => {
    const errors = validationResult(req);
    const {first_name, last_name, username, password} = req.body;

     if (!errors.isEmpty()) {
        return res.status(400).render("sign-up-form", {
            title: "Sign Up",
            errors: errors.array(),
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            "INSERT INTO Users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
            [first_name, last_name, username, hashedPassword]
        );
        res.redirect("/login");
    } catch (err) {
        next(err);
    }
}

const renderSignUpForm = (req, res) => {
    res.render("sign-up-form", {
        title: "Sign Up",
        errors: []
    })
};

module.exports = {
    addNewUser,
    renderSignUpForm
}