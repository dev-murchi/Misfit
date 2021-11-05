const Proficiency = require('../models/Proficiency');

exports.createProficiency = async (req, res) => {
    try {
        const proficiency = await Proficiency.create(req.body);
        res.status(201).json({
            status: 'success',
            proficiency: proficiency
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            error: err.message
        });
    }
};

exports.deleteProficiency = async (req, res) => {
    try {
        const proficiency = await Proficiency.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: 'success',
            proficiency: proficiency
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            error: err.message
        });
    }
};