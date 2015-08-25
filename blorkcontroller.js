function Controller(model, view){
	this.model = model;
	this.view = view;
}

Controller.prototype.bindEventListeners = function(){
	this.view.control().addEventListener("keypress", this.checkForEnter.bind(this), false);
}

Controller.prototype.startingLocation = function(){
	this.view.storyArea().innerHTML = "<p class ='locationNames'>In the " + this.model.locations[0].name + ":</p>" + this.model.locations[0].description;
	this.model.locations[0].visits++;
	this.model.locations[0].currentRoom++;
}

Controller.prototype.checkForEnter = function(event){
	if(event.charCode == 13){
		this.parse(this.view.control().value);
	}
}

Controller.prototype.parse = function(string){
	var splitAndSmall = this.makeLowerCase(string).split(" "); 
	var commandVerb = splitAndSmall[0];

	var objectsInRoomNames = [];
	var objectsInRoom = []
	var thisRoom;
	for (i=0;i<this.model.locations.length;i++){
		if (this.model.locations[i].currentRoom == 1){
			thisRoom = this.model.locations[i];
			for (j=0; j<this.model.locations[i].objects.length; j++){
				objectsInRoomNames.push(this.model.locations[i].objects[j].name);
				objectsInRoom.push(this.model.locations[i].objects[j]);
			}
		}	
	}

	var commandObject;
	var availableCommands = [];
	for (i=0; i<objectsInRoom.length; i++){
		for(j=0; j<splitAndSmall.length; j++)
			if (objectsInRoomNames[i] == splitAndSmall[j]){
				commandObject = objectsInRoom[i];
				for (p=0; p<thisRoom.objects[i].commands.length; p++){
					availableCommands.push(thisRoom.objects[i].commands[p])
				}
			}
	}

	for (i=0; i<availableCommands.length; i++){
		if (commandVerb = availableCommands[i]){
			eval(this[commandVerb])(commandObject.description);
		}
	}
	console.log(objectsInRoom, availableCommands, commandObject, thisRoom, commandVerb);
}

Controller.prototype.makeLowerCase = function(string){
	if (string == ""){
		return "";
	} else {
		return string[0].toLowerCase() + this.makeLowerCase(string.slice(1));

	}
}

//==============================
// IN-GAME COMMANDS
//==============================

Controller.prototype.examine = function(description){
	document.getElementById("story").innerHTML+= "<p>" + description + "</p>";
}


