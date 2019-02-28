
class Tab {
	constructor(id) {
		this.guide = true;
		this.canvas = document.getElementById(id);
		this.c = this.canvas.getContext("2d");
		this.canvas.focus();

		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		this.linesPerStaff = 6;

		this.cursor = {
			staffIndex: 0,
			x: 0,
			y: 0
		};

		// Initialize the state
		this.state = {
			"keys" : {},
			"clicks" : {},
			"mouse": {},
			"objects": [],
		}

		// Add our objects

		// Add Event Listeners
		this.addEventListenerTo(window);
		//this.canvas.addEventListener("keydown", this.keyDown.bind(this), true);

		requestAnimationFrame(this.frame.bind(this));
	}


	keyDown(e) {
		console.log(e);
		this.state.keys[e.key] = true;


		e.preventDefault();
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
		this.state.objects.forEach((object) => {
			//console.log(object);
			object.update(this.state, elapsed);
		});

		// Move the cursor apprppriately
		if (this.state.keys["ArrowRight"] == true)
		{
			if (this.cursor.x < 100) { // TODO: Max lines per staff
				this.cursor.x += 1;
			}
			this.state.keys["ArrowRight"] = false;
		}
		if (this.state.keys["ArrowLeft"] == true)
		{
			if (this.cursor.x > 0) {
				this.cursor.x -= 1;
			}
			this.state.keys["ArrowLeft"] = false;
		}
		if (this.state.keys["ArrowUp"] == true)
		{
			if (this.cursor.y == 0) {
				if (this.cursor.staffIndex > 0) {
					this.cursor.y = this.linesPerStaff-1;
					this.cursor.staffIndex -= 1;
				}
			} else {
				this.cursor.y -= 1;
			}
			this.state.keys["ArrowUp"] = false;
		}
		if (this.state.keys["ArrowDown"] == true)
		{
			if (this.cursor.y == this.linesPerStaff-1) {
				if (this.cursor.staffIndex < 8) {  // TODO: Max Staves
					this.cursor.y = 0;
					this.cursor.staffIndex += 1;
				}
			} else {
				this.cursor.y += 1;
			}
			this.state.keys["ArrowDown"] = false;
		}
		if (this.state.keys["2"] == true)
		{
			// Draw the number 2
			
			this.state.keys["2"] = false;
		}
	}


	draw() {
		//draw_grid(this.c);
		this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
		draw_tab(this.c,  {guide: this.guide});

		draw_tab_cursor(this.c, this.cursor, {guide: this.guide});
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
		this.stage.addChild(object.sprite);
	}

}

// animate() works a lot like frame() from the other book.
// We could probably use that instead.
//PlatformerDemo.prototype.animate = function() {
//	requestAnimationFrame(this.animate.bind(this));
//
//}
