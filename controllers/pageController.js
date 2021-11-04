const User = require('../models/User');

exports.getIndexPage = (req, res) => {
    res.render('index');
};
exports.getAboutPage = (req, res) => {
    res.render('about');
};
exports.getTrainerPage = async (req, res) => {

    const trainers = await User.find({role: 'trainer'});

    res.render('trainer', {
        pageName: 'trainer',
        trainers: trainers
    });
};
exports.getContactPage = (req, res) => {
    res.render('contact');
};
exports.getLoginPage = (req, res) => {
    res.render('login');
};
exports.getRegisterPage = (req, res) => {
    res.render('register');
};