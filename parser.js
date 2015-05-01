/*Edi parser*/
/* Takes a 2D array to the constructor where*/
/* 2DArray[0] is the filename and */
/* 2DArray[1] is the string of data */
function Parser(arr){
	this.fileName = arr[0];
	this.data = arr[1];
	var length = 0;
	var recordDelim;
	var fieldDelim;
	var subfieldDelim;
	var ediType;
	var guideFile;
	var guideFilePath = __dirname + "Guidefiles/";

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
	var re1 = /(\d+)./;
	//var re2 = /_(\d+)./;
	
	for (var i = 0; i < result.length; i++){
		if(result[i].match(re1) === null){ //if match returns null (looking at YOU, ".DS_Store" !!!)
			continue;
		}
		if (result[i].match(re1)[1] == edi){
				match = result[i];		
		} 	
	}
	return match;
	
}

//Function performs the parsing
Parser.prototype.process_data = function(){
	
	var dataObjs = [];

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
	//console.log(this.guideFilePath);
	this.guideFile = this.get_guidefile(this.ediType, __dirname + "/Guidefiles/");


	// put records into array
	var recordArr = this.data.split(this.recordDelim);
	recordArr.pop(); //this removes an extra empty element at the end of the array
	
	// add recordDelim back in
	for (var i = 0; i < recordArr.length; i++){
		recordArr[i] += this.recordDelim;
	}

	
	//create jsonEDI searching object
	var guide = require("./jsonedi.js");
	
	var file = guide.readGuidefile(__dirname + "/Guidefiles/" + this.guideFile); // CHECK TO VERIFY NOT BROKEN
	
	//loop through each record
	for (var i = 0; i < recordArr.length; i++){
		
		var myPath;
		var mySegment
		var myData;
		var myFields = [];
		var fieldObj = {};
		var myFieldObjs = [];
		var myChildren = [];
		
		mySegment = recordArr[i].split(this.fieldDelim)[0];
		//console.log(recordArr[i].split(this.fieldDelim));
		
		//get path value depending on if its a child or not
		if (typeof dataObjs[i] === "undefined"){
			
			myPath = mySegment;
			
		} else 
			{
				myPath = dataObjs[i].path;
			}
		
		myData = recordArr[i];
		
		myFields = recordArr[i].split(this.fieldDelim);
		
		
		//NOTE: NOT HANDLING SUBFIELDS RIGHT NOW

		
		
		//assign values to the object
		fieldObj.path = myPath;
		fieldObj.data = myData;
		fieldObj.fields = myFields;
		
		//check for children
		
		var children = guide.getChildren(file, mySegment);
		
		if (children.length > 0){
			//console.log("has children");
			
			var j = i+1;
			var lookingAhead = true;
			while(lookingAhead){

				var nextRecord = recordArr[j];

				var nextSegment = nextRecord.split(this.fieldDelim)[0];

				var matches = false;
				//note, loop starts at one because children[0] is the
				//same as the segment that was called
				
				for (var k = 1; k < children.length; k++){

					//console.log("next Segment: " + nextSegment);
					//console.log("children[k]: " + children[k]);
					if (nextSegment == children[k]){
						matches = true;
						var nextPath = myPath + "." + nextSegment;
						var nextObj = {};
						nextObj.path = nextPath;
						dataObjs[j] = nextObj;
						//console.log(nextObj);

						//console.log(dataObjs[j]);

						break;
					}
				} 
				
				j++;
				lookingAhead = matches;
			}
		}

		dataObjs[i] = fieldObj;	
		dataObjs[i].fileName = this.fileName;


	}
	
	
	return dataObjs;
	
}

//outputs the array of paths for UI selection
Parser.prototype.output_1 = function(data){
	var outArr = [];
	var outArr = []
	var dataObjs = data;
	var fieldIndex;
	for (var i = 0; i < dataObjs.length; i++){
		for(var j = 0; j < dataObjs[i].fields.length; j++){
				if (j < 10){
					fieldIndex = "0" + j;
				}
				else fieldIndex = String(j);
				outArr.push(dataObjs[i].path + "-" + fieldIndex);
		}
	}

	return outArr;
	
}

Parser.prototype.user_input = function(selection, data){
	var inputArr = selection;
	var objData = data;
	var outputPaths = [];
	var outputData = [];
	var out2DArr = [];
	var thePathLength;
	var thePath;
	var fieldNum;
	var outputFileNames = [];
	
	if (inputArr.length == 0){
		console.log("input array was empty");
		return;
	}
	
	//make a new object array of the selected records
	
	//for each item in inputArr
	
	
	for (var i = 0; i < inputArr.length; i++){
		
		for (var j = 0; j < objData.length; j++){
			//console.log("inputArr[i]: " + inputArr[i]);
			//console.log("dataObjs[j]: " + objData[j]);
			thePathLength = inputArr[i].length;
			thePath = inputArr[i].substring(0, thePathLength-3); //gets the path without field number
			if (thePath == objData[j].path){
				fieldNum = inputArr[i].substring(thePathLength-2, thePathLength);
				outputPaths.push(inputArr[i]);
				outputData.push(objData[j].fields[Number(fieldNum)]);
				outputFileNames.push(objData[j].fileName);
			}
		}
		
		
	}
	out2DArr.push(outputPaths);
	//console.log(outputPaths);
	out2DArr.push(outputData);
	out2DArr.push(outputFileNames);
	
	//console.log(out2DArr);
	return out2DArr;
		
	
	
}
	

//export the class
module.exports = Parser;