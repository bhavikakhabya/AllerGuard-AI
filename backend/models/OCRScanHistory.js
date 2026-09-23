const mongoose = require("mongoose");

const ocrScanHistorySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        filename: {
            type: String,
            required: true
        },

        extractedText: {
            type: String,
            default: ""
        },

        detectedAllergens: [
            {
                allergen: {
                    type: String,
                    required: true
                },

                certainty: {
                    type: String,
                    enum: [
                        "confirmed",
                        "likely",
                        "possible"
                    ],
                    default: "possible"
                }
            }
        ],

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


const OCRScanHistory =
    mongoose.model(
        "OCRScanHistory",
        ocrScanHistorySchema
    );


module.exports = OCRScanHistory;