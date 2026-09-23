const User = require("../models/User");
const Food = require("../models/Food");
const ScanHistory = require("../models/ScanHistory");

const calculateFoodRisk = require("../services/riskEngine");


const analyzeFood = async (req, res) => {

    try {

        const { foodId } = req.body;

        if (!foodId) {
            return res.status(400).json({
                success: false,
                message: "Food ID is required"
            });
        }

        // Get logged-in user
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Get food
        const food = await Food.findById(foodId);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found"
            });
        }

        // Calculate personalized risk
        const result = calculateFoodRisk(
            food,
            user.allergies
        );

        const scan = await ScanHistory.create({
            userId: user._id,
            foodId: food._id,
            foodName: food.name,
            riskLevel: result.riskLevel,
            matches: result.matches
        });

        res.status(200).json({
    success: true,

    food: {
        id: food._id,
        name: food.name,
        category: food.category
    },

    risk: result,

    scanId: scan._id
});

    } catch (error) {

        console.error(
            "Food Analysis Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    analyzeFood
};