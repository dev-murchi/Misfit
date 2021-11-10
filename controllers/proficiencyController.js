const Proficiency = require('../models/Proficiency');
const User = require('../models/User');
exports.createProficiency = async (req, res) => {
    try {
        const proficiency = await Proficiency.create(req.body);
        // res.status(201).json({
        //     status: 'success',
        //     proficiency: proficiency
        // });
        res.status(201).redirect('/users/dashboard');
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            error: err.message
        });
    }
};

exports.deleteProficiency = async (req, res) => {
    try {
        const users = await User.find({proficiency: req.params.id});
        console.log('prof: users: ', users);
        users.forEach(async (user) => {
            user.proficiency = undefined;
            await user.save();
        });

        const proficiency = await Proficiency.deleteOne({_id: req.params.id});

        res.status(200).redirect('/users/dashboard');
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            error: err.message
        });
    }
};

exports.updateProficiency = async (req, res) => {
    try {
        const proficiency = await Proficiency.findById(req.params.id);
        proficiency.name = req.body.name;
        await proficiency.save();

        res.status(200).redirect('/users/dashboard');
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            error: err.message
        });
    }
};