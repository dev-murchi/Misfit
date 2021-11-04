const express = require('express')
const {body} = require('express-validator');

const authController = require('../controllers/authController');
//const authMiddleware = requore('../middlewares/authMiddlwware');

const User = require('../models/User');

const router = express.Router();

router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Name cannot be empty.'),
        body('email').isEmail().withMessage('Invalid email address.')
        .custom((userEmail) => {
            return User.findOne({email: userEmail}).then( user => {
                if(user){
                    return Promise.reject('Email is already exists.');
                }
            })
        }),
        body('password').not().isEmpty().withMessage('Password cannot be empty.')
    ],
    authController.createUser
);

module.exports = router;