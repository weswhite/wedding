var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

//middleware
app.use(bodyParser.json());
app.use(express.static(__dirname + '../frontend/src/'));

// app.get('/', function(req, res){
// 	res.sendFile(path.join(__dirname + '/index.html'));
// })

// var port = process.env.PORT || 8080;
app.listen(8080, function() { 
	console.log('Wedding RSVP listening on localhost:8080');
});