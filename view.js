function View(){}

View.prototype.control = function(){
	return document.getElementById("control");
}

View.prototype.introText = function(startingRoom){
	document.getElementById("story").innerHTML = "<p class ='propNouns'>In the " + startingRoom.name + ":</p>" + startingRoom.description;
}

View.prototype.examine = function(description, name){
	document.getElementById("story").innerHTML+= "<p><span class='propNouns'>The " + name + ": </span>" + description + "</p>";
}

View.prototype.checkForMax = function(){
	if (document.getElementById("story").childElementCount > 10){
		document.getElementById("story").removeChild(document.getElementById("story").childNodes[0])
	}
}

View.prototype.message = function(message){
	document.getElementById("story").innerHTML+= "<p class='message'>" + message + "</p>";
}

View.prototype.xout = function(){
	return document.getElementById("xout");
}

View.prototype.expander = function(){
	return document.getElementById("rulesExpand");
}

View.prototype.hide = function(id){
	document.getElementById(id).setAttribute("class", "hidden");
}

View.prototype.show = function(id){
	document.getElementById(id).removeAttribute("class", "hidden");
}