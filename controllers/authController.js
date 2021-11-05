const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const User = require('../models/User');

exports.createUser = async (req, res) => {
    try{
        const user = await User.create(req.body); 
        
        console.log({
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