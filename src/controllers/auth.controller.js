const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const express = require('express')
const app = express();

const login = async(req, res) => {
    const id = req.body.id;
    const password = req.body.password;

    try{
        const getUser = await User.usermodel.findOne({"id":id});
        if (!getUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        const check = await bcrypt.compare(password, getUser.password);
        if(check){
            const token = jwt.sign(
                { userId: getUser._id, id: getUser.id }, 
                process.env.SECRET_KEY || 'fallback-secret',
                { expiresIn: '24h' }
            );
            
            process.env.USER = getUser._id;
            console.log("User logged in:", process.env.USER);
            
            res.json({
                success: true,
                message: "Login successful",
                token: token,
                user: {
                    id: getUser.id,
                    email: getUser.email
                }
            });
        }
        else{
            res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Login failed: " + err.message
        });
    }
};

const AuthController = {
    login
};

module.exports = AuthController;