const pool = require("../db/pool");

const renderMessageForm = (req, res) => {
    if (!req.user) return res.redirect("/login")
    res.render("new-message", {title: "Add Message"});
}

const addMessage = async (req, res) => {
    if (!req.user) return res.redirect("/login");
    const {title, text } = req.body;

    try {
        await pool.query(
            `
                INSERT INTO Messages (title, text, user_id, timestamp, author)
                VALUES ($1, $2, $3, NOW(), $4)
            `, [title, text, req.user.id, req.user.username]
        );
        return res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving message");
    }
}

module.exports = {
    renderMessageForm,
    addMessage
};