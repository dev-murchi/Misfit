const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const User = require('../models/User');
const Category = require('../models/Category');
const Program = require('../models/Program');

exports.createUser = async (req, res) => {
    try{
        const user = await User.create(req.body); 
        
        console.log('created user: ',{
            status: 'success',
            user: user
        });
        res.status(201).redirect('/login');
    }
    catch (err) {

        const errors = validationResult(req);
        const errorMessage = [];
        errorMessage.push(err.message);
        for (let i = 0; i < errors.array().length; i++) {
            errorMessage.push(errors.array()[i].msg);
        }
        
        res.status(400).json({
            status: 'failed',
            user: JSON.stringify(errorMessage)
        })

    }
};

exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});

        if(user){
            bcrypt.compare(
                password,
                user.password,
                (err, same) => {
                    if(same){
                        console.log('logedin user: ', {
                            status: 'success',
                            user: user
                        });
                        req.session.userID = user._id;
                        res.status(200).redirect('/users/dashboard');
                    }
                    else {
                        console.error('Invalid user credentials.x');
                        res.status(400).redirect('/login');
                    }
                }
            );
        }
        else {
            console.error('Invalid user credentials.');
            res.status(400).redirect('/login');
        }
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            error: err.message
        });
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        const program = await Program.deleteMany({trainerID: req.params.id});

        res.status(200).json({
            user: user,
            program: program
        });

    } catch (err) {
        res.status(400).json({
            status: 'failed',
            error: err.message
        });
    }
};

exports.getDashboardPage = async (req, res) => {
    
    try {
        const user = await User.findOne({_id: req.session.userID}).populate('enrolledPrograms');
        const programs = await Program.find({trainerID: req.session.userID}).sort('-dateCreated');
        const users = await User.find();
        console.log('user: ', user);
        console.log('programs: ', programs);
        res.status(200).render('dashboard', {
            pageName: 'dashboard', 
            user: user, 
            programs: programs
        });
    } catch (err) {
        console.log(err.message);
        res.status(400).render('dashboard', {
            pageName: 'dashboard',
            message: err.message     
        });
    }
};