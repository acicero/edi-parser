var fs = require('fs'),
	xml2js = require('xml2js');

function convertXML(xmlPath, jsonPath){
	var parser = new xml2js.Parser();
	fs.readFile(__dirname + xmlPath, function(err, data) {
	    parser.parseString(data, function (err, result) {
	        console.dir(result);
	        console.log('Done');
	        fs.writeFile(__dirname + jsonPath, JSON.stringify(result, null, 1),
				function(err){
				if(err){
					console.log(err);
				} else{
					console.log("File saved");
				}
			});
	    });
	});
	
};


var convert = convertXML("/850_004010.xml", "/output.json");