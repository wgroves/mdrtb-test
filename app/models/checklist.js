var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our patient model
var checklist_schema = mongoose.Schema({
	_patientID: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
	dst_drug_resistance: Boolean,
	first_line_treatment_failiure: Boolean,
	case_contact: Boolean,
	source_case_treatment_failiure: Boolean,
	tb_death: Boolean,
	treatment_default: Boolean,
	previous_tb_treatment: Boolean,
	case_exposure: Boolean,
	high_risk_tb_travel: Boolean
}, { _id: false });

// create the model for users and expose it to our app
module.exports = mongoose.model('Checklist', checklist_schema);