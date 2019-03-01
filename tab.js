class Tab {
	constructor(id) {
		this.guide = true;
		this.canvas = document.getElementById(id);
		this.c = this.canvas.getContext("2d");
		this.canvas.focus();

		this.canvas.width = window.innerWidth*.9;
		this.canvas.height = window.innerHeight*.9;

		// Default to quarter note
		this.duration = 4;

		this.options = {};
		this.options.linesPerStaff = 6;
		this.options.startingX = 50;
		this.options.lineSpacing = 20;
		this.options.horizontalSpacing = 10;
		this.options.staffSpacing = 80;
		this.options.linesPerStaff = 6;
		this.options.notesPerLine = 32 + 3; // 4 measures of eighth notes + 3 bars

		// Initialize the state
		this.state = {
			"keys" : {},
			"clicks" : {},
			"mouse": {},
		}

		// Staff contains n measures split into 16 divisions (16th notes)
		// Maybe each division is a "line" of "notesPerLine" notes with a duration, instead of an individual note having duration

		// Grid of notes: staff index, x (horizontal), y (which string, 0-5)
		// We default to 1 staff (that wraps around)
		this.staves = [];
		for (var staff = 0; staff < 5; ++staff) {
			this.staves.push([]);
			for (var string = 0; string < 6; ++string) {
				this.staves[staff].push([]);
				for (var x = 0; x < 250; ++x) { // TODO: How to keep track of max horizontal location?
					// TODO: This creates a bunch of objects that may be empty, there's a better way I think
					this.staves[staff][string].push(new Note({staffIndex:staff, x:x, y:string}, "", this.duration));
				}
			}
		}

		// Cursor points to a location on those dimensions
		this.current_position = new Cursor(0, 0, 0);
		this.mouse_position = new Cursor(0, 0, 0);

		// Add Event Listeners
		this.addEventListenerTo(window);

		requestAnimationFrame(this.frame.bind(this));
	}

	processKey() {
		// Move the cursor appropriately
		if (this.state.keys["ArrowRight"] == true)
		{
			this.current_position.move(1,0);
			this.state.keys["ArrowRight"] = false;
		}
		if (this.state.keys["ArrowLeft"] == true)
		{
			this.current_position.move(-1,0);
			this.state.keys["ArrowLeft"] = false;
		}
		if (this.state.keys["ArrowUp"] == true)
		{
			this.current_position.move(0,-1);
			this.state.keys["ArrowUp"] = false;
		}
		if (this.state.keys["ArrowDown"] == true)
		{
			this.current_position.move(0,1);
			this.state.keys["ArrowDown"] = false;
		}

		if (this.state.keys["Backspace"] == true ||
			this.state.keys["Delete"] == true 
			)
		{

			this.staves[this.current_position.staffIndex][this.current_position.y][this.current_position.x].value = "";

			this.state.keys["Backspace"] = false;
			this.state.keys["Delete"] = false;
		}
		// TODO: I really did this... I can make this cleaner
		if (this.state.keys["0"] == true)
		{
			this.staves[this.current_position.staffIndex][this.current_position.y][this.current_position.x].value = "0";

			this.state.keys["0"] = false;
		}
		if (this.state.keys["1"] == true)
		{
			this.staves[this.current_position.staffIndex][this.current_position.y][this.current_position.x].value = "1";

			this.state.keys["1"] = false;
		}
		if (this.state.keys["2"] == true)
		{
			this.staves[this.current_position.staffIndex][this.current_position.y][this.current_position.x].value = "2";

			this.state.keys["2"] = false;
		}
		if (this.state.keys["3"] == true)
		{
			this.staves[this.current_position.staffIndex][this.current_position.y][this.current_position.x].value = "3";

			this.state.keys["3"] = false;
		}
		if (this.state.keys["4"] == true)
		{
			this.staves[this.current_position.staffIndex][this.current_position.y][this.current_position.x].value = "4";

			this.state.keys["4"] = false;
		}
		if (this.state.keys["5"] == true)
		{
			this.staves[this.current_position.staffIndex][this.current_position.y][this.current_position.x].value = "5";

			this.state.keys["5"] = false;
		}
		if (this.state.keys["6"] == true)
		{
			this.staves[this.current_position.staffIndex][this.current_position.y][this.current_position.x].value = "6";

			this.state.keys["6"] = false;
		}
		if (this.state.keys["7"] == true)
		{
			this.staves[this.current_position.staffIndex][this.current_position.y][this.current_position.x].value = "7";

			this.state.keys["7"] = false;
		}
		if (this.state.keys["8"] == true)
		{
			this.staves[this.current_position.staffIndex][this.current_position.y][this.current_position.x].value = "8";

			this.state.keys["8"] = false;
		}
		if (this.state.keys["9"] == true)
		{
			this.staves[this.current_position.staffIndex][this.current_position.y][this.current_position.x].value = "9";

			this.state.keys["9"] = false;
		}
		// TODO: How do we handle 10-22 or whatever the max can be?
		if (this.state.keys["x"] == true)
		{
			this.staves[this.current_position.staffIndex][this.current_position.y][this.current_position.x].value = "x";

			this.state.keys["x"] = false;
		}
	}

	keyDown(e) {
		console.log(e);
		this.state.keys[e.key] = true;

		this.processKey();

		if (!e.ctrlKey) {
			e.preventDefault();

		}
	}


	keyUp(e) {
		this.state.keys[e.keyCode] = false;
	}

	mouseDown(e) {
		this.state.clicks[e.which] = {
			"clientX": e.clientX,
			"clientY": e.clientY
		};
	}

	mouseUp(e) {
		this.state.clicks[e.which] = false;
	}

	mouseMove(e) {
		this.state.mouse.clientX = e.clientX;
		this.state.mouse.clientY = e.clientY;

		this.mouse_position.updateWithPosition(e.clientX, e.clientY, this.options);
	}

	frame(timestamp) {

		if (!this.previous) this.previous = timestamp;
		var elapsed = timestamp - this.previous;
		this.fps = 1000 / elapsed;


		this.update(elapsed / 1000);
		this.draw();



		this.previous = timestamp;

		window.requestAnimationFrame(this.frame.bind(this)); // Note: this isn't recursion..
	}


	update(elapsed) {

	}


	draw() {
		//draw_grid(this.c);
		this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// Draw the staves
		draw_tab(this.c,  this.options);

		// Draw the notes on the staff (3 dimensional for loop, can this be cleaner?)
		this.staves.forEach((staff) => {
			//console.log(object);
			staff.forEach((string) => {
				string.forEach((note) => {
					note.draw(this.c, this.options);
				})
			})
		});

		this.current_position.draw(this.c, this.options);
		this.mouse_position.draw(this.c, this.options);
	}

	addEventListenerTo(element) {
		element.addEventListener("keydown", this.keyDown.bind(this), true);
		element.addEventListener("keyup", this.keyUp.bind(this), true);
		element.addEventListener("mousedown", this.mouseDown.bind(this), true);
		element.addEventListener("mouseup", this.mouseUp.bind(this), true);
		element.addEventListener("mousemove", this.mouseMove.bind(this), true);
	}


	addObject(object) {
		this.state.objects.push(object);
	}

}
