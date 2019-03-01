class Note {
	constructor(cursor, value, duration) {
		this.staffIndex = cursor.staffIndex;
		this.x = cursor.x;
		this.y = cursor.y;
		this.duration = duration;
		this.value = value;
	}

	draw(ctx, options) {
		if (this.value != "")
		{
			var options = options || {};
			ctx.save();

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

			// Default variables that are not provided
			var stroke = options.stroke || 'rgba(0,0,0,1)';
			var textColor = options.textColor || 'rgba(0,0,0,1)';
			var backgroundColor = options.textColor || 'rgba(255,255,255,1)';

			var textSize = options.textSize || 15;
			var textAlign = options.align || 'center';

			// Set context values
			ctx.strokeStyle = stroke;
			ctx.fillStyle = textColor;
			let width = ctx.canvas.width, height = ctx.canvas.height;

			var staffIndex = Math.floor(this.x / notesPerLine);
			var x = this.x % notesPerLine;
			var y = this.y;

			// Get the staff details
			var staffTop = staffSpacing + staffIndex * ((linesPerStaff) * lineSpacing + staffSpacing) - .5 * lineSpacing;

			// Get location of cursor
			var textX = startingX+(cursorWidth+horizontalSpacing)*x+(textSize+lineSpacing)/4;
			var textY = staffTop+y*lineSpacing + (textSize+lineSpacing)/2;

			// Draw the background
			// The actual drawing logic -----------------------------------------------------------------------
			// Fill the smaller, real cursor location
			ctx.beginPath();
			ctx.fillStyle = backgroundColor;
			ctx.rect(startingX+(cursorWidth+horizontalSpacing)*x, staffTop+y*lineSpacing, cursorWidth, lineSpacing); // left, top, width, height
			ctx.fill();

			// Write the value
			ctx.fillStyle = textColor;
			ctx.textAlign = textAlign;
			ctx.font = textSize + "pt Arial";
			ctx.fillText(this.value, textX, textY);


			// Above the staff, draw the note value (quarter, eighth, half, etc.)
			ctx.beginPath();
			ctx.ellipse(startingX+(cursorWidth+horizontalSpacing)*x+.5*cursorWidth, staffTop-lineSpacing, cursorWidth*.45, cursorWidth*.30, -Math.PI / 6, 0, 2 * Math.PI);
			
			ctx.lineWidth = 1.5;
			if (this.duration < 8) {
				ctx.fill();
			} else {
				ctx.stroke();
			}

			if (this.duration < 16) {
				// Draw the line
				ctx.beginPath();
				ctx.lineWidth = 1.3;
				ctx.moveTo(startingX+(cursorWidth+horizontalSpacing)*x+cursorWidth*.9,staffTop-lineSpacing-cursorWidth*.05);
				ctx.lineTo(startingX+(cursorWidth+horizontalSpacing)*x+cursorWidth*.9,staffTop-lineSpacing*2.75);
				ctx.stroke();
			}

			ctx.restore();
		}
	}
}
