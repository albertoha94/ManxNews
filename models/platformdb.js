var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title: {type: String, required: true},
    active: {type: Boolean, required: true},
    date_creation: {type: Date},
    date_update: {type: Date},
    date_delete: {type: Date},
    date_lastchange: {type: Date},
});

module.exports = mongoose.model('Platform', schema);