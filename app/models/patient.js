// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our patient model
var patientSchema = mongoose.Schema({

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Patient', patientSchema);
