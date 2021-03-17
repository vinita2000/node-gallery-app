const express = require('express');
const {
    indexPage,
    homePage,
    registerPage,
    loginPage,
    galleryPage,
    foldersPage,
    favouritesPage
} = require('../controllers/templateController');
const router = new express.Router();

router.route('/').get(indexPage);
router.route('/home').get(homePage);
router.route('/login').get(loginPage);
router.route('/register').get(registerPage);
router.route('/gallery').get(galleryPage);
router.route('/folders').get(foldersPage);
router.route('/favourites').get(favouritesPage);


module.exports = router;
