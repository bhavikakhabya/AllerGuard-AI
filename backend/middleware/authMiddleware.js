const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check Authorization header
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization token is required"
            });
        }

        // Expected format:
        // Authorization: Bearer <token>

        const parts = authHeader.split(" ");

        if (
            parts.length !== 2 ||
            parts[0] !== "Bearer" ||
            !parts[1]
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization format"
            });
        }

        const token = parts[1];

        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Store user ID for controllers
        req.userId = decoded.userId;

        next();

    } catch (error) {

        console.error(
            "Authentication Error:",
            error.message
        );

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;