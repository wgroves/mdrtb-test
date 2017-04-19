var express = require('express');
    // path = require('path'),
    // bodyParser = require('body-parser'),
    // anyDB = require('any-db');

var app = express();
app.set('view engine', 'hjs');
app.set('view options', {layouts: true});
app.set('views', __dirname + '/views');

// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());

// ****************************************************************************** //
// ****************************************************************************** //

// Static files
// app.use('/static',express.static(path.join(__dirname, '/static')));

// Start server
app.listen(8080, function() {
    console.log('- Server listening on port 8080');
});
