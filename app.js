
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var multer = require('multer')

var app = express();


/**
 * Configuration
 */

/*Multer configuration*/
app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));


/*Routes*/

app.get('/', function(req, res){
	res.sendfile("index.html");
});

app.post('/api/upload', function(req, res){
	if(done==true){
		console.log(req.files);
		res.end("File uploaded");
	}
});

/**
 * Start Server
 */

http.createServer(app).listen(3000, function () {
  console.log('Express server listening on port ' + 3000);
});
