const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const ProgramSchema = new Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    content: [
        {
            type: String,
            trim: true
        },
    ],
    recommendedWeek: {
        type: Number,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category'
    },
    trainerID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    enrolledUsers: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }
    ]
});

ProgramSchema.pre('validate', function(next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true
    });
    next();
});

const Program = mongoose.model('Program', ProgramSchema);

module.exports = Program;