const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        uniqe:true,
        required: true  
    },
    password: {
        type:String,
        required: true
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    phone: {
        type: String,
    },
    healthProblem: {
        type: String,
    },
    role: {
        type: String,
        enum: ['member', 'trainer', 'admin'],
        default: 'member'
    },
    proficiency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proficiency'
    },
    enrolledPrograms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program'
    }],
    image: {
        type: String
    }
});

UserSchema.pre('save', function(next) {
    const user = this;

    if(!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, (error, hash) => {
        
        if(error) return next(error);

        user.password = hash;
        next();
    });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;