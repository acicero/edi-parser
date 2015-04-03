/*Edi parser*/
/* Takes an edi file as argument to constructor*/
function Parser(input){
	this.data = input;
	var length = 0;
	var recordDelim;
	var fieldDelim;
	var subfieldDelim;
	var ediType;
	var guideFile;
	var guideFilePath = "./XML/";

}

//Function gets the three delimiter types and input length
Parser.prototype.get_delimiters = function(){
	
	var results = [];
	//console.log('File has been read successfully.');
	results.push(this.data.length);
	//console.log('File length: ' + length + ' characters');
	results.push(this.data.charAt(103));
	//console.log('fieldDelim value: ' + fieldDelim);
	results.push(this.data.charAt(104));
	//console.log('subfieldDelim value: ' + subfieldDelim);
	results.push(this.data.charAt(105));
	//console.log('recordDelim value: ' + recordDelim);
	
	return results;
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
	return result[1];
	
}

//Function returns filename of needed EDI guidefile
Parser.prototype.get_guidefile = function(edi, path){

	var fs = require('fs');
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
	
	//check EDI file validity
	if (!this.is_valid()){
		console.log("error");
		return;
	}
	
	//establish variable values
	var delims = this.get_delimiters();
	this.length = delims[0];
	this.fieldDelim = delims[1];
	this.subFieldDelim = delims[2];
	this.recordDelim = delims[3];
	this.ediType = this.get_edi_type();
	this.guideFile = this.get_guidefile(this.ediType, "./XML/");

	// put records into array
	var recordArr = this.data.split(this.recordDelim);
	recordArr.pop(); //this removes an extra empty element at the end of the array
	
	// add recordDelim back in
	for (var i = 0; i < recordArr.length; i++){
		recordArr[i] += this.recordDelim;
	}


	
	//create jsonEDI searching object
	
	
	//loop through recordArr populating an array of record objects
	//with data
	
	
	
	
	
}
//export the class
module.exports = Parser;