// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our patient model
var patientSchema = mongoose.Schema({
	last_name: String,
	first_name: String,
	middle_name: String,
	dob: Date,
	sex: String,
	date_entered: Date
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Patient', patientSchema);
