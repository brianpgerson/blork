function Controller(model, view){
	this.model = model;
	this.view = view;
}

Controller.prototype.bindEventListeners = function(){
	this.view.control().addEventListener("keypress", this.checkForEnter.bind(this), false);
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
	var availableCommands = this.getAvailableCommands(commandObject);



	for (i=0; i<availableCommands.length; i++){
		if (commandVerb == availableCommands[i]){
			eval(this[commandVerb].bind(this))(commandObject);
			this.view.checkForMax();
			console.log(objectInfo[0], availableCommands, commandObject, room, commandVerb);
			return;
		} 	
	}
	this.view.message("That's not a command you can use in this case.")
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
	var commandObject;
	for (i=0; i<objects.length; i++){
		for(j=0; j<input.length; j++) {
			if (names[i] == input[j]){
				commandObject = objects[i];
				return commandObject;
			}
		} 
	} 
	this.view.message("Mmmm, sorry, that's not going to work.")
} 

Controller.prototype.getAvailableCommands = function(commandObject){
	var availableCommands = [];
	for (i=0; i<commandObject.commands.length; i++){
		availableCommands.push(commandObject.commands[i])
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
		debugger;
		this.view.message("You've added the " + commandObject.name + " to your inventory. Weight: " + this.model.inventory.weight + "/" + this.model.inventory.maxWeight)

	}
}

