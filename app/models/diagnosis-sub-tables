var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our Diagnosis sub-models
var site_schema = mongoose.Schema({
	_diagnosisID: {type: mongoose.Schema.Types.ObjectId, ref: 'Diagnosis'},
	site: String
}, { _id: false });

var entity_schema = mongoose.Schema({
	_diagnosisID: {type: mongoose.Schema.Types.ObjectId, ref: 'Diagnosis'},
	disease_entity: String
}, { _id: false });

var complications_schema = mongoose.Schema({
	_diagnosisID: {type: mongoose.Schema.Types.ObjectId, ref: 'Diagnosis'},
	complication: String
}, { _id: false });

// create the model for users and expose it to our app
module.exports = mongoose.model('DiagnosisSite', site_schema);
module.exports = mongoose.model('DiseaseEntity', entity_schema);
module.exports = mongoose.model('Complication', complications_schema);
