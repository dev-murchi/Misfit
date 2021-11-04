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
    role: {
        type: String,
        enum: ['member', 'antrenor', 'admin'],
        default: 'student'
    },
    programs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program'
    }]
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