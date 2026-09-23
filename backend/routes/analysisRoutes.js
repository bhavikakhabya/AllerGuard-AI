const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    analyzeFood
} = require("../controllers/analysisController");


router.post(
    "/",
    protect,
    analyzeFood
);


module.exports = router;