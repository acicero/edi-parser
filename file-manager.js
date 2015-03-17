var admZip = require('adm-zip');

function FileManager(fileDirectory){
	var fileDirectory = new admZip(fileDirectory);
	var filesInFolder = fileDirectory.getEntries();
	var count = 0;

	/*
	 * Extract the contents of the zip folder into the same directory
	 * the zip folder is located.
	 */
	this.extract = function(){
		fileDirectory.extractAllTo(__dirname,true);
	}

	/*
	 * List the name of each file in the provided zip folder.
	 */
	this.list = function(){
		var array = [];
		filesInFolder.forEach(function(currentEntry){
			array.push(currentEntry.entryName);
		});
		return array;
	}

	this.numberOfFiles = function(){
		return filesInFolder.length;
	}

	/*
	 * Read the contents of the current file.
	 */
	this.read = function(){
		if(count < filesInFolder.length){
			return fileDirectory.readAsText(filesInFolder[count++]);
		}else{
			console.log("You have read through all the files");
		}

		/*var array = [];
		filesInFolder.forEach(function(currentEntry){
			array.push(fileDirectory.readAsText(currentEntry));
		});
		return array;*/
	}

	/*
	 * Pass the edi files to the parser portion of the back end.
	 * This is done by passing one EDI file at a time.
	 * Future code may include a clause that checks to make sure
	 * the file being passed is indeed an EDI file.
	 */

	//May consider removing this function
	/*this.parseEDI = function(){
		filesInFolder.forEach(function(currentEntry){
			//Pass currentEntry to the parser portion of the code
			console.log("Feature shall be added in future updates.");
		});
	}*/
}

var output;
var sample = new FileManager(__dirname + "/SampleData.zip");

//sample.extract();
for(var i = 0; i < sample.numberOfFiles(); i++){
	console.log("Output for file number " + i + ":\n" + sample.read() + "\n\n");
}

output = sample.list();
console.log(output);

//Done to test if read() goes beyond array bounds
sample.read();
sample.read();

//output = sample.read();
//console.log(output);

//sample.parseEDI();
