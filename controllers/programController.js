const Program = require('../models/Program');

exports.createProgram = async (req, res) => {
    try {
        const program = await Program.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            trainerID: req.body.trainerID
        });

        res.status(201).json({
            status: 'success',
            program: program
        });
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


    console.log(req.params.slug);
    console.log('slug: ',req.params.slug);
    const program = await Program.findOne({slug: req.params.slug});
    console.log(program);
    res.render('program', {
        program: program,
        pageName: 'programs'
    });

    
};