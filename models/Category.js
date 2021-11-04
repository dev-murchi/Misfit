const mongoose = require('mongoose');
const slugify = require('slugify');

const Schmea = mongoose.Schema;

const CategorySchema = new Schmea({
    name: {
        type:String,
        unique: true,
        trim: true,
        required: true
    },
    slug:{
        type: String,
        unique: true
    }
});

CategorySchema.pre('validate', function(next){
    this.slug = slugify(this.name, {
        lower: true,
        strict:true
    });
    next();
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;