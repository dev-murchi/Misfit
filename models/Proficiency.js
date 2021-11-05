const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const ProficiencySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
});

ProficiencySchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Proficiency = mongoose.model('Proficiency', ProficiencySchema);
module.exports = Proficiency;