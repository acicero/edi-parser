/*Edi parser*/
/* Takes an edi file as argument to constructor*/


var file = 'uploads/Fedex850.txt'; // hardcoded file for now
var length = 0;
var fieldDelim = "d";
var subfieldDelim;
var recordDelim;

fs = require('fs');
fs.readFile(file, 'utf8', function(err, data){
	if(err){
		return console.log(err)
	}
	//get_delimiters(data);
	is_valid(data);
	process_data(data);
	get_edi_type(data);
	
});

function get_delimiters(text){
	var data = text;
	
	//console.log('File has been read successfully.');
	length = data.length;
	//console.log('File length: ' + length + ' characters');
	fieldDelim = data.charAt(103);
	//console.log('fieldDelim value: ' + fieldDelim);
	subfieldDelim = data.charAt(104);
	//console.log('subfieldDelim value: ' + subfieldDelim);
	recordDelim = data.charAt(105);
	//console.log('recordDelim value: ' + recordDelim);
	
}

//function returns 0 if EDI is invalid
//returns 1 if valid
function is_valid(text){
	var data = text;
	if (data.search(/ISA/) == 0){
	  //console.log("ISA found at index 0");
	  return true;
	}
	else {
		console.log("ISA not found at index 0, file not valid");
		return false;
	}
}

function process_data(data){
	
	// put records into array
	var recordArr = data.split(recordDelim);
	
	// add recordDelim back in
	for (var i = 0; i < recordArr.length; i++){
		recordArr[i] += recordDelim;
	}



}

function get_edi_type(data){
	
	var pattern = /ST.(\d+)./;
	var result = data.match(pattern);
	console.log(result[1]);
	return result[1];

}
	
	