class Cursor {
	constructor(staffIndex, x, y) {
		// TODO: staffIndex should be computed based on which measure we are on
		this.staffIndex = staffIndex;
		this.x = x;
		this.y = y;
	}

	draw(ctx, options) {
		var options = options || {};

		// Line spacing 
		var lineSpacing = options.lineSpacing || 20;
		// Horizontal spacing 
		var horizontalSpacing = options.horizontalSpacing || 20;
		// Staff spacing
		var staffSpacing = options.staffSpacing || 40;
		// Lines per staff
		var linesPerStaff = options.linesPerStaff || 6;
		// Cursor width
		var cursorWidth = options.cursorWidth || 15;
		// Starting x location
		var startingX = options.startingX || 60;
		var notesPerLine = options.notesPerLine || (32 + 3);
		var linesPerStaff = options.linesPerStaff || 6;


		var staffIndex = Math.floor(this.x / notesPerLine);
		var x = this.x % notesPerLine;
		var y = this.y;

		// Default variables that are not provided
		var stroke = options.stroke || 'rgba(0,0,255,1)';
		var fill = options.fill || 'rgba(255,255,0,0.2)'; // blue green

		// Set context values
		ctx.strokeStyle = stroke;
		ctx.fillStyle = fill;
		let width = ctx.canvas.width, height = ctx.canvas.height;

		// Get the staff details
		var staffTop = staffSpacing + staffIndex * ((linesPerStaff) * lineSpacing + staffSpacing) - 0.5 * lineSpacing;

		// staffIndex * (staffSpacing + linesPerStaff * lineSpacing)

		// Draw the larger cursor guide, surrounding all lines of the staff
		ctx.lineWidth = .5;
		ctx.beginPath();
		ctx.rect(startingX+(cursorWidth+horizontalSpacing)*x, staffTop, cursorWidth, lineSpacing * (linesPerStaff)); // left, top, width, height
		ctx.stroke();

		// Fill the smaller, real cursor location
		ctx.beginPath();
		ctx.rect(startingX+(cursorWidth+horizontalSpacing)*x, staffTop+y*lineSpacing, cursorWidth, lineSpacing); // left, top, width, height
		ctx.stroke();
		ctx.fill();
	}

	move(x, y, options) {
		var options = options || {};
		var notesPerLine = options.notesPerLine || (32 + 3);
		var linesPerStaff = options.linesPerStaff || 6;

		this.x += x;
		//this.y += y;

		// Have we hit the bottom?
		  // Where do we jump to?
		// Have we hit the top?
		if (this.y == 0 && y < 0) {
			if (this.x < notesPerLine) {
				// Do nothing, we're on top staff
			} else {
				// Jump to "bottom" of a staff, but shift left enough to place this at the correct location.
				this.y = linesPerStaff-1;
				this.x -= notesPerLine;
			}
		} else if (this.y == linesPerStaff-1 && y > 0) {
			// Jump to "top" of a staff, but shift right enough to place this at the correct location.
			this.y = 0;
			this.x += notesPerLine;
		} else {
			this.y += y;
		}
		  // Where do we jump to?
		// Have we hit the far left/far right?
		if (this.x < 0) this.x = 0;
	}
}
