var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    title: {type: String, required: true},
    abbreviation: {type: String, required: true, unique: true},
    active: {type: Boolean, required: true},
    date_creation: {type: Date},
    date_update: {type: Date},
    date_delete: {type: Date},
    date_lastchange: {type: Date},
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Language', schema);