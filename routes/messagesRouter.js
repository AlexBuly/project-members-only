const { Router } = require("express");
const router = Router();
const messagesController = require("../controllers/messagesController");

router.get("/", messagesController.renderMessageForm);
router.post("/", messagesController.addMessage);
router.post("/delete/:id", messagesController.deleteMessage);

module.exports = router;