const Food = require("../models/Food");
const User = require("../models/User");
const ScanHistory = require("../models/ScanHistory");

const calculateFoodRisk = require("../services/riskEngine");
const { predictFood } = require("../services/aiService");


const scanFood = async (req, res) => {

    try {

        // 1. Check image
        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "Please upload a food image"
            });

        }


        // 2. AI prediction
        const prediction = await predictFood(
            req.file.buffer,
            req.file.originalname
        );


        // 3. Find predicted food in MongoDB
        const foodName = prediction.food
            .replace(/_/g, " ");

        const food = await Food.findOne({
            name: {
                $regex: new RegExp(
                    `^${foodName}$`,
                    "i"
                )
            }
        });


        // 4. Food not found
        if (!food) {

            return res.status(404).json({

                success: false,

                message:
                    "Food detected but not found in database",

                prediction

            });

        }


        // 5. Find user
        const user = await User.findById(
            req.userId
        );


        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }


        // 6. Calculate personalized risk
        const risk = calculateFoodRisk(
            food,
            user.allergies
        );


        // 7. SAVE SCAN HISTORY
        const scan = await ScanHistory.create({

            userId: user._id,

            foodId: food._id,

            foodName: food.name,

            riskLevel: risk.riskLevel,

            matches: risk.matches

        });


        // 8. Final response
        res.status(200).json({

            success: true,

            prediction: {

                food: prediction.food,

                confidence: prediction.confidence

            },

            food: {

                id: food._id,

                name: food.name,

                category: food.category,

                ingredients: food.ingredients

            },

            risk,

            scanId: scan._id

        });


    } catch (error) {

        console.error(
            "Scan error:",
            error
        );

        res.status(500).json({

            success: false,

            message: "Food scanning failed",

            error: error.message

        });

    }

};


module.exports = {
    scanFood
};