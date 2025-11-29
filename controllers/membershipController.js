const renderMembershipPage = (req, res) => {
     if (!req.user) return res.redirect("/login");
      res.render("membership", {title: "Join"});
};

module.exports = {
    renderMembershipPage
};