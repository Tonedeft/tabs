class Note {
	constructor(cursor, value) {
		// TODO: staffIndex should be computed based on which measure we are on
		this.staffIndex = cursor.staffIndex;
		this.x = cursor.x;
		this.y = cursor.y;
		this.value = value;
	}

	draw(ctx, options) {
		if (this.value != "")
		{
			var options = options || {};
			ctx.save();
			// Draw 6 lines across the page

			// Line spacing 
			var lineSpacing = options.lineSpacing || 20;
			// Horizontal spacing 
			var horizontalSpacing = options.horizontalSpacing || 20;
			// Staff spacing
			var staffSpacing = options.staffSpacing || 40;
			// Lines per staff
			var linesPerStaff = options.linesPerStaff || 6;
			// Starting x location
			var startingX = options.startingX || 60;

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

			// Get the staff details
			var staffTop = staffSpacing + this.staffIndex * ((linesPerStaff) * lineSpacing + staffSpacing) - .5 * lineSpacing;

			// Get location of cursor
			var textX = startingX+(cursorWidth+horizontalSpacing)*this.x+(textSize+lineSpacing)/4;
			var textY = staffTop+this.y*lineSpacing + (textSize+lineSpacing)/2;

			// Draw the background
			// Fill the smaller, real cursor location
			ctx.beginPath();
			ctx.fillStyle = backgroundColor;
			ctx.rect(startingX+(cursorWidth+horizontalSpacing)*this.x, staffTop+this.y*lineSpacing, cursorWidth, lineSpacing); // left, top, width, height
			//ctx.stroke();
			ctx.fill();


			// Write the value
			ctx.fillStyle = textColor;
			ctx.textAlign = textAlign;
			ctx.font = textSize + "pt Arial";
			ctx.fillText(this.value, textX, textY);


			ctx.restore();
		}
	}
}
