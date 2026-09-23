const User = require("../models/User");
const OCRScanHistory = require("../models/OCRScanHistory");

const { extractTextFromImage } = require("../services/ocrService");

const {
    detectAllergens,
    calculateOCRRisk
} = require("../services/ocrRiskEngine");


const scanText = async (req, res) => {

    try {

        // =========================
        // 1. CHECK IMAGE
        // =========================

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "Please upload an image"
            });

        }


        console.log(
            "OCR image received:",
            req.file.originalname
        );


        // =========================
        // 2. EXTRACT TEXT
        // =========================

        const extractedText =
            await extractTextFromImage(
                req.file.buffer
            );


        // =========================
        // 3. DETECT ALLERGENS
        // =========================

        const detectedAllergens =
            detectAllergens(extractedText);


        // =========================
        // 4. GET USER
        // =========================

        const user =
            await User.findById(req.userId);


        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }


        // =========================
        // 5. CALCULATE RISK
        // =========================

        const risk =
            calculateOCRRisk(
                detectedAllergens,
                user.allergies
            );


        // =========================
        // 6. SAVE OCR HISTORY
        // =========================

        const savedScan =
            await OCRScanHistory.create({

                userId: user._id,

                filename:
                    req.file.originalname,

                extractedText,

                detectedAllergens,

                riskLevel:
                    risk.riskLevel,

                matches:
                    risk.matches

            });
            console.log("OCR SCAN SAVED:", savedScan._id);


        // =========================
        // 7. RESPONSE
        // =========================

        res.status(200).json({

            success: true,

            scanId: savedScan._id,

            filename:
                req.file.originalname,

            text: extractedText,

            detectedAllergens,

            userAllergies:
                user.allergies,

            risk

        });


    } catch (error) {

        console.error(
            "OCR Controller Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to analyze food label",

            error: error.message

        });

    }
};


module.exports = {
    scanText
};