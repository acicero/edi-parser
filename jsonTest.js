
var fs = require('fs');
var underscore = require('underscore');

var obj = JSON.parse(fs.readFileSync('output.json', 'utf8'));
var print = iter(obj);

function iter(obj){
	for(var key in obj){
		if(typeof(obj[key]) == 'object'){
			iter(obj[key]);
		} else{
			console.log("Key: " + key + " Values: " + obj[key]);
		}
	}
}