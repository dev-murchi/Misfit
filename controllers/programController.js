const Program = require('../models/Program');
const User = require('../models/User');

exports.createProgram = async (req, res) => {
    try {
        const program = await Program.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            trainerID: req.session.userID,
            recommendedWeek: req.body.recommendedWeek
        });

        res.status(200).redirect('/users/dashboard');

    } catch (err) {
        res.status(400).json({
            status: 'failed',
            error: err.message
        })
    }
};

exports.getAllPrograms = async (req, res) => {
    
    const programs = await Program.find().sort('-dateCreated');

    // res.status(200).json(programs);
    res.render('programs', {
        programs: programs,
        pageName: 'programs'
    });
};
exports.getSingleProgramPage = async (req, res) => {

    const program = await Program.findOne({slug: req.params.slug}).populate('category trainerID');
    const user = await User.findById(req.session.userID);
    res.render('program', {
        program: program,
        pageName: 'programs',
        user: user
    });
};

exports.updateProgram = async (req, res) => {
    try {
        const program = await Program.findOne({slug: req.params.slug});
        program.name = req.body.name;
        program.category = req.body.category;
        program.description = req.body.description;
        program.recommendedWeek = req.body.recommendedWeek;

        await program.save();
        res.status(200).redirect('/users/dashboard');
    } catch (err) {
        res.status(400).json({
            status: 'fail update the program',
            error: err.message
        });
    }
};

exports.deleteProgram = async (req, res) => {
    try {
        const program = await Program.findOneAndDelete({slug: req.params.slug});

        program.enrolledUsers.forEach( async (id) => {
            let user = await User.findById(id);
            console.log('user: ', user);
            await user.enrolledPrograms.pop({_id: program._id});
            await user.save();
        });

        res.status(200).redirect('/users/dashboard');
    } catch (err) {
        res.status(400).json({
            status: 'fail deleting a course',
            error: err.message
        });
    }
};

exports.enrollProgram = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);
        await user.enrolledPrograms.push({_id: req.body.programID});
        await user.save();

        const program = await Program.findById(req.body.programID);
        await program.enrolledUsers.push({_id: req.session.userID});
        await program.save();

        res.status(200).redirect('/users/dashboard');
    } catch (err) {
        res.status(400).json({
            status: 'fail enrolling a course',
            error: err.message
        });
    }
};

exports.releaseProgram = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);
        await user.enrolledPrograms.pop({_id: req.body.programID});
        await user.save();

        const program = await Program.findById(req.body.programID);
        await program.enrolledUsers.pop({_id: req.session.userID});
        await program.save();

        res.status(200).redirect('/users/dashboard');
        
    } catch (err) {
        res.status(400).json({
            status: 'fail releasing a course',
            error: err.message
        });
    }
};