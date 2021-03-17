const express = require('express');
const {verifyToken} = require('../middlewares/auth');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const {
    uploads,
    getUserImages,
    deleteUserImage,
    setImageDirectory,
    getUserDirectories,
    getDirectoryImages
} = require('../controllers/imageController');
const router = new express.Router();

// use by upload form
router.post('/user/upload-image/:userId', upload.single('avatar'), uploads);
router.get('/user/get-user-images/:userId',verifyToken, getUserImages);
router.delete('/user/delete-user-images/:userId', verifyToken, deleteUserImage);
router.put('/user/set-directory/:userId', verifyToken, setImageDirectory);
router.get('/user/get-directories/:userId', verifyToken, getUserDirectories);
router.get('/user/directory-images/:userId/:directoryName',verifyToken, getDirectoryImages);


module.exports = router;
