var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our patient model
var lab_schema = mongoose.Schema({
	_patientID: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
	method: String,
	date_collected: Date,
	detected: Boolean,
	specimen_type: String
}, { _id: false });

// create the model for users and expose it to our app
module.exports = mongoose.model('LabTest', lab_schema);