var excelBuilder = require('msexcel-builder');

var ExcelWriter = function(directory,fileName){
	this.data = [];
	this.workbook = excelBuilder.createWorkbook(directory,fileName);
	this.rows = 0;
	this.columns = 0;
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
	this.columns++;
	if(this.rows < newData.length){
		this.rows = newData.length;
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
 * Writes the data into an Excel file.  Returns true when successful.
 * Returns false when it fails.
 */
ExcelWriter.prototype.writeFile = function(){
	var excelSheet = this.workbook.createSheet('EDI Data',
		this.columns,this.rows);
	//The '-1' offset is because of the indexing of Excel files
	for(var i = 1; i <= this.data.length; i++){
		for(var j = 1; j <= this.data[i - 1].length; j++){
			excelSheet.set(i,j,this.data[i - 1][j - 1]);
		}
	}

	this.workbook.save(function(){});
}

module.exports = ExcelWriter;
