var admZip = require('adm-zip');

var FileManager = function(directoryParameter){
	this.fileDirectory = new admZip(directoryParameter);
	this.filesInFolder = this.fileDirectory.getEntries();
	this.count = 0;
}

/*
 * Extract the contents of the zip folder into the same directory
 * the zip folder is located.
 */
FileManager.prototype.extract = function(){
	this.fileDirectory.extractAllTo(__dirname,true);
}

/*
 * Return an array that contains the name of every file in the zip folder.
 */
FileManager.prototype.list = function(){
	var array = [];
	this.filesInFolder.forEach(function(currentEntry){
		array.push(currentEntry.entryName);
	});
	return array;
}

/*
 * Returns the total number of files in the zip folder.
 */
FileManager.prototype.numberOfFiles = function(){
	return this.filesInFolder.length;
}

/*
 * Read the contents of the current file.  Return null if every file has 
 * been read by this function already.
 */
FileManager.prototype.read = function(){
	if(this.count < this.filesInFolder.length){
		return this.fileDirectory.readAsText(this.filesInFolder[this.count++]);
	}else{
		return null;
	}
}

module.exports = FileManager;
