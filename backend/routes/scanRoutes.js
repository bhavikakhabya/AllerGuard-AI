const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const authMiddleware = require("../middleware/authMiddleware");

const {
    scanFood
} = require("../controllers/scanController");


router.post(
    "/",
    authMiddleware,
    upload.single("file"),
    scanFood
);


module.exports = router;