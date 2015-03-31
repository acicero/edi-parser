var exports.getChildren = function (object, segmentID){
	var children = [];
	if((loop = getLoopName(object)) != undefined){
		if(loop == segmentID){
			var allChildren = object['Children'][0]['Object'];
			for(var child in allChildren){
				if(allChildren[child]['$']['Type'] == "Segment")
					children.push(allChildren[child]['$']['ID']);
				if(allChildren[child]['$']['Type'] == "Loop"){
					children.push(getLoopName(allChildren[child]))
				}

			}
			return children;
		} else {
			console.log(object['Children'][0])
			children = getChildren(object['Children'][0]['Object'], segmentID);
			return children;
		}
	} elmuse{
		if(object['Type'] == "Segment" && object['ID'] == segmentID){
			children = [];
			return children;
		}
		for(var prop in object){
			if(object[prop] instanceof Object || object[prop] instanceof Array){
				children = getChildren(object[prop], segmentID);
				if(children.length > 0){
					return children;
				}
			}
		}
		return children;
	}
}

var getLoopName  = function (object){
	if(object.hasOwnProperty('$') && object['$'].hasOwnProperty('Type') && object['$']['Type'] == "Loop"){
		var loop = object.Attributes[0].SimpleAttribute;
		for(var attribute in loop){
			if(loop[attribute].hasOwnProperty('$') && loop[attribute]['$'].hasOwnProperty("Name") && loop[attribute]['$']["Name"] == "ID"){
				return loop[attribute]['_'];
			}
		}
	}
	return undefined;
}
