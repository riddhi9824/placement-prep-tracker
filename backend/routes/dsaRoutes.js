const express = require("express");
const router = express.Router();

const {
    addTopic,
    getTopics,
    updateTopic,
    deleteTopic
} = require("../controllers/dsaController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, addTopic);
router.get("/", authMiddleware, getTopics);
router.put("/:id", authMiddleware, updateTopic);
router.delete("/:id", authMiddleware, deleteTopic);

module.exports = router;