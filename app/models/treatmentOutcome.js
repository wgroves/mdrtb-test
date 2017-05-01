var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our patient model
var treatment_schema = mongoose.Schema({
	_patientID: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
	report_date: Date,
	responses: [String],
	outcome: String,
	outcome_date: Date,
	tb_death: Boolean
});

// create the model for users and expose it to our app
module.exports = mongoose.model('TreatmentOutcome', treatment_schema);