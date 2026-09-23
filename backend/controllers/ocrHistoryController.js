const OCRScanHistory = require("../models/OCRScanHistory");

const getOCRHistory = async (req, res) => {
    try {

        const history = await OCRScanHistory
            .find({
                userId: req.userId
            })
            .sort({
                createdAt: -1
            });

        res.status(200).json({
            success: true,
            count: history.length,
            history
        });

    } catch (error) {

        console.error(
            "OCR History Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch OCR history",
            error: error.message
        });
    }
};

module.exports = {
    getOCRHistory
};