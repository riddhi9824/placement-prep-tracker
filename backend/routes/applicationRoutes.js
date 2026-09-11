const express = require("express");
const router = express.Router();

const {
    addApplication,
    getApplications,
    updateApplication,
    deleteApplication,
    getStats
} = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addApplication);
router.get("/stats", authMiddleware, getStats);
router.get("/", authMiddleware, getApplications);
router.put("/:id", authMiddleware, updateApplication);
router.delete("/:id", authMiddleware, deleteApplication);

module.exports = router;