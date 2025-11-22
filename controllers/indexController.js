const getMessages = async (req, res) => {
    res.render("index", {title: "Home"});
}

module.exports = {
    getMessages
};