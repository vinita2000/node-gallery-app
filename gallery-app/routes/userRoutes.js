const express = require('express');
const {verifyToken} = require('../middlewares/auth');
const {
    login,
    register,
    setFavourite,
    getFavourite
} = require('../controllers/userController');

const router = new express.Router();


router.put('/user/login', login);
router.post('/user/register', register);
router.put('/user/set-favourite/:userId', verifyToken, setFavourite);
router.get('/user/get-favourite/:userId', verifyToken, getFavourite);

module.exports = router;
