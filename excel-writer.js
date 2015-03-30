var excelBuilder = require('node-xlsx');

var ExcelWriter = function(filePath){
	this.data = [];
	this.filePath = filePath;
}
/*
 * Adds an array into the data that will be written to an Excel file.
 * Returns null if the form of data is not an array, and doesn't add data
 * if that is the case.  Data starts out as an empty array when the object
 * is first constructed.
 */
ExcelWriter.prototype.addData = function(newData){
	if(!(newData instanceof Array)){
			return null;
	}
	this.data.push(newData);
}
/*
 * Returns the data meant to be written to the Excel file.
 */
ExcelWriter.prototype.getData = function(){
	return this.data;
}
/*
 * Writes the data into an Excel file.
 */
ExcelWriter.prototype.writeFile = function(){
	var buffer = excelBuilder.build([{name: "EDI Data", data: data}]);
	console.log(buffer);	//Only used to test output
}

module.exports = ExcelWriter;
