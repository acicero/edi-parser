var User = function(aname, anemail) {
  this.name = aname;
  this.email = anemail;
  console.log("constructor");
  var a;
  console.log(a);

   
}

User.prototype.f1 = function(){
	console.log(this.name);
	this.a = 3;
}

User.prototype.f2 = function(){
	console.log(this.a);
}

module.exports = User;