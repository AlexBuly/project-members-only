const pool = require("../db/pool");

const renderMembershipPage = (req, res) => {
     if (!req.user) return res.redirect("/login");
      res.render("membership", {title: "Join"});
};

const addMembership = async (req, res) => {
    const { join } = req.body;

    if (join !== "M3SSAGE") {
        return res.render("membership", {
            title: "Join"
        });
    }

    try {
        await pool.query(
            "UPDATE Users SET member = true WHERE id = $1",
            [req.user.id]
        );
        return res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating status");
    }
}

module.exports = {
    renderMembershipPage,
    addMembership
};