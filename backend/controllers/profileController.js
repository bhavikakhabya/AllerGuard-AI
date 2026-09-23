const User = require("../models/User");


// =========================
// ADD ALLERGY
// =========================

const addAllergy = async (req, res) => {

    try {

        const { name, severity } = req.body;

        if (!name || !severity) {

            return res.status(400).json({
                success: false,
                message: "Allergy name and severity are required"
            });

        }

        const user = await User.findById(req.userId);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        user.allergies.push({
            name: name.toLowerCase(),
            severity
        });

        await user.save();

        res.status(200).json({
            success: true,
            message: "Allergy added successfully",
            allergies: user.allergies
        });

    } catch (error) {

        console.error(
            "Add Allergy Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


// =========================
// GET PROFILE
// =========================

const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.userId)
            .select("-password");

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        console.error(
            "Get Profile Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


// =========================
// UPDATE ALLERGIES
// =========================

const updateAllergies = async (req, res) => {

    try {

        const { allergies } = req.body;

        if (!Array.isArray(allergies)) {

            return res.status(400).json({
                success: false,
                message: "Allergies must be an array"
            });

        }

        const user = await User.findById(req.userId);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }


        // Clean and validate allergies

        user.allergies = allergies.map(
            (allergy) => ({

                name: String(
                    allergy.name
                ).trim().toLowerCase(),

                severity:
                    allergy.severity

            })
        );


        await user.save();


        res.status(200).json({

            success: true,

            message:
                "Allergy profile updated successfully",

            allergies: user.allergies

        });

    } catch (error) {

        console.error(
            "Update Allergies Error:",
            error
        );

        res.status(500).json({

            success: false,

            message: "Server error"

        });

    }

};


module.exports = {

    addAllergy,
    getProfile,
    updateAllergies

};