const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getScanHistory
} = require("../controllers/historyController");

router.get(
    "/",
    protect,
    getScanHistory
);

module.exports = router;