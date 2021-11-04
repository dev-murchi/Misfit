exports.getProgramsPage = (req, res) => {
    res.render('programs');
};
exports.getSingleProgramPage = (req, res) => {
    res.render('program', {
        pageName: 'programs',
        programID: req.params.id
    });
};