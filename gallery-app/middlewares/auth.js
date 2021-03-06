const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.verifyToken = async (req, res, next) => {
    try {
        const userToken = req.header('Authorization');
        // check if token is valid and hasn't expired
        const decoded = jwt.verify(userToken, 'mysecret');
        const user = await User.findOne({userToken});
        if (!user){
            throw new Error('No user found');
        }
        next();
    } catch (e) {
        res.status(401).json({message: e.message});
    }
};