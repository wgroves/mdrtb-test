var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var outcome_schema = mongoose.Schema({
	_outcomeID: {type: mongoose.Schema.Types.ObjectId, ref: 'TreatmentOutcome'},
	response: String
}, { _id: false });

// create the model for users and expose it to our app
// module.exports = mongoose.model('TreatmentOutcome', outcome_schema);