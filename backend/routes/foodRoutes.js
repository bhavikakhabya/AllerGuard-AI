const express = require("express");

const router = express.Router();

const {
    addFood,
    getFoods,
    getFoodById
} = require("../controllers/foodController");


// POST /api/foods
router.post("/", addFood);


// GET /api/foods
router.get("/", getFoods);


// GET /api/foods/:id
router.get("/:id", getFoodById);


module.exports = router;