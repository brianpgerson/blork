function Controller(model, view){
	this.model = model;
	this.view = view;
}

Controller.prototype.bindEventListeners = function(){
	this.view.control().addEventListener("keypress", this.check.bind(this), false);

}

Controller.prototype.startingLocation = function(){
	this.view.storyArea().innerHTML = "<p class ='locationNames'>In the " + this.model.locations[0].name + ":</p>" + this.model.locations[0].description;
	this.model.locations[0].visits++;
}

Controller.prototype.check = function(event){
	if(event.charCode == 13){
		this.parse(this.view.control().value);
	}
}

Controller.prototype.parse = function(string){
	var splitAndSmall = this.makeLowerCase(string).split(" ");
	console.log(splitAndSmall);
}

Controller.prototype.makeLowerCase = function(string){
	if (string == ""){
		return "";
	} else {
		return string[0].toLowerCase() + this.makeLowerCase(string.slice(1));

	}
}

