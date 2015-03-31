var excelBuilder = require('msexcel-builder');

var ExcelWriter = function(directory,fileName){
	this.data = [];
	this.workbook = excelBuilder.createWorkbook(directory,fileName);
	this.rows = 0;
	this.columns = 0;
}

/*
 * Adds an array into the data that will be written to an Excel file.
 * Returns false if the form of data is not an array, and doesn't add data
 * if that is the case.  Returns true if data is an array, and adds it to
 * the data in that case.
 */
ExcelWriter.prototype.addData = function(newData){
	if(!(newData instanceof Array)){
			return false;
	}
	this.columns++;
	if(this.rows < newData.length){
		this.rows = newData.length;
	}
	this.data.push(newData);
	return true;
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
