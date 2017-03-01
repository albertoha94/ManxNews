

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    header: {type: String, required: true},
    body: {type: String, required: true},
    languageId: { type : Schema.Types.ObjectId, required : true },
    appId: { type : Schema.Types.ObjectId, required : true },
    published: {type: Boolean, required: true},
    active: {type: Boolean, required: true},
    date_visible: {type: Date},
    date_creation: {type: Date},
    date_update: {type: Date},
    date_delete: {type: Date},
    date_lastchange: {type: Date},
});

module.exports = mongoose.model('News', schema);