/*Edi parser*/
/* Takes an edi file as argument to constructor*/


var file = 'uploads/Fedex850.txt'; // hardcoded file for now
var length = 0;
var fieldDelim;
var subfieldDelim;
var recordDelim;

fs = require('fs');
fs.readFile(file, 'utf8', function(err, data){
	if(err){
		return console.log(err)
	}
	get_delimiters(data);
	
});

function get_delimiters(text){
	var data = text;
	
	console.log('File has been read successfully.');
	length = data.length;
	console.log('File length: ' + length + ' characters');
	fieldDelim = data.charAt(103);
	console.log('fieldDelim value: ' + fieldDelim);
	subfieldDelim = data.charAt(104);
	console.log('subfieldDelim value: ' + subfieldDelim);
	recordDelim = data.charAt(105);
	console.log('recordDelim value: ' + recordDelim);
	
}
