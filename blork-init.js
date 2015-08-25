window.addEventListener('load', init);

function init(){
	var view = new View;
	var model = new Model;
	var controller = new Controller(model, view);
	controller.bindEventListeners();
	controller.startingLocation()
	console.log(controller);
}

