const ScanHistory = require("../models/ScanHistory");

const getScanHistory = async (req, res) => {
    try {

        const history = await ScanHistory
            .find({ userId: req.userId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: history.length,
            history
        });

    } catch (error) {

        console.error(
            "Scan History Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    getScanHistory
};