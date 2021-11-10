const Category = require('../models/Category');
const Program = require('../models/Program');

exports.createCategory = async (req, res) => {
    
    try {
        const category = await Category.create(req.body);
        res.status(201).redirect('/users/dashboard');
        // res.status(201).json(category);
    } catch (error) {
        res.status(400).json({
            status: 'fail category creation',
            error: error
        });
    }
};

exports.deleteCategory= async (req, res) => {
    try {
        
        const programs = await Program.find({category: req.params.id});
        console.log('category: programs: ', programs);
        programs.forEach(async (program) => {
            program.category = undefined;
            await program.save();
        });

        await Category.findOneAndDelete({_id: req.params.id});

        res.status(200).redirect('/users/dashboard');
    
    } catch (error) {
        res.status(400).json({
            status: 'fail deleting the user',
            error: error
        });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findOne({_id: req.params.id});
        category.name = req.body.name;
        category.save();

        res.status(201).redirect('/users/dashboard');
    } 
    catch (error) {
        res.status(400).json({
            status: 'fail update the category',
            error: error
        });
    }
};