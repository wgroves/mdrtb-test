var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our patient model
var regimen_schema = mongoose.Schema({
	_patientID: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
	date_start: Date,
	date_stop: Date,
	height: Number,
	weight: Number,
	comment: String,
	steroids_perscribed: Boolean
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Regimen', regimen_schema);