require("dotenv").config();
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const token = req.header('token') || req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access Denied. No token provided."
        });
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY || 'fallback-secret');
        req.user = verified.userId;
        console.log("Authenticated user:", req.user);
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid Token'
        });
    }
};

module.exports = auth;
