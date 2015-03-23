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
	 * Return an array that gives the name of every file in the zip folder.
	 */
	this.list = function(){
		var array = [];
		filesInFolder.forEach(function(currentEntry){
			array.push(currentEntry.entryName);
		});
		return array;
	}

	/*
	 * Returns the total number of files in the zip folder.
	 */
	this.numberOfFiles = function(){
		return filesInFolder.length;
	}

	/*
	 * Read the contents of the current file.  Return null if every file has 
	 * been read by this function already.
	 */
	this.read = function(){
		if(count < filesInFolder.length){
			return fileDirectory.readAsText(filesInFolder[count++]);
		}else{
			return null;
		}
	}
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
if(sample.read() === null){
	console.log("You read to the end.");
}
