const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Gallery = require('../models/imagesModel');

exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(200).json({message: 'User registered', data: user});
    } catch (e) {
        res.status(400).json({message: e.message});
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (! user) {
            res.status(401).json({message: "No such user"});
            return;
        }
        // match user password
        const matched = await user.matchPassword(password, user.password);
        if (! matched) {
            res.status(401).json({message: 'Invalid login'});
            return;
        }
        // generate token
        const userToken = jwt.sign({
            id: user._id
        }, 'mysecret', {expiresIn: '10d'});

        await User.updateOne({email}, {userToken});
        const tempUser = await User.findOneAndUpdate({email}, {userToken},  {new: true});
        // const userId = user._id;
        // res.render(`${__dirname}/views/home.handlebars`, {userId});
        // res.render('home');
        res.status(201).json({
            message: "Logged In", data: tempUser
        });

    } catch (e) {
        res.status(401).json({message: e.message});
    }
};

exports.setFavourite = async (req, res) => {
    try{
        const userID = req.params.userId;
        const _id = req.body.imgId;
        const userImage = await Gallery.findOneAndUpdate({userID, _id}, req.body, {new:true});
        if (!userImage){
           throw new Error('You have 0 images !');
        }
        res.status(200).json({
            message: 'Successfully marked as favourite',
            data: userImage
        });
    }catch(e){
        res.status(500).json({
            message: e.message
        });
    }
};


exports.getFavourite = async (req, res) => {
    try{
        const userID = req.params.userId;
        const userImage = await Gallery.find({userID, favourite:true});
        if (!userImage){
            res.status(400).json({
                message: 'You have no favourite image'
            });
        }
        res.status(200).json({
            message: 'Favourite images',
            data: userImage
        });
    }catch(e){
        res.status(500).json({
            message: e.message
        });
    }
};
