const { Router } = require("express");
const router = Router();
const messagesController = require("../controllers/messagesController");

router.get("/", messagesController.renderMessageForm);
router.post("/", messagesController.addMessage);

module.exports = router;