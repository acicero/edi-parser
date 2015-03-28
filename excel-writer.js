var excelBuilder = require('msexcel-builder');

function ExcelWriter(fileDirectory, fileName){
	var workbook = excelBuilder.createWorkbook(fileDirectory,fileName);
	var data = [];
	var columns = 0;
	var rows = 0;

	this.addData = function(newData){
		if(!(newData instanceof Array)){
			return null;
		}
		data.push(newData);
		columns++;
		if(newData.length > rows){
			rows = newData.length;
		}
	}

	this.writeExcel = function(){
		var file = workbook.createSheet('File Data',10,10/*columns,rows*/);

		for(var i in data){
			for(var j in data[i]){
				//Write data entry into excel file
				//The plus one is because this format uses one-indexing
				file.set(i+1,j+1,data[i][j]);
				//console.log('Data Entry:'+data[i][j]);
			}
		}

		//Save the file
		workbook.save(function(success){
			if(!success){
				workbook.cancel();
				console.log('Error writing Excel file.\n');
			}
		});
	}
}

var sample = new ExcelWriter(__dirname,'Sample.csv');

sample.addData(['Data Fields','Field 1','Field 2','Field 3','Field 4']);
sample.addData(['File #1','Data 1','Company 1','Item 1','Address 1']);
sample.addData(['File #2','Data 2','Company 2','Item 2','Address 2']);

sample.writeExcel();
