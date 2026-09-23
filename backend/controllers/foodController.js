const Food = require("../models/Food");


// Add a new food
const addFood = async (req, res) => {
    try {
        const { name, category, ingredients } = req.body;

        if (!name || !category || !ingredients) {
            return res.status(400).json({
                success: false,
                message: "Name, category and ingredients are required"
            });
        }

        const existingFood = await Food.findOne({
            name: name.trim()
        });

        if (existingFood) {
            return res.status(400).json({
                success: false,
                message: "Food already exists"
            });
        }

        const food = await Food.create({
            name,
            category,
            ingredients
        });

        res.status(201).json({
            success: true,
            message: "Food added successfully",
            food
        });

    } catch (error) {
        console.error("Add Food Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// Get all foods
const getFoods = async (req, res) => {
    try {
        const foods = await Food.find();

        res.status(200).json({
            success: true,
            count: foods.length,
            foods
        });

    } catch (error) {
        console.error("Get Foods Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// Get one food
const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found"
            });
        }

        res.status(200).json({
            success: true,
            food
        });

    } catch (error) {
        console.error("Get Food Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    addFood,
    getFoods,
    getFoodById
};