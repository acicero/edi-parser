
var fs = require('fs');
//var _ = require ('underscore');
//var _deep = require('underscore.deep');
var flat = require('flat');

var obj = JSON.parse(fs.readFileSync('output.json', 'utf8'));
//flat = underscore.flatten(underscore.map(obj, underscore.values));
//flat = _deep.deepToFlat(obj);
//console.log(JSON.stringify(flat,null,1));
/*
function getPath(object, segmentID, path){
	if(object.hasOwnProperty('Type') && object['Type'] == 'Segment' && object.hasOwnProperty('ID') && object['ID'] == segmentID){
		if(path == null){
			return segmentID;
		}
		return path+segmentID;
	}

	if(object.hasOwnProperty('Type') && object['Type'] == 'Loop'){
		//Do something to find out the name of the loop
	}

	for(var prop in object){
		if(object[prop] instanceof Object || object[prop] instanceof Array){
			path = getPath(object[prop], segmentID, path);
			if(path != null){
				return path;
			}
		}
	}


	
	//if(object.hasOwnProperty('Type') && object['Type'] == 'Loop'){
	//	path = path + getLoop(object) + '.';
	//}
	/*if(object instanceof Array){
		for(var i = 0; i < object.length; i++){
			path = getPath(object[i], segmentID, path);
		}
	}
	if(object instanceof Object){
		path = getPath(object, segmentID, path)
	}
	return null;
}
*/

//something like find the property on the disk
//	Check to see if is segment
//	If is segment and segemnt matches return property has no children
// 	If segment is a loop check run getLoopName() and if matches return all children
//	Recurse through the file structure


function getChildren(object, segmentID){
	var children = [];
	if(object.hasOwnProperty('Type') && object['Type'] == 'Segment' && object.hasOwnProperty('ID') && object['ID'] == segmentID){
		return null;
	}
	if(object.hasOwnProperty('Type') && object['Type'] == 'Loop'){
		console.log("Got here!");
		if(segmentID == getLoopName(object)){
			for(var segments in objec.Children[0].Object){
				console.log(segments);
			}
		}
		return null;
	}
	for(var prop in object){
		if(object[prop] instanceof Object || object[prop] instanceof Array){
			console.log(object[prop]);
			children = getChildren(object[prop], segmentID);
		}
		if(children != null){
			return children;
		}
	}
	return null;
}

var x = getChildren(obj, "SAC");

