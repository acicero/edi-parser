var user = require('./testModule.js');
var fileManager = require('./file-manager.js');

var u = new user("name", "email");

u.f1();

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
}
