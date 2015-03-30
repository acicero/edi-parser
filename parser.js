/*Edi parser*/
/* Takes an edi file as argument to constructor*/
function Parser(input){
	this.data = input;
	var length = 0;
	var recordDelim;
	var fieldDelim;
	var subfieldDelim;

}

//Function gets the three delimiter types and input length
Parser.prototype.get_delimiters = function(){
	
	//console.log('File has been read successfully.');
	length = this.data.length;
	//console.log('File length: ' + length + ' characters');
	fieldDelim = this.data.charAt(103);
	//console.log('fieldDelim value: ' + fieldDelim);
	subfieldDelim = this.data.charAt(104);
	//console.log('subfieldDelim value: ' + subfieldDelim);
	recordDelim = this.data.charAt(105);
	//console.log('recordDelim value: ' + recordDelim);
}

//Function checks if EDI file is valid (basic check that
//the first line begins with ISA)
//Returns true if valid, false if invalid
Parser.prototype.is_valid = function(){
	
	if (this.data.search(/ISA/) == 0){
	  //console.log("ISA found at index 0");
	  return true;
	}
	else {
		console.log("ISA not found at index 0, file not valid");
		return false;
	}
}

//Function returns the numerical type of EDI file
Parser.prototype.get_edi_type = function(){
	
	var pattern = /ST.(\d+)./;
	var result = this.data.match(pattern);
	console.log(result[1]);
	return result[1];
	
}

//Function returns filename of needed EDI guidefile
Parser.prototype.get_guidefile = function(edi, path){

	var fs = require('fs')
	var result = fs.readdirSync(path);
	var match;
	var newestDate = 0;
	var re1 = /(\d+)./;
	var re2 = /_(\d+)./;
	
	for (var i = 0; i < result.length; i++){
		if (result[i].match(re1)[1] == edi){
			if ((result[i].match(re2)[1]) > newestDate){
				newestDate = result[i].match(re2)[1];
				match = result[i];
			}
		}	
	}
	
	return match;
	
}

//Function performs the parsing
Parser.prototype.process_data = function(){
	// put records into array
	var recordArr = this.data.split(recordDelim);
	
	// add recordDelim back in
	for (var i = 0; i < recordArr.length; i++){
		recordArr[i] += recordDelim;
	}
	
	
	
}


//export the class
module.exports = Parser;


/* all below this line is the OLD CODE

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

//function returns false if EDI is invalid
//returns true if valid
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

//main function for file processing
function process_data(data){
	
	// put records into array
	var recordArr = data.split(recordDelim);
	
	// add recordDelim back in
	for (var i = 0; i < recordArr.length; i++){
		recordArr[i] += recordDelim;
	}

}

//function returns the type of EDI file
function get_edi_type(data){

	var pattern = /ST.(\d+)./;
	var result = data.match(pattern);
	console.log(result[1]);
	return result[1];

}

*/
