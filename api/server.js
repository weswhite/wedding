var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('<html> <body>HIYA!</body> </html>')
})

// var port = process.env.PORT || 8080;
app.listen(8080, function() { 
	console.log('Wedding RSVP listening on localhost:8080');
});