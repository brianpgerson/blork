function Controller(model, view){
	this.model = model;
	this.view = view;
}

Controller.prototype.bindEventListeners = function(){
	this.view.control().addEventListener("keypress", this.checkForEnter.bind(this), false);
	this.view.xout().addEventListener("click", this.exOutCommandModule.bind(this), false);
	this.view.expander().addEventListener("click", this.bringBackCommandModule.bind(this), false);

}

Controller.prototype.exOutCommandModule = function(){
	this.view.hide("rules");
	this.view.show("rulesExpand");
}

Controller.prototype.bringBackCommandModule = function(){
	this.view.hide("rulesExpand");
	this.view.show("rules");
}

Controller.prototype.startingLocation = function(){
	this.view.introText(this.model.locations[0]);
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
	var room = this.getCurrentRoom();
	var objectInfo = this.getObjectInfo(room);
	var commandObject = this.getCommandObject(room, objectInfo[1], objectInfo[0], splitAndSmall);
	if (commandObject === undefined){this.view.message(this.erroneousObject()); 
		return;}
		var availableCommands = this.getAvailableCommands(commandObject);
		this.view.checkForMax();

		if(availableCommands.length > 0){ 
			for (i=0; i<availableCommands.length; i++){
				if (commandVerb == availableCommands[i]){
					eval(this[commandVerb].bind(this))(commandObject);
					console.log(objectInfo[0], availableCommands, commandObject, room, commandVerb);
					return;
				} 	
			}
		} 
		this.view.message(this.erroneousCommand());
	}

	Controller.prototype.getCurrentRoom = function(){
		for (i=0;i<this.model.locations.length;i++){
			if (this.model.locations[i].currentRoom == 1){
				return this.model.locations[i];
			}
		}
	}

	Controller.prototype.getObjectInfo = function(room){
		var objectNames = [];
		var objectObjects = [];
		for (i=0; i<room.objects.length; i++){
			objectNames.push(room.objects[i].name);		
			objectObjects.push(room.objects[i]);		
		}
		return [objectNames, objectObjects];
	}

	Controller.prototype.getCommandObject= function(room, objects, names, input){
		var commandObject = [];
		for (i=0; i<objects.length; i++){
			for(j=0; j<input.length; j++) {
				if (names[i] == input[j]){
					commandObject.push(objects[i]);
				}
			} 
		} 
		return commandObject;
	} 

	Controller.prototype.getAvailableCommands = function(commandObject){
		var availableCommands = [];
		if (commandObject == []){
			return [];
		} else if (commandObject.length = 1){
			for (i=0; i<commandObject.commands.length; i++){
				availableCommands.push(commandObject.commands[i])
			} else {
				for (i=0; i<commandObject.length; i++) {
					
				}BLORK
			}
	} 

	return availableCommands;
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

Controller.prototype.examine = function(commandObject){
	this.view.examine(commandObject.description, commandObject.name);
}

Controller.prototype.take = function(commandObject){
	weight = commandObject.weight;
	if (weight + this.model.inventory.weight <= this.model.inventory.maxWeight){
		this.model.inventory.store.push(commandObject);
		this.model.inventory.store[this.model.inventory.store.length-1].status = "held";
		this.model.inventory.weight += this.model.inventory.store[this.model.inventory.store.length-1].weight;
		console.log(this.model.inventory.weight, this.model.inventory.store);
		this.view.message("You've added the " + commandObject.name + " to your inventory. Weight: " + this.model.inventory.weight + "/" + this.model.inventory.maxWeight)
	}	
}



//==============================
// Responses
//==============================

Controller.prototype.erroneousObject = function(){
	var responses = ["That's not an object. I mean, it might be, somewhere out there. Just not in here.",
	"Err...huh? Doesn't seem like that object is in here. Try something else.",
	"Science tells us that there are infinite universes, some of which probably have a version of this room that contains the object you're looking for. Unfortunately, this isn't one of those universes.",
	"You should probably reread the room description. Or maybe you made a typo? Try again."
	];
	return responses[Math.floor(Math.random()*responses.length)];
}

Controller.prototype.erroneousCommand = function(){
	var responses = ["You want to what? You're crazy, man. That's not a valid command in this case.",
	"You can't do that. Or maybe you shouldn't? No...you definitely can't.",
	"Nope, back to the drawing board on that one."
	];
	return responses[Math.floor(Math.random()*responses.length)];

}
