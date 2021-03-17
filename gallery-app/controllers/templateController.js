exports.indexPage = (req, res) => {
    res.render('index');
};

exports.homePage = (req, res) => {
    res.render('home');
};

exports.registerPage = (req, res) => {
    res.render('register');
};

exports.loginPage = (req, res) => {
    res.render('login');
};

exports.galleryPage = (req, res) => {
    res.render('gallery');
};

exports.foldersPage = (req, res) => {
    res.render('folders');
};

exports.favouritesPage = (req, res) => {
    res.render('favourites');
};