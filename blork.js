var locations = {
	study:{
		name: "The Study",
		description: "I find myself in the study. Worn wood panels thin enough to smell the adhesive on the undersides cover the walls, though in the low light they look okay. There's a desk in the middle of the room, coated by a thin layer of dust, and a painting of a forlorn admiral hangs on the wall.",
		exits: [{
				type: "door",
				direction: "north",
				destination: "kitchen"},
			{
				type: "door",
				direction: "east",
				destination: "bedroom"
			}],
		objects:[objects.desk, objects.painting]
	}
}

var objects = {
	desk: {
		description: "An old fountain pen rests on a blank piece of paper with the letterhead 'BG' ornately embossed. I wonder what this 'BG' was planning to write?",
		contents: [this.pen, this.paper],
		actions: [actions.examine]

	}
	painting: {
		description: "The admiral appears jovial enough upon first inspection, but a closer look reveals a melancholy air, as though the old sea man had found himself, at the time of the painting, engrossed not in naval combat or navigation, but pursuits of a more trivial character.",
		contents: [],
		actions: [actions.lift, actions.examine, actions.take]
	}
}
