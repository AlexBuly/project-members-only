const renderMessageForm = (req, res) => {
    res.render("new-message", {title: "Add Message"});
}



module.exports = {
    renderMessageForm,
    addMessage
};