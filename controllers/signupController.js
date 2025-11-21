const pool = require("../db/pool");
const bcrypt = require("bcryptjs");

const addNewUser = async (req, res, next) => {
    const {first_name, last_name, username, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            "INSERT INTO Users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
            [first_name, last_name, username, hashedPassword]
        );
    } catch (err) {
        next(err);
    }
}

const renderSignUpForm = async (req, res) => {
    res.render("sign-up-form", {title: "Sign Up"})
};

module.exports = {
    addNewUser,
    renderSignUpForm
}