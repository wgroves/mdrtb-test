var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our patient model
var diagnosis_schema = mongoose.Schema({
	_patientID: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
	eval_date: Date,
	height: Number,
	weight: Number,
	previous_tb_diagnosis: Boolean,
	previous_diagnosis_date: Date,
	hiv_status: Boolean,
	art: Boolean,
	malnutrition: Boolean,
	chronic_condition: Boolean,
	condition_desc: String,
	radiograph_result: String,
	radiograph_date: Date
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Diagnosis', characteristics_schema);