// global.jQuery = global.$ = require('jquery'); 

var colors = require('colors'),
    express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    anyDB = require('any-db');

var app = express();
app.set('view engine', 'hjs');
app.set('view options', {layouts: true});
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var pool = anyDB.createPool('sqlite3://chatroom.db', {min: 2, max: 20})

// Initialize database
var create =
`CREATE TABLE IF NOT EXISTS message (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT,
  room TEXT,
  nickname TEXT,
  body TEXT,
  time INTEGER
)`;
pool.query(create, function (err, data) {});

// ****************************************************************************** //
// ****************************************************************************** //

// Homepage
app.get('/', function(req, res) {
    res.render('home');
});

// Create a new room
app.get("/newRoom", function(req, res) {
  pool.query("SELECT DISTINCT room FROM message", function(err, data) {
    var id = generateRoomID(data.rows.map(function(e){return e.room;}));
    res.json({id: id});
  });
});

// List rooms
app.get("/roomList", function(req, res) {
  pool.query("SELECT DISTINCT room FROM message", function(err, data) {
    res.json(data.rows);
  });
});

// Room
app.get('/:roomName', function(req, res) {
    res.render('room', {room: req.params.roomName});
});

// All messages for a room (after a certain time)
app.get('/:room/messages', function(req, res) {
  var room = req.params.room;
  var time = req.query.time;

  var query = "SELECT room, nickname, body, time, type FROM message WHERE room=$1",
      queryParams = [room];
  if(time != undefined) {
    query += " AND time>$2";
    queryParams.push(time);
  }
  query += " ORDER BY time;"

  pool.query(query, queryParams, function (err, data) {
    res.json(data.rows);
  });
});

// Message received
app.post('/:room/messages', function(req, res) {
  var room = req.params.room;
  var nickname = req.body.nickname;
  var message = req.body.message;
  var time = parseInt(req.body.time);
  
  res.end();
  pool.query(
    "INSERT INTO message " + 
    "(room, nickname, body, time, type) VALUES ($1, $2, $3, $4, $5)",
    [room, nickname, message, time, "message"],
    function(err, data) {});

  console.log(" - message: ", room, nickname, message, time);
});

// User joined room
app.post('/:room/join', function(req, res) {
  var room = req.params.room;
  var nickname = req.body.nickname;
  var time = parseInt(req.body.time);
  
  res.end();
  pool.query("INSERT INTO message (room, nickname, time, type) VALUES ($1, $2, $3, $4)",
    [room, nickname, time, "join"],
    function(err, data) {});

  console.log(" - message: ", room, nickname, time);
});

// ****************************************************************************** //
// ****************************************************************************** //

function generateRoomID(exclude) {
  // make a list of legal characters
  // we're intentionally excluding 0, O, I, and 1 for readability
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

  var id = '';
  for (var i = 0; i < 6; i++)
    id += chars.charAt(Math.floor(Math.random() * chars.length));

  if(exclude.includes(id)) {
    return generateRoomID(exclude);
  } else {
    return id;
  }

  return id;
}

// ****************************************************************************** //
// ****************************************************************************** //

// Static files
app.use('/static',express.static(path.join(__dirname, '/static')));

// Start server
app.listen(8080, function() {
    console.log('- Server listening on port 8080'.grey);
});
