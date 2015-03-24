var User = function(name, email) {
  this.name = name;
  this.email = email;
  console.log("something");
   
}

User.prototype.f1 = function(){
	console.log(this.name);
}

module.exports = User;