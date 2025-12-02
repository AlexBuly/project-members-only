const pool = require("../db/pool");

const renderAdminPage = (req, res) => {
    if (!req.user) return res.redirect("/login");
     res.render("admin", {title: "Admin Code"});
}

const addAdmin = async (req, res) => {
    const { admin } = req.body;

    if (admin !== "@DMIN") {
        return res.render("admin", {
            title: "Admin Code"
        });
    }

    try {
        await pool.query(
            "UPDATE Users SET admin = true WHERE id = $1",
            [req.user.id]
        );
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
    renderAdminPage,
    addAdmin
};