const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const {
    getOCRHistory
} = require("../controllers/ocrHistoryController");


router.get(
    "/",
    authMiddleware,
    getOCRHistory
);


module.exports = router;