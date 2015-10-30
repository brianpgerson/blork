
function Model(){
	this.inventory = {
		store: [],
		weight: 0,
		maxWeight: 100,
		commands: ["examine"]
	};

	//============================
	// 		All Locations
	//============================

	this.locations = [
	{
		name: "study",
		visits: 0,
		currentRoom: 0,
		description: "I find myself in the study. Worn wood panels thin enough to smell the adhesive on the undersides cover the walls, and the low light from a corner lamp reflects with a wet sheen. There's a desk in the middle of the room, coated by what looks like a year's worth of dust, and a painting of a forlorn admiral hangs on the wall. <p>There is a door to the kitchen to the north, and a door the bedroom to the south.</p>",
		exits: [{
			type: "door",
			direction: "north",
			destination: "kitchen",
			status: "locked"
		},
		{
			type: "door",
			direction: "east",
			destination: "bedroom",
			status: "open"
		}],
		objects:[{
			name: "desk",
			description: "An old fountain pen rests on a blank piece of paper with the letterhead 'BG' ornately embossed. I wonder what this 'BG' was planning to write?",
			status: "unavailable",
			weight: 1000,
			commands: ["examine"]
		},
		{
			name: "painting",
			description: "The admiral appears jovial enough upon first inspection, but a closer look reveals a melancholy air, as though the old sea man had found himself, at the time of the painting, engrossed not in naval combat or navigation, but pursuits of a more trivial character.",
			status: "available",
			weight: 10,
			commands: ["examine", "take"]				
		},
		{
			name: "pen",
			description: "It's a heavy, old fashioned pen that needs to be dipped in ink to work.",
			status: "available",
			weight: 1,
			commands: ["examine", "take"]

		}, 
		{
			name: "key",
			description: "It's a rusty key.",
			status: "available",
			weight: 1,
			commands: ["examine", "take", "use"]

		}, 
		{
			name: "paper",
			description: "It's a piece of paper with letterheading of the initials 'BG'.",
			status: "available",
			weight: 1,
			commands: ["examine", "take"]
			}],
		commands: ["go", "examine"]
	}]
	
}



