const pool = require("../db/pool");

const getMessages = async (req, res) => {
    try {
        const { rows: messages } = await pool.query(
            `SELECT m.msg_id, m.title, m.text, m.timestamp, m.author
             FROM Messages m
             ORDER BY m.timestamp DESC`
        );

        res.render("index", { title: "Home", messages });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading messages");
    }
}

module.exports = {
    getMessages
};