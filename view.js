function View(){}

View.prototype.storyArea = function(){
	return document.getElementById("story");
}

View.prototype.control = function(){
	return document.getElementById("control");
}