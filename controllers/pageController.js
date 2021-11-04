exports.getHomePage = (req, res) => {
    res.render('index');
};
exports.getAboutPage = (req, res) => {
    res.render('about');
};
exports.getTrainerPage = (req, res) => {
    res.render('trainer');
};
exports.getProgramsPage = (req, res) => {
    res.render('programs');
};
exports.getProgram = (req, res) => {
    res.render('program', {
        pageName: 'programs',
        programID: req.params.id
    });
};

exports.getContactPage = (req, res) => {
    res.render('contact');
};
exports.loginPage = (req, res) => {
    res.render('login');
};
exports.registerPage = (req, res) => {
    res.render('register');
};