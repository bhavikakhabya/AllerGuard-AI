const mongoose = require("mongoose");

const scanHistorySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        foodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food",
            required: true
        },

        foodName: {
            type: String,
            required: true
        },

        riskLevel: {
            type: String,
            enum: [
                "NO_KNOWN_MATCH",
                "VERIFY",
                "POSSIBLE_RISK",
                "HIGH_RISK"
            ],
            required: true
        },

        matches: [
            {
                ingredient: String,
                allergen: String,
                certainty: String,
                severity: String,
                score: Number
            }
        ]
    },
    {
        timestamps: true
    }
);

const ScanHistory = mongoose.model(
    "ScanHistory",
    scanHistorySchema
);

module.exports = ScanHistory;