const passport = require("passport");

const getUser = (req, res) => {
    res.render("log-in-form", { title: "Login" });
};

const loginUser = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
    })(req, res, next);
};

const logout = (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect("/");
    });
};

module.exports = {
    getUser,
    loginUser,
    logout,
};
