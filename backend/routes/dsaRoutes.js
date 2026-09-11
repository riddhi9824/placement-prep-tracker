const express = require("express");
const router = express.Router();

const { addTopic } = require("../controllers/dsaController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, addTopic);

module.exports = router;