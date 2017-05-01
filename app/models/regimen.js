var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our Diagnosis sub-models
var gene_expert_schema = mongoose.Schema({
	date_collected: Date,
	rpob_mutation: Boolean
}, { _id: false });

var lineprobe_schema = mongoose.Schema({
	date_collected: Date,
	rpob_mutation: String,
	katg_mutation: String,
	inha_mutation: String
}, { _id: false });

var dst_schema = mongoose.Schema({
	_patientID: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
	date_collected: Date,
	drug: String,
	resistant: Boolean
}, { _id: false });

var adverse_schema = mongoose.Schema({
	system: String,
	reaction: String
}, { _id: false });

var regimen_drug_schema = mongoose.Schema({
	drug: String,
	dose: Number,
	route: String,
	frequency: Number
}, { _id: false });

// define the schema for our regimen model
var regimen_schema = mongoose.Schema({
	_patientID: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
	date_start: Date,
	date_stop: Date,
	drugs: [regimen_drug_schema],
	height: Number,
	weight: Number,
	comment: String,
	steroids_perscribed: Boolean,
	dst: dst_schema,
	gene_expert: gene_expert_schema,
	line_probe: lineprobe_schema,
	adverse_reactions: [adverse_schema]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Regimen', regimen_schema);
module.exports = mongoose.model('RegimenDrug', regimen_drug_schema);
module.exports = mongoose.model('GeneXpert', gene_expert_schema);
module.exports = mongoose.model('LineProbe', lineprobe_schema);
module.exports = mongoose.model('DST', dst_schema);
module.exports = mongoose.model('AdverseReaction', adverse_schema);

