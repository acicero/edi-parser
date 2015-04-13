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
	//dataObjs.push(new Object());
	
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
	this.guideFile = this.get_guidefile(this.ediType, path);


	// put records into array
	var recordArr = this.data.split(this.recordDelim);
	recordArr.pop(); //this removes an extra empty element at the end of the array
	
	// add recordDelim back in
	for (var i = 0; i < recordArr.length; i++){
		recordArr[i] += this.recordDelim;
	}
	
	var o = this;
	//create jsonEDI searching object
	var guide = require("./jsonedi.js");
	
	var file = guide.readGuidefile(this.guideFile); // CHECK TO VERIFY NOT BROKEN
	
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
		
		//get path value depending on if its a child or not
		if (typeof dataObjs[i] === "undefined"){
			
			myPath = mySegment;
			
		} else myPath = myPath + mySegment; 
		
		myData = recordArr[i];
		
		myFields = recordArr[i].split(this.fieldDelim);
		
		
		//NOTE: NOT HANDLING SUBFIELDS RIGHT NOW
		//NEED TO SEE THEM IN A FILE TO BE CERTAIN HOW THEY ARE FORMATTED
		
		
		//assign values to the object
		fieldObj.path = myPath;
		fieldObj.data = myData;
		fieldObj.fields = myFields;
		
		//check for children
		
		var children = guide.getChildren(file, mySegment);
		//console.log(children);
		
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
						var nextPath = mySegment + this.recordDelim + nextSegment;
						var nextObj = {}
						nextObj.path = nextPath;
						dataObjs[j] = nextObj;
						//console.log(nextObj);

						break;
					}
				} 
				
				j++;
				lookingAhead = matches;
			}
		}
		dataObjs[i] = fieldObj;	
	}
	
	console.log(dataObjs);
	return dataObjs;
	
}

//outputs the array of paths for UI selection
Parser.prototype.output_1 = function(data){
	var outArr = [];
	var dataObjs = data;
	for (var i = 0; i < dataObjs.length; i++){
		outArr.push(dataObjs[i].path);
	}
	return outArr;
	
}

Parser.prototype.user_input = function(selection, data){
	var inputArr = selection;
	var objData = data;
	var outputPaths = [];
	var outputData = [];
	var out2DArr = [];
	console.log("test");
	
	if (inputArr.length == 0){
		console.log("input array was empty");
		return;
	}
	
	//make a new object array of the selected records
	
	//for each item in inputArr
	for (var i = 0; i < inputArr.length; i++){
		
		for (var j = 0; j < objData.length; j++){
			console.log("inputArr[i]: " + inputArr[i]);
			console.log("dataObjs[j]: " + objData[j]);
			if (inputArr[i] == objData[j].path){
				outputPaths.push(inputArr[i]);
				outputData.push(objData[j].data);
			}
		}
		
	}
	out2DArr.push(outputPaths);
	out2DArr.push(outputData);
	
	console.log(out2DArr);
	
	return out2DArr;
		
	
	
}
	

//export the class
module.exports = Parser;