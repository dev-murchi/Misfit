const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const User = require('../models/User');

exports.createUser = async (req, res) => {
    try{
        const user = await User.create(req.body); 
        
        // res.status(201).redirect('/login');
        res.status(201).json({
            status: 'success',
            user: user
        })
    }
    catch (error) {

        const errors = validationResult(req);
        let errorMessage = '';
        for (let i = 0; i < errors.array().length; i++) {
            errorMessage += `${errors.array()[i].msg} `;
        }
        // req.flash('error', errorMessage);    
        // res.status(400).redirect('/register');
        req.status(400).json({
            status: 'failed',
            user: errorMessage
        })

    }
};