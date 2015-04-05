var guide = require('./jsonEDI.js');
var file = guide.getGuidefile('output.json');
var test = guide.getChildren(file, 'AMT');
console.log(test);