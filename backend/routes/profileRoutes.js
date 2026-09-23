const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    addAllergy,
    getProfile,
    updateAllergies
} = require("../controllers/profileController");


// =========================
// ADD SINGLE ALLERGY
// POST /api/profile/allergies
// =========================

router.post(
    "/allergies",
    protect,
    addAllergy
);


// =========================
// GET PROFILE
// GET /api/profile
// =========================

router.get(
    "/",
    protect,
    getProfile
);


// =========================
// UPDATE ALL ALLERGIES
// PUT /api/profile/allergies
// =========================

router.put(
    "/allergies",
    protect,
    updateAllergies
);


module.exports = router;