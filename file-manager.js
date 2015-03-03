var admZip = require('adm-zip');

function FileManager(fileDirectory){
	var fileDirectory = new admZip(fileDirectory);
	var filesInFolder = fileDirectory.getEntries();

	/*
	 * Extract the contents of the zip folder into the same directory
	 * it is located.
	 */
	this.extract = function(){
		this.fileDirectory.extractAllTo(__dirname,true);
	}

	/*
	 * List the name of each file in the provided zip folder.
	 * At this point, it should read all the file's properties
	 */
	this.list = function(){
		filesInFolder.forEach(function(currentEntry){
			console.log(currentEntry.entryName);
		});
	}

	/*
	 * Read the contents of the current file.
	 */
	this.read = function(){
		filesInFolder.forEach(function(currentEntry){
			console.log(fileDirectory.readAsText(currentEntry));
		});
	}

	/*
	 * Pass the edi files to the parser portion of the back end.
	 * This is done by passing one EDI file at a time.
	 * Future code may include a clause that checks to make sure
	 * the file being passed is indeed an EDI file.
	 */
	this.parseEDI = function(){
		filesInFolder.forEach(function(currentEntry){
			//Pass currentEntry to the parser portion of the code
			console.log("Feature shall be added in future updates.");
		});
	}
}

/*
 * Load the zip folder.
 * At this point, it uses a hard-coded zip folder.
 * The .getEntries() method lets you access the files
 * without unzipping the folder
 *
 * These commented out lines of code come from testing before this code
 * was implemented as a JavaScript class.
var zipFolder = new admZip(__dirname + "/SampleData.zip");
var zipFiles = zipFolder.getEntries();

//Go through each file in the unzipped folder
zipFiles.forEach(function(zipEntry){
	console.log(zipEntry.toString());
});
 */

var sample = new FileManager(__dirname + "/SampleData.zip");
//sample.extract();
sample.list();
sample.read();
sample.parseEDI();
