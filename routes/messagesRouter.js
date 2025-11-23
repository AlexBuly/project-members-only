const { Router } = require("express");
const router = Router();
const messagesController = require("../controllers/messagesController");

router.get("/", messagesController.renderMessageForm);

module.exports = router;