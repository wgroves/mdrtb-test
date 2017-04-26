// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var path  = require('path');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var validator = require('express-validator');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// sessions ==================================================================
var MongoDBStore = require('connect-mongodb-session') (session);
var store = new MongoDBStore(
	{
		uri: configDB.url;
		collection: 'mySessions';
	});

// Catch errors 
store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
});

app.use(require('express-session')({
  secret: 'E27FA8B5984C56177849FF48EAC8B',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2 // 48 hours
  },
  store: store,
  // Boilerplate options, see: 
  // * https://www.npmjs.com/package/express-session#resave 
  // * https://www.npmjs.com/package/express-session#saveuninitialized 
  resave: true,
  saveUninitialized: true
}));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'Z6ExFbA83p1MZg24v61PnQOM7s5iLIPR', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
// app.use(validator);

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
app.use(express.static(path.join(__dirname, 'public'))); // public directory is static for CSS and JS

// launch ======================================================================
app.listen(port);
console.log('Server listening on ' + port);
