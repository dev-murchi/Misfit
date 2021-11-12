const User = require('../models/User');

exports.getIndexPage = (req, res) => {
    res.render('index');
};
exports.getAboutPage = (req, res) => {
    res.render('about');
};
exports.getTrainerPage = async (req, res) => {

    try {
        const trainers = await User.find({role: 'trainer'});

        res.render('trainers', {
            pageName: 'trainer',
            trainers: trainers
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            error: err.message
        });
    }
};

exports.getTrainerSinglePage = async (req, res) => {

    try {
        const trainer = await User.findById(req.params.id).populate('proficiency');
        res.render('trainer', {
            pageName: 'trainer',
            trainer: trainer
        });
    } catch (err) {
        res.status(400),json({
            status: 'failed',
            error: err.message
        });
    }
};

exports.getLoginPage = (req, res) => {
    res.render('login');
};
exports.getRegisterPage = (req, res) => {
    res.render('register');
};