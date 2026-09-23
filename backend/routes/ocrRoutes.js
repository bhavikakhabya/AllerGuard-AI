const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const authMiddleware =
    require("../middleware/authMiddleware");

const {
    scanText
} = require("../controllers/ocrController");


router.post(
    "/",
    authMiddleware,
    upload.single("file"),
    scanText
);


module.exports = router;