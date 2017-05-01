var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our Diagnosis sub-models
var genexpert_schema = mongoose.Schema({
	_regimenID: {type: mongoose.Schema.Types.ObjectId, ref: 'Regimen'},
	date_collected: Date,
	rpob_mutation: Boolean
}, { _id: false });

var lineprobe_schema = mongoose.Schema({
	_regimenID: {type: mongoose.Schema.Types.ObjectId, ref: 'Regimen'},
	date_collected: Date,
	rpob_mutation: String,
	katg_mutation: String,
	inha_mutation: String
}, { _id: false });

var dst_schema = mongoose.Schema({
	_patientID: {type: mongoose.Schema.Types.ObjectId, ref 'Patient'},
	_regimenID: {type: mongoose.Schema.Types.ObjectId, ref: 'Regimen'},
	date_collected: Date,
	drug: String,
	resistant: Boolean
}, { _id: false });

var adverse_schema = mongoose.Schema({
	_regimenID: {type: mongoose.Schema.Types.ObjectId, ref: 'Regimen'},
	system: String,
	reaction: String
}, { _id: false });



// create the model for users and expose it to our app
// module.exports = mongoose.model('GeneXpert', genexpert_schema);
// module.exports = mongoose.model('LineProbe', lineprobe_schema);
// module.exports = mongoose.model('DST', dst_schema);
// module.exports = mongoose.model('AdverseReaction', adverse_schema);

