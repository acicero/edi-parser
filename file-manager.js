var admZip = require('adm-zip');

/*
 * Load the zip folder.
 * At this point, it uses a hard-coded zip folder.
 * The .getEntries() method lets you access the files
 * without unzipping the folder
 */
var zipFolder = new admZip("./SampleData.zip");
var zipFiles = zipFolder.getEntries();

//Go through each file in the unzipped folder
zipFiles.forEach(function(zipEntry){
	console.log(zipEntry.toString());
});
