var user = require('./testModule.js');
var fileManager = require('./file-manager.js');
var excelBuilder = require('./excel-writer.js');

var u = new user("name", "email");

u.f1();
u.f2();

/* Test code for file-manager.js

var fm = new fileManager(__dirname + '/SampleData.zip');

//fm.extract();
console.log(fm.list());
for(var i = 0; i < fm.numberOfFiles(); i++){
	console.log("Output for file number " + i + ":\n" + fm.read() + "\n");
}

if(fm.read() === null){
	console.log("You read to the end.");
}else{
	console.log("You still have files to read.");
}*/

var excelWriter = new excelBuilder(__dirname,"Sample.xlsx");
excelWriter.addData([true,45,"Pie",false,108,"Cake"]);
excelWriter.addData(true);
excelWriter.addData([128,"Lord",false,""]);
excelWriter.addData(["Orange",135,true,true,"Music"]);
excelWriter.addData(666);
console.log(excelWriter.getData());
excelWriter.writeFile();
