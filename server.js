var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var compression = require('compression');
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

process.env.NODE_ENV = 'production';

var RSVPS_COLLECTION = "rsvps";
var app = express();

var db;
var connection = process.env.MONGODB_URI
mongodb.MongoClient.connect(connection, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");
});

//middleware
app.use(bodyParser.json());
app.use(compression());
app.use(express.static(__dirname + '/src/app/'));

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/index.html'));
})

app.post('/', function(req, res){
	var newRsvp = req.body;
  newRsvp.createDate = new Date();

  db.collection(RSVPS_COLLECTION).insertOne(newRsvp, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new rsvp.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
})

app.get('/rsvps', function(req, res){
	db.collection(RSVPS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get rsvps.");
    } else {
      res.status(200).json(docs);
    }
  });
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
