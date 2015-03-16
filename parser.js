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
	is_valid(data);
	process_data(data);
	
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

//function returns 0 if EDI is invalid
//returns 1 if valid
function is_valid(text){
	var data = text;
	if (data.search(/ISA/) == 0){
	  console.log("ISA found at index 0");
	  return true;
	}
	else {
		console.log("ISA not found at index 0, file not valid");
		return false;
	}
}

//function replaces recordDelim character with newline characters
//function process_file(data){
//	var re = new RegExp(recordDelim,"g");
//	var replaced = data.replace(re, recordDelim + "\n");
//	var currentRecord;
//	var recordsArr = [];
//	//console.log(replaced);
//	
//	var pos = 0;
//	while (pos < replaced.length){
//	  var loc = replaced.indexOf(recordDelim, pos);
//	  if (loc == -1){
//	  	  loc = replaced.length;
//	  }// if not found, get out of while loop
//     
//	  currentRecord = replaced.substr(pos, loc);
//	  
//      recordsArr.push(currentRecord);
//      pos = loc+1;
//      console.log(recordsArr[1]);
//
//}
//}

function process_data2(data){
	
	var currentRecord;
	var recordArr = [];
	var index = 0;
	var nextDelimLoc;
	while (index < data.length){
	  nextDelimLoc = data.indexOf(recordDelim, index);
	  if (nextDelimLoc == -1){ //recordDelim has not been found, end of string
	  	  console.log("break test");
	  	  break;
	  	  
	  }
	  currentRecord = data.substr(index, nextDelimLoc+1);
	  console.log(currentRecord + " end of record");
	  recordArr.push(currentRecord);
	  index = nextDelimLoc + 1;
	}
	
	console.log(recordArr[0]);
	//console.log(recordArr[1]);
	//console.log(recordArr[3]);
}

function process_data(data){
	
	// put records into array
	var recordArr = data.split(recordDelim);
	
	// add recordDelim back in
	for (var i = 0; i < recordArr.length; i++){
		recordArr[i] += recordDelim;
	}

